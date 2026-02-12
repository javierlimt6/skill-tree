import 'server-only';
import {
  notion,
  BLOG_DB_ID,
  getPlainText,
  getSelect,
  getMultiSelect,
  getDate,
  getRelationIds,
  getFiles,
} from './notion';
import { pageToMarkdown } from './markdown';
import type { BlogPostRaw } from '@/types/notion.types';
import type { BlogPostCard, BlogPostFull } from '@/types/blog.types';
import { format } from 'date-fns';

/* ── Fetch all published blog posts (metadata only) ── */
export async function fetchBlogPosts(): Promise<BlogPostRaw[]> {
  const response = await notion.databases.query({
    database_id: BLOG_DB_ID,
    filter: {
      property: 'Published',
      checkbox: { equals: true },
    },
    sorts: [{ property: 'Date', direction: 'descending' }],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.results.map((page: any) => ({
    id: page.id,
    title: getPlainText(page.properties.Title?.title),
    slug: getPlainText(page.properties.Slug?.rich_text),
    published: page.properties.Published?.checkbox || false,
    date: getDate(page.properties.Date?.date),
    tags: getMultiSelect(page.properties.Tags?.multi_select),
    category: getSelect(page.properties.Category?.select),
    summary: getPlainText(page.properties.Summary?.rich_text),
    coverImage: getFiles(page.properties['Cover Image']?.files)[0] || null,
    relatedRoadmapIds: getRelationIds(page.properties['Related Roadmap']?.relation),
    readTime: page.properties['Read Time']?.number || 5,
    difficulty: getSelect(page.properties.Difficulty?.select) as BlogPostRaw['difficulty'],
  }));
}

/* ── Fetch a single blog post by slug ── */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostRaw | null> {
  const response = await notion.databases.query({
    database_id: BLOG_DB_ID,
    filter: {
      and: [
        { property: 'Published', checkbox: { equals: true } },
        { property: 'Slug', rich_text: { equals: slug } },
      ],
    },
  });

  if (response.results.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = response.results[0] as any;
  return {
    id: page.id,
    title: getPlainText(page.properties.Title?.title),
    slug: getPlainText(page.properties.Slug?.rich_text),
    published: page.properties.Published?.checkbox || false,
    date: getDate(page.properties.Date?.date),
    tags: getMultiSelect(page.properties.Tags?.multi_select),
    category: getSelect(page.properties.Category?.select),
    summary: getPlainText(page.properties.Summary?.rich_text),
    coverImage: getFiles(page.properties['Cover Image']?.files)[0] || null,
    relatedRoadmapIds: getRelationIds(page.properties['Related Roadmap']?.relation),
    readTime: page.properties['Read Time']?.number || 5,
    difficulty: getSelect(page.properties.Difficulty?.select) as BlogPostRaw['difficulty'],
  };
}

/* ── Transform raw post to card format ── */
export function transformToBlogCard(raw: BlogPostRaw): BlogPostCard {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    summary: raw.summary,
    coverImage: raw.coverImage,
    date: raw.date,
    formattedDate: raw.date ? format(new Date(raw.date), 'MMM dd, yyyy') : '',
    tags: raw.tags,
    category: raw.category,
    readTime: raw.readTime,
    difficulty: raw.difficulty,
  };
}

/* ── Fetch full post content (card + markdown) ── */
export async function fetchFullBlogPost(slug: string): Promise<BlogPostFull | null> {
  const raw = await fetchBlogPostBySlug(slug);
  if (!raw) return null;

  const markdown = await pageToMarkdown(raw.id);
  const card = transformToBlogCard(raw);

  return {
    ...card,
    relatedRoadmapIds: raw.relatedRoadmapIds,
    markdown,
  };
}

/* ── Extract unique tags from posts ── */
export function extractAllTags(posts: BlogPostRaw[]): string[] {
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/* ── Filter blog posts by search & tags ── */
export function filterPosts(
  posts: BlogPostCard[],
  searchQuery: string,
  selectedTags: string[]
): BlogPostCard[] {
  let filtered = posts;

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.summary.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter((post) =>
      selectedTags.some((tag) => post.tags.includes(tag))
    );
  }

  return filtered;
}

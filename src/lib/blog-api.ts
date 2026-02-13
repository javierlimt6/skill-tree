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
import fallbackBlog from '@/data/fallback-blog.json';

/* ── Fetch all published blog posts (metadata only, with fallback) ── */
export async function fetchBlogPosts(): Promise<BlogPostRaw[]> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: BLOG_DB_ID,
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
  } catch {
    console.warn('Notion blog fetch failed, using fallback data');
    return fallbackBlog as BlogPostRaw[];
  }
}

/* ── Fetch a single blog post by slug (with fallback) ── */
export async function fetchBlogPostBySlug(slug: string): Promise<BlogPostRaw | null> {
  try {
    const response = await notion.dataSources.query({
      data_source_id: BLOG_DB_ID,
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
  } catch {
    console.warn('Notion blog post fetch failed, using fallback data');
    const fallbackPost = (fallbackBlog as BlogPostRaw[]).find((p) => p.slug === slug);
    return fallbackPost ?? null;
  }
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

  let markdown: string;
  try {
    markdown = await pageToMarkdown(raw.id);
  } catch {
    // Fallback: use summary as placeholder content
    markdown = `# ${raw.title}\n\n${raw.summary}\n\n---\n\n*This is placeholder content. Connect your Notion database to see the full post.*`;
  }

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

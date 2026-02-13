import type { Metadata } from 'next';
import { fetchBlogPosts, transformToBlogCard, extractAllTags } from '@/lib/blog-api';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { BlogErrorState } from '@/components/blog/BlogErrorState';

export const metadata: Metadata = {
  title: 'Blog | My Learning Journey',
  description: 'Articles and tutorials from my learning journey.',
};

export default async function BlogIndexPage() {
  let posts = [];
  let allTags: string[] = [];

  try {
    const rawPosts = await fetchBlogPosts();
    posts = rawPosts.map(transformToBlogCard);
    allTags = extractAllTags(rawPosts);
  } catch {
    return <BlogErrorState />;
  }

  return <BlogPageClient initialPosts={posts} allTags={allTags} />;
}

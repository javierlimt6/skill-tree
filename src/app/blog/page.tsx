import type { Metadata } from 'next';
import { fetchBlogPosts, transformToBlogCard, extractAllTags } from '@/lib/blog-api';
import { BlogPageClient } from '@/components/blog/BlogPageClient';
import { Result } from 'antd';

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
    return (
      <Result
        status="error"
        title="Failed to Load Blog"
        subTitle="Could not fetch blog posts from Notion. Please check your configuration."
      />
    );
  }

  return <BlogPageClient initialPosts={posts} allTags={allTags} />;
}

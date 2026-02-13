import type { Metadata } from 'next';
import { fetchFullBlogPost } from '@/lib/blog-api';
import { PostContent } from '@/components/blog/PostContent';
import { BlogPostNotFound } from '@/components/blog/BlogPostNotFound';
import { BlogPostError } from '@/components/blog/BlogPostError';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = await fetchFullBlogPost(slug);
  } catch {
    return { title: 'Post Error | My Learning Journey' };
  }

  if (!post) {
    return { title: 'Post Not Found | My Learning Journey' };
  }

  return {
    title: `${post.title} | My Learning Journey`,
    description: post.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await fetchFullBlogPost(slug);
  } catch {
    return <BlogPostError />;
  }

  if (!post) {
    return <BlogPostNotFound />;
  }

  return <PostContent post={post} />;
}

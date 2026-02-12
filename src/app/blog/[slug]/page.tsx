import type { Metadata } from 'next';
import { fetchFullBlogPost } from '@/lib/blog-api';
import { PostContent } from '@/components/blog/PostContent';
import { Result, Button } from 'antd';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchFullBlogPost(slug);

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
    return (
      <Result
        status="error"
        title="Failed to Load Post"
        subTitle="Could not fetch blog post from Notion."
        extra={
          <Link href="/blog">
            <Button type="primary">Back to Blog</Button>
          </Link>
        }
      />
    );
  }

  if (!post) {
    return (
      <Result
        status="404"
        title="Post Not Found"
        subTitle="The blog post you're looking for doesn't exist."
        extra={
          <Link href="/blog">
            <Button type="primary">Back to Blog</Button>
          </Link>
        }
      />
    );
  }

  return <PostContent post={post} />;
}

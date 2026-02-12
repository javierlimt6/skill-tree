import { NextResponse } from 'next/server';
import { fetchBlogPosts, transformToBlogCard, extractAllTags } from '@/lib/blog-api';

export async function GET() {
  try {
    const rawPosts = await fetchBlogPosts();
    const posts = rawPosts.map(transformToBlogCard);
    const allTags = extractAllTags(rawPosts);

    return NextResponse.json(
      { posts, allTags },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

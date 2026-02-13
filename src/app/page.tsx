import {
  fetchRoadmapNodes,
  calculateRoadmapStats,
} from '@/lib/roadmap-api';
import { fetchBlogPosts } from '@/lib/blog-api';
import { HomePageClient } from '@/components/home/HomePageClient';

export default async function HomePage() {
  let stats = null;
  let blogCount = 0;

  try {
    const nodes = await fetchRoadmapNodes();
    stats = calculateRoadmapStats(nodes);
  } catch {
    // Graceful fallback if Notion is not configured
  }

  try {
    const posts = await fetchBlogPosts();
    blogCount = posts.length;
  } catch {
    // Graceful fallback
  }

  return <HomePageClient stats={stats} blogCount={blogCount} />;
}

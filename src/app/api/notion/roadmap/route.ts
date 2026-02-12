import { NextResponse } from 'next/server';
import {
  fetchRoadmapNodes,
  transformToFlowNodes,
  transformToFlowEdges,
  calculateRoadmapStats,
} from '@/lib/roadmap-api';

export async function GET() {
  try {
    const rawNodes = await fetchRoadmapNodes();
    const nodes = transformToFlowNodes(rawNodes);
    const edges = transformToFlowEdges(rawNodes);
    const stats = calculateRoadmapStats(rawNodes);

    return NextResponse.json(
      { nodes, edges, stats },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    return NextResponse.json(
      { error: 'Failed to fetch roadmap data' },
      { status: 500 }
    );
  }
}

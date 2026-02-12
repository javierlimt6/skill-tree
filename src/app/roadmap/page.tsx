import type { Metadata } from 'next';
import type { Node, Edge } from '@xyflow/react';
import {
  fetchRoadmapNodes,
  transformToFlowNodes,
  transformToFlowEdges,
  calculateRoadmapStats,
} from '@/lib/roadmap-api';
import { RoadmapCanvas } from '@/components/roadmap/RoadmapCanvas';

export const metadata: Metadata = {
  title: 'Learning Roadmap | My Learning Journey',
  description: 'Interactive visualization of my learning path.',
};

export default async function RoadmapPage() {
  let nodes: Node[] = [];
  let edges: Edge[] = [];
  let stats = { total: 0, completed: 0, learning: 0, notStarted: 0, onHold: 0, completionRate: 0 };
  let error = false;

  try {
    const rawNodes = await fetchRoadmapNodes();
    nodes = transformToFlowNodes(rawNodes);
    edges = transformToFlowEdges(rawNodes);
    stats = calculateRoadmapStats(rawNodes);
  } catch {
    error = true;
  }

  return (
    <RoadmapCanvas
      initialNodes={nodes}
      initialEdges={edges}
      stats={stats}
      error={error}
    />
  );
}

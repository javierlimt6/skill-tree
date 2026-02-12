import 'server-only';
import {
  notion,
  ROADMAP_DB_ID,
  getPlainText,
  getSelect,
  getMultiSelect,
  getDate,
  getRelationIds,
} from './notion';
import type { RoadmapNodeRaw } from '@/types/notion.types';
import type { RoadmapStats } from '@/types/roadmap.types';
import type { Node, Edge } from '@xyflow/react';
import type { LearningNodeData } from '@/types/roadmap.types';

/* ── Status → color mapping ── */
const statusColorMap: Record<string, string> = {
  Completed: '#52c41a',
  Learning: '#1890ff',
  'On Hold': '#faad14',
  'Not Started': '#d9d9d9',
};

/* ── Fetch all roadmap nodes from Notion ── */
export async function fetchRoadmapNodes(): Promise<RoadmapNodeRaw[]> {
  const response = await notion.databases.query({
    database_id: ROADMAP_DB_ID,
    sorts: [{ property: 'Order', direction: 'ascending' }],
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.results.map((page: any) => ({
    id: page.id,
    nodeId: getPlainText(page.properties['Node ID']?.rich_text),
    title: getPlainText(page.properties.Title?.title),
    parentIds: getRelationIds(page.properties.Parent?.relation),
    status: getSelect(page.properties.Status?.select) as RoadmapNodeRaw['status'],
    category: getMultiSelect(page.properties.Category?.multi_select),
    priority: getSelect(page.properties.Priority?.select) as RoadmapNodeRaw['priority'],
    description: getPlainText(page.properties.Description?.rich_text),
    resources: page.properties.Resources?.url || null,
    startDate: getDate(page.properties['Start Date']?.date),
    endDate: getDate(page.properties['End Date']?.date),
    relatedPostIds: getRelationIds(page.properties['Related Posts']?.relation),
    positionX: page.properties['Position X']?.number || 0,
    positionY: page.properties['Position Y']?.number || 0,
    order: page.properties.Order?.number || 0,
  }));
}

/* ── Transform to ReactFlow nodes ── */
export function transformToFlowNodes(
  notionNodes: RoadmapNodeRaw[]
): Node<LearningNodeData>[] {
  return notionNodes.map((node) => ({
    id: node.nodeId || node.id,
    type: 'learningNode',
    position: { x: node.positionX, y: node.positionY },
    data: {
      title: node.title,
      status: node.status ?? 'Not Started',
      category: node.category,
      priority: node.priority,
      description: node.description,
      resources: node.resources,
      startDate: node.startDate,
      endDate: node.endDate,
      relatedPostIds: node.relatedPostIds,
      statusColor: statusColorMap[node.status ?? 'Not Started'] ?? '#d9d9d9',
    },
  }));
}

/* ── Transform to ReactFlow edges ── */
export function transformToFlowEdges(notionNodes: RoadmapNodeRaw[]): Edge[] {
  const edges: Edge[] = [];

  notionNodes.forEach((node) => {
    if (node.parentIds && node.parentIds.length > 0) {
      node.parentIds.forEach((parentId) => {
        const parent = notionNodes.find((n) => n.id === parentId);
        if (parent) {
          edges.push({
            id: `${parent.nodeId || parent.id}-${node.nodeId || node.id}`,
            source: parent.nodeId || parent.id,
            target: node.nodeId || node.id,
            type: 'smoothstep',
            animated: node.status === 'Learning',
          });
        }
      });
    }
  });

  return edges;
}

/* ── Aggregate statistics ── */
export function calculateRoadmapStats(nodes: RoadmapNodeRaw[]): RoadmapStats {
  const total = nodes.length;
  const completed = nodes.filter((n) => n.status === 'Completed').length;
  const learning = nodes.filter((n) => n.status === 'Learning').length;
  const notStarted = nodes.filter((n) => n.status === 'Not Started').length;
  const onHold = nodes.filter((n) => n.status === 'On Hold').length;

  return {
    total,
    completed,
    learning,
    notStarted,
    onHold,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

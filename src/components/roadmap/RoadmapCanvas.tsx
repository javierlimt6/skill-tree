'use client';

import { FC, useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Spin, Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { LearningNode } from './LearningNode';
import { NodeDetailDrawer } from './NodeDetailDrawer';
import type { RoadmapStats } from '@/types/roadmap.types';
import { ProgressStats } from './ProgressStats';

interface Props {
  initialNodes: Node[];
  initialEdges: Edge[];
  stats: RoadmapStats;
  error?: boolean;
}

export const RoadmapCanvas: FC<Props> = ({
  initialNodes,
  initialEdges,
  stats,
  error,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const nodeTypes = useMemo(() => ({ learningNode: LearningNode }), []);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to Load Roadmap"
        subTitle="Could not fetch roadmap data from Notion. Please check your API key and database ID."
        extra={
          <Button
            type="primary"
            icon={<ReloadOutlined />}
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        }
      />
    );
  }

  if (initialNodes.length === 0) {
    return (
      <div style={{ padding: 24 }}>
        <ProgressStats stats={stats} />
        <Result
          status="info"
          title="No Roadmap Data"
          subTitle="Add learning topics to your Notion Roadmap database to see them here."
        />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 'calc(100vh - 64px)' }}>
      <div style={{ padding: '24px 50px 0' }}>
        <ProgressStats stats={stats} />
      </div>

      <div style={{ width: '100%', height: 'calc(100% - 180px)' }}>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          minZoom={0.3}
          maxZoom={1.5}
        >
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              const status = (node.data as Record<string, unknown>)?.status as string;
              const colorMap: Record<string, string> = {
                Completed: '#52c41a',
                Learning: '#1890ff',
                'On Hold': '#faad14',
                'Not Started': '#d9d9d9',
              };
              return colorMap[status] || '#d9d9d9';
            }}
          />
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
        </ReactFlow>
      </div>

      <NodeDetailDrawer
        node={selectedNode}
        open={!!selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};

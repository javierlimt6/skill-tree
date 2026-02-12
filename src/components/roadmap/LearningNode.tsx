'use client';

import { FC, memo } from 'react';
import { Card, Tag, Progress, Space, Typography } from 'antd';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  PauseCircleFilled,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { LearningNodeData } from '@/types/roadmap.types';

const { Text } = Typography;

const statusConfig: Record<
  string,
  { icon: React.ReactNode; progress: number }
> = {
  Completed: {
    icon: <CheckCircleFilled style={{ color: '#52c41a' }} />,
    progress: 100,
  },
  Learning: {
    icon: <ClockCircleFilled style={{ color: '#1890ff' }} />,
    progress: 50,
  },
  'On Hold': {
    icon: <PauseCircleFilled style={{ color: '#faad14' }} />,
    progress: 25,
  },
  'Not Started': {
    icon: <MinusCircleOutlined style={{ color: '#d9d9d9' }} />,
    progress: 0,
  },
};

const LearningNodeComponent: FC<NodeProps> = ({ data }) => {
  const nodeData = data as unknown as LearningNodeData;
  const config = statusConfig[nodeData.status] || statusConfig['Not Started'];

  return (
    <>
      <Handle type="target" position={Position.Top} style={{ opacity: 0 }} />
      <Card
        size="small"
        hoverable
        style={{
          width: 220,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          cursor: 'pointer',
        }}
        styles={{ body: { padding: 12 } }}
      >
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Space size="small">
            {config.icon}
            <Text strong style={{ fontSize: 14 }}>
              {nodeData.title}
            </Text>
          </Space>

          <Space size={4} wrap>
            {nodeData.category.slice(0, 2).map((cat) => (
              <Tag
                key={cat}
                color="blue"
                style={{ fontSize: 11, margin: 0 }}
              >
                {cat}
              </Tag>
            ))}
            {nodeData.category.length > 2 && (
              <Tag style={{ fontSize: 11, margin: 0 }}>
                +{nodeData.category.length - 2}
              </Tag>
            )}
          </Space>

          <Progress
            percent={config.progress}
            size="small"
            showInfo={false}
            strokeColor={nodeData.statusColor}
          />

          {nodeData.priority && (
            <Tag
              color={
                nodeData.priority === 'High'
                  ? 'red'
                  : nodeData.priority === 'Medium'
                    ? 'orange'
                    : 'default'
              }
              style={{ fontSize: 10, margin: 0 }}
            >
              {nodeData.priority}
            </Tag>
          )}
        </Space>
      </Card>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0 }} />
    </>
  );
};

export const LearningNode = memo(LearningNodeComponent);

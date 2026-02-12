'use client';

import { FC } from 'react';
import {
  Drawer,
  Descriptions,
  Tag,
  Space,
  Button,
  Typography,
  Divider,
} from 'antd';
import {
  LinkOutlined,
  ReadOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { format } from 'date-fns';
import type { LearningNodeData } from '@/types/roadmap.types';
import type { Node } from '@xyflow/react';

const { Title, Paragraph } = Typography;

interface Props {
  node: Node | null;
  open: boolean;
  onClose: () => void;
}

export const NodeDetailDrawer: FC<Props> = ({ node, open, onClose }) => {
  if (!node) return null;

  const data = node.data as unknown as LearningNodeData;

  return (
    <Drawer title={data.title} open={open} onClose={onClose} width={500}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        {/* Status */}
        <Descriptions column={1} size="small">
          <Descriptions.Item label="Status">
            <Tag color={data.statusColor}>{data.status}</Tag>
          </Descriptions.Item>

          {data.priority && (
            <Descriptions.Item label="Priority">
              <Tag
                color={
                  data.priority === 'High'
                    ? 'red'
                    : data.priority === 'Medium'
                      ? 'orange'
                      : 'default'
                }
              >
                {data.priority}
              </Tag>
            </Descriptions.Item>
          )}

          <Descriptions.Item label="Categories">
            <Space size={4} wrap>
              {data.category.map((cat) => (
                <Tag key={cat} color="blue">
                  {cat}
                </Tag>
              ))}
            </Space>
          </Descriptions.Item>

          {(data.startDate || data.endDate) && (
            <Descriptions.Item label="Timeline">
              <Space size="small">
                <CalendarOutlined />
                {data.startDate &&
                  format(new Date(data.startDate), 'MMM dd, yyyy')}
                {data.startDate && data.endDate && ' – '}
                {data.endDate &&
                  format(new Date(data.endDate), 'MMM dd, yyyy')}
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>

        <Divider style={{ margin: 0 }} />

        {data.description && (
          <>
            <div>
              <Title level={5}>Description</Title>
              <Paragraph>{data.description}</Paragraph>
            </div>
            <Divider style={{ margin: 0 }} />
          </>
        )}

        {data.resources && (
          <>
            <div>
              <Title level={5}>Resources</Title>
              <Button
                type="link"
                icon={<LinkOutlined />}
                href={data.resources}
                target="_blank"
                style={{ paddingLeft: 0 }}
              >
                Open Learning Resources
              </Button>
            </div>
            <Divider style={{ margin: 0 }} />
          </>
        )}

        {data.relatedPostIds && data.relatedPostIds.length > 0 && (
          <div>
            <Title level={5}>Related Blog Posts</Title>
            <Button
              type="primary"
              icon={<ReadOutlined />}
              href="/blog"
            >
              View {data.relatedPostIds.length} Related Post
              {data.relatedPostIds.length > 1 ? 's' : ''}
            </Button>
          </div>
        )}
      </Space>
    </Drawer>
  );
};

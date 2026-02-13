'use client';

import { FC } from 'react';
import { Typography, Space, Button, Row, Col, Card, Statistic } from 'antd';
import {
  ApartmentOutlined,
  ReadOutlined,
  RocketOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

interface Props {
  stats: {
    total: number;
    completed: number;
  } | null;
  blogCount: number;
}

export const HomePageClient: FC<Props> = ({ stats, blogCount }) => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Hero section */}
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <Title level={1} style={{ fontSize: 48, marginBottom: 16 }}>
          <RocketOutlined /> My Learning Journey
        </Title>
        <Paragraph
          style={{
            fontSize: 20,
            color: '#666',
            maxWidth: 600,
            margin: '0 auto',
          }}
        >
          Documenting my path through software engineering, one concept at a
          time. Explore my learning roadmap and read about my experiences.
        </Paragraph>

        <Space size="large" style={{ marginTop: 32 }}>
          <Link href="/roadmap">
            <Button type="primary" size="large" icon={<ApartmentOutlined />}>
              View Roadmap
            </Button>
          </Link>
          <Link href="/blog">
            <Button size="large" icon={<ReadOutlined />}>
              Read Blog
            </Button>
          </Link>
        </Space>
      </div>

      {/* Stats */}
      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Learning Topics"
              value={stats?.total ?? 0}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Completed"
              value={stats?.completed ?? 0}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic
              title="Blog Posts"
              value={blogCount}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>
    </Space>
  );
};

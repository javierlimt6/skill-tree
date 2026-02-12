import { FC } from 'react';
import { Card, Statistic, Row, Col, Progress } from 'antd';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import type { RoadmapStats } from '@/types/roadmap.types';

interface Props {
  stats: RoadmapStats;
}

export const ProgressStats: FC<Props> = ({ stats }) => {
  return (
    <Card title="Learning Progress" style={{ marginBottom: 24 }}>
      <Progress
        percent={stats.completionRate}
        strokeColor="#52c41a"
        style={{ marginBottom: 24 }}
      />

      <Row gutter={16}>
        <Col span={6}>
          <Statistic
            title="Total Topics"
            value={stats.total}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Completed"
            value={stats.completed}
            prefix={<CheckCircleOutlined />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Learning"
            value={stats.learning}
            prefix={<ClockCircleOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Col>
        <Col span={6}>
          <Statistic
            title="Not Started"
            value={stats.notStarted}
            prefix={<MinusCircleOutlined />}
            valueStyle={{ color: '#d9d9d9' }}
          />
        </Col>
      </Row>
    </Card>
  );
};

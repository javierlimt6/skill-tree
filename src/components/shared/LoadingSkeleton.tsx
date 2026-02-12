import { FC } from 'react';
import { Skeleton, Card } from 'antd';

interface Props {
  rows?: number;
  avatar?: boolean;
}

export const LoadingSkeleton: FC<Props> = ({ rows = 4, avatar = false }) => {
  return (
    <Card style={{ marginBottom: 16 }}>
      <Skeleton active avatar={avatar} paragraph={{ rows }} />
    </Card>
  );
};

'use client';

import { FC } from 'react';
import { Result, Button } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

interface Props {
  title?: string;
  subTitle?: string;
  onRetry?: () => void;
}

export const ErrorState: FC<Props> = ({
  title = 'Something went wrong',
  subTitle = 'Failed to load data. Please try again.',
  onRetry,
}) => {
  return (
    <Result
      status="error"
      title={title}
      subTitle={subTitle}
      extra={
        onRetry && (
          <Button type="primary" icon={<ReloadOutlined />} onClick={onRetry}>
            Retry
          </Button>
        )
      }
    />
  );
};

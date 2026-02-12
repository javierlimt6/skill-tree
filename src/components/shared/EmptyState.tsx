import { FC } from 'react';
import { Result } from 'antd';

interface Props {
  title?: string;
  subTitle?: string;
}

export const EmptyState: FC<Props> = ({
  title = 'No Data',
  subTitle = 'Nothing to display yet.',
}) => {
  return <Result status="404" title={title} subTitle={subTitle} />;
};

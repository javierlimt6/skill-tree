'use client';

import { Result } from 'antd';

export const BlogErrorState = () => {
  return (
    <Result
      status="error"
      title="Failed to Load Blog"
      subTitle="Could not fetch blog posts from Notion. Please check your configuration."
    />
  );
};

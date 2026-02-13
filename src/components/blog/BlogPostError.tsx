'use client';

import { Result, Button } from 'antd';
import Link from 'next/link';

export const BlogPostError = () => {
  return (
    <Result
      status="error"
      title="Failed to Load Post"
      subTitle="Could not fetch blog post from Notion."
      extra={
        <Link href="/blog">
          <Button type="primary">Back to Blog</Button>
        </Link>
      }
    />
  );
};

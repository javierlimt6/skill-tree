'use client';

import { Result, Button } from 'antd';
import Link from 'next/link';

export const BlogPostNotFound = () => {
  return (
    <Result
      status="404"
      title="Post Not Found"
      subTitle="The blog post you're looking for doesn't exist."
      extra={
        <Link href="/blog">
          <Button type="primary">Back to Blog</Button>
        </Link>
      }
    />
  );
};

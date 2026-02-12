import { FC } from 'react';
import { List, Result } from 'antd';
import { PostCard } from './PostCard';
import type { BlogPostCard } from '@/types/blog.types';

interface Props {
  posts: BlogPostCard[];
}

export const PostGrid: FC<Props> = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <Result
        status="404"
        title="No Posts Found"
        subTitle="No blog posts match your search criteria."
      />
    );
  }

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
        xl: 3,
        xxl: 4,
      }}
      dataSource={posts}
      renderItem={(post) => (
        <List.Item>
          <PostCard post={post} />
        </List.Item>
      )}
    />
  );
};

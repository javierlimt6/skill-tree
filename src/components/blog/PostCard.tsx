import { FC } from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import type { BlogPostCard } from '@/types/blog.types';

const { Meta } = Card;

interface Props {
  post: BlogPostCard;
}

export const PostCard: FC<Props> = ({ post }) => {
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        hoverable
        cover={
          post.coverImage ? (
            <img
              alt={post.title}
              src={post.coverImage}
              style={{ height: 200, objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                height: 200,
                background:
                  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: 48,
              }}
            >
              {post.title[0]}
            </div>
          )
        }
        actions={[
          <Space size={4} key="date">
            <CalendarOutlined />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {post.formattedDate}
            </Typography.Text>
          </Space>,
          <Space size={4} key="readTime">
            <ClockCircleOutlined />
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {post.readTime} min
            </Typography.Text>
          </Space>,
        ]}
      >
        <Meta
          title={
            <Typography.Title
              level={5}
              ellipsis={{ rows: 2 }}
              style={{ marginBottom: 8 }}
            >
              {post.title}
            </Typography.Title>
          }
          description={
            <Space direction="vertical" size="small" style={{ width: '100%' }}>
              <Typography.Paragraph
                ellipsis={{ rows: 3 }}
                type="secondary"
                style={{ marginBottom: 8 }}
              >
                {post.summary}
              </Typography.Paragraph>

              <Space size={4} wrap>
                {post.category && (
                  <Tag color="purple">{post.category}</Tag>
                )}
                {post.difficulty && (
                  <Tag
                    color={
                      post.difficulty === 'Beginner'
                        ? 'green'
                        : post.difficulty === 'Intermediate'
                          ? 'orange'
                          : 'red'
                    }
                  >
                    {post.difficulty}
                  </Tag>
                )}
                {post.tags.slice(0, 2).map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </Space>
            </Space>
          }
        />
      </Card>
    </Link>
  );
};

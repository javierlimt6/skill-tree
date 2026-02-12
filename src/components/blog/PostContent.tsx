'use client';

import { FC } from 'react';
import { Typography, Space, Tag, Divider, Button } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { BlogPostFull } from '@/types/blog.types';

const { Title, Paragraph, Text } = Typography;

interface Props {
  post: BlogPostFull;
}

export const PostContent: FC<Props> = ({ post }) => {
  const router = useRouter();

  return (
    <article style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
      {/* Back button */}
      <Button
        type="link"
        icon={<ArrowLeftOutlined />}
        onClick={() => router.push('/blog')}
        style={{ marginBottom: 16, paddingLeft: 0 }}
      >
        Back to Blog
      </Button>

      {/* Title */}
      <Title level={1}>{post.title}</Title>

      {/* Meta info */}
      <Space size="large" style={{ marginBottom: 24 }}>
        <Space size={4}>
          <CalendarOutlined />
          <Text type="secondary">{post.formattedDate}</Text>
        </Space>
        <Space size={4}>
          <ClockCircleOutlined />
          <Text type="secondary">{post.readTime} min read</Text>
        </Space>
      </Space>

      {/* Tags */}
      <div style={{ marginBottom: 24 }}>
        <Space size={4} wrap>
          {post.category && <Tag color="purple">{post.category}</Tag>}
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
          {post.tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </Space>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          style={{ width: '100%', borderRadius: 8, marginBottom: 24 }}
        />
      )}

      {/* Summary */}
      <Paragraph
        style={{ fontSize: 18, color: '#666', marginBottom: 24 }}
      >
        {post.summary}
      </Paragraph>

      <Divider />

      {/* Markdown content */}
      <div className="blog-content">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const codeString = String(children).replace(/\n$/, '');

              if (match) {
                return (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                  >
                    {codeString}
                  </SyntaxHighlighter>
                );
              }

              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {post.markdown}
        </ReactMarkdown>
      </div>

      <Divider />

      {/* Related roadmap topics */}
      {post.relatedRoadmapIds.length > 0 && (
        <div style={{ marginTop: 48 }}>
          <Title level={4}>Related Learning Topics</Title>
          <Button
            type="primary"
            onClick={() => router.push('/roadmap')}
          >
            View on Roadmap
          </Button>
        </div>
      )}
    </article>
  );
};

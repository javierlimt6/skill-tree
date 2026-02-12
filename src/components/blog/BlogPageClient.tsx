'use client';

import { FC, useState, useMemo } from 'react';
import { Space, Typography } from 'antd';
import { SearchBox } from '@/components/blog/SearchBox';
import { TagCloud } from '@/components/blog/TagCloud';
import { PostGrid } from '@/components/blog/PostGrid';
import type { BlogPostCard } from '@/types/blog.types';

const { Title } = Typography;

interface Props {
  initialPosts: BlogPostCard[];
  allTags: string[];
}

export const BlogPageClient: FC<Props> = ({ initialPosts, allTags }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredPosts = useMemo(() => {
    let filtered = initialPosts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.summary.toLowerCase().includes(q) ||
          post.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((post) =>
        selectedTags.some((tag) => post.tags.includes(tag))
      );
    }

    return filtered;
  }, [initialPosts, searchQuery, selectedTags]);

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Title level={2}>Learning Blog</Title>

      <SearchBox
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search posts by title, description, or tags..."
      />

      <TagCloud
        allTags={allTags}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />

      <PostGrid posts={filteredPosts} />
    </Space>
  );
};

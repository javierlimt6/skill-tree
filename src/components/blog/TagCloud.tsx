'use client';

import { FC } from 'react';
import { Tag, Space, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  allTags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagCloud: FC<Props> = ({ allTags, selectedTags, onTagClick }) => {
  if (allTags.length === 0) return null;

  return (
    <Space
      direction="vertical"
      size="small"
      style={{ width: '100%', marginBottom: 24 }}
    >
      <Text strong>Filter by tags:</Text>
      <Space size={8} wrap>
        {allTags.map((tag) => (
          <Tag.CheckableTag
            key={tag}
            checked={selectedTags.includes(tag)}
            onChange={() => onTagClick(tag)}
            style={{ fontSize: 14, padding: '4px 12px' }}
          >
            {tag}
          </Tag.CheckableTag>
        ))}
      </Space>
      {selectedTags.length > 0 && (
        <Text type="secondary" style={{ fontSize: 12 }}>
          {selectedTags.length} tag{selectedTags.length > 1 ? 's' : ''} selected
        </Text>
      )}
    </Space>
  );
};

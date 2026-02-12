'use client';

import { FC } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBox: FC<Props> = ({
  value,
  onChange,
  placeholder = 'Search posts...',
}) => {
  return (
    <Input
      size="large"
      placeholder={placeholder}
      prefix={<SearchOutlined />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      allowClear
      style={{ marginBottom: 24 }}
    />
  );
};

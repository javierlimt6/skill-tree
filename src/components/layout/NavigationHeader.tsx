'use client';

import { FC } from 'react';
import { Layout, Menu } from 'antd';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeOutlined,
  ApartmentOutlined,
  ReadOutlined,
  GithubOutlined,
} from '@ant-design/icons';

const { Header } = Layout;

export const NavigationHeader: FC = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: '/roadmap',
      icon: <ApartmentOutlined />,
      label: <Link href="/roadmap">Roadmap</Link>,
    },
    {
      key: '/blog',
      icon: <ReadOutlined />,
      label: <Link href="/blog">Blog</Link>,
    },
    {
      key: 'github',
      icon: <GithubOutlined />,
      label: (
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      ),
    },
  ];

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#001529',
        padding: '0 24px',
      }}
    >
      <Link
        href="/"
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginRight: 50,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        🚀 My Learning Journey
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={menuItems}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  );
};

'use client';

import { FC, ReactNode } from 'react';
import { ConfigProvider, Layout } from 'antd';
import { NavigationHeader } from './NavigationHeader';
import { PageFooter } from './PageFooter';

const { Content } = Layout;

interface Props {
  children: ReactNode;
}

export const LayoutShell: FC<Props> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <NavigationHeader />
        <Content
          style={{
            padding: '24px 50px',
            background: '#f0f2f5',
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: 24,
              minHeight: 380,
              borderRadius: 8,
            }}
          >
            {children}
          </div>
        </Content>
        <PageFooter />
      </Layout>
    </ConfigProvider>
  );
};

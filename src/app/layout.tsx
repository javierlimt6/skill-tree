import type { Metadata } from 'next';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider, Layout } from 'antd';
import { NavigationHeader } from '@/components/layout/NavigationHeader';
import { PageFooter } from '@/components/layout/PageFooter';

export const metadata: Metadata = {
  title: 'My Learning Journey',
  description:
    'Documenting my path through software engineering, one concept at a time.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <AntdRegistry>
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
              <Layout.Content
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
              </Layout.Content>
              <PageFooter />
            </Layout>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}

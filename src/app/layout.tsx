import type { Metadata } from 'next';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { LayoutShell } from '@/components/layout/LayoutShell';

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
          <LayoutShell>{children}</LayoutShell>
        </AntdRegistry>
      </body>
    </html>
  );
}

import { FC } from 'react';
import { Layout, Typography, Space } from 'antd';
import {
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
} from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

export const PageFooter: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Footer
      style={{
        textAlign: 'center',
        background: '#001529',
        color: 'rgba(255,255,255,0.65)',
      }}
    >
      <Space direction="vertical" size="middle">
        <Space size="large">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubOutlined style={{ fontSize: 24, color: '#fff' }} />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined style={{ fontSize: 24, color: '#fff' }} />
          </a>
          <a href="mailto:your.email@example.com">
            <MailOutlined style={{ fontSize: 24, color: '#fff' }} />
          </a>
        </Space>

        <Text style={{ color: 'rgba(255,255,255,0.65)' }}>
          Learning Journey ©{currentYear} | Built with Next.js + Ant Design +
          Notion
        </Text>
      </Space>
    </Footer>
  );
};

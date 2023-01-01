import { Layout } from 'antd';
import React from 'react';
import { AppHeader } from './Headers';

function PageLayout({ title, header, children }) {
  return (
    <Layout>
      <AppHeader title={title} {...header} />
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default PageLayout;
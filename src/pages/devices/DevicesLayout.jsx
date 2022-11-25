import { Layout } from 'antd';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from 'components';

function DevicesLayout({ children }) {
  return (
    <Layout className="site-layout">
      <AppHeader />
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Outlet />
        {children}
      </Layout.Content>
    </Layout>
  );
}

export default DevicesLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppHeader } from 'components';
import { Layout } from 'antd';

function AccountsLayout(props) {
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
      </Layout.Content>
    </Layout>
  );
}

export default AccountsLayout;
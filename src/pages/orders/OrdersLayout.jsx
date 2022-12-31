import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from '../../components';
import { Layout } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

function Orders(props) {
  const location = useLocation()
  const navigate = useNavigate()

  const Subtitle = () => {
    if(location.pathname.split('/')[2] === 'new') return 'Nueva orden'
    if(location.pathname.split('/')[2] === 'my-orders') return 'Mis ordenes'
    if(location.pathname.split('/')[2]?.length === 24) return 'Detalle'
  }

  const onBack = () => {
    return navigate('my-orders')
  }
  return (
    <Layout className="site-layout">
      <AppHeader
        title="Ordenes"
        subTitle={<Subtitle/>}
        onBack={ location.pathname.split('/')[2]?.length === 24 ? onBack : false}
        backIcon={<LeftOutlined/>}
      >
      </AppHeader>
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: '0 24px',
          minHeight: 280,
        }}
      >
        <Outlet />
      </Layout.Content>
    </Layout>
  );
}

export default Orders;
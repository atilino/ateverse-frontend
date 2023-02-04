import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AppHeader } from '../../components';
import { Layout } from 'antd';

function AccountsLayout(props) {
  return (
    <Layout className="site-layout">
      <AppHeader 
        title='Cuentas'
        subTitle={<Subtitle/>}
      />
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

const Subtitle = () => {
  const location = useLocation()
  if(location.pathname.split('/')[2] === 'summary') return 'Resumen'
  if(location.pathname.split('/')[2] === 'my-accounts') return 'Mis cuentas'
  if(location.pathname.split('/')[2] === 'blocked-profiles') return 'Perfiles bloqueados'
  if(location.pathname.split('/')[2] === 'personalities') return 'Personalidades'
  if(location.pathname.split('/')[3] === 'profiles') return 'Perfiles'


}

export default AccountsLayout;
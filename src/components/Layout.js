import { Layout } from 'antd';

import React, { useState } from 'react';
import Sider from './Sider';
import { AppHeader } from '.'

const { Content } = Layout;
const AppLayout = ({ children, roles }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider/>
            <Layout className="site-layout">
                <AppHeader/>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    { children }
                </Content>
            </Layout>

        </Layout>
    );
}
export default AppLayout
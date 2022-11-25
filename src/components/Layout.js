import { Layout } from 'antd';

import React, { useState } from 'react';
import Sider from './Sider';

const AppLayout = ({ children, roles }) => {
    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider />
            {children}
        </Layout>
    );
}
export default AppLayout

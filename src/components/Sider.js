import React from 'react';
import {
    UserOutlined,
    ContainerOutlined,
    TeamOutlined,
    ClusterOutlined,
    LogoutOutlined,
    ContactsOutlined,
    LineChartOutlined,
    TagsOutlined,
} from '@ant-design/icons';
import { CompanyName } from '../components/primitives'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useResponsiveBreakpoints, useAuth } from '../hooks';

function Sider(props) {
    const { logout, isAdmin, isModerator } = useAuth()
    const { sm } = useResponsiveBreakpoints()
    const location = useLocation()

    const menu = [
        {
            title: 'Dashboard',
            key: 'dashboard',
            icon: <LineChartOutlined/>,
            path: '/'
        },
        {
            title: 'Ordenes',
            key: 'orders',
            icon: <ContainerOutlined />,
            submenu: [
                {
                    title: 'Nueva orden',
                    key: 'orders/new',
                    path: '/orders/new'
                },
                {
                    title: 'Mis ordenes',
                    key: 'orders/my-orders',
                    path: '/orders/my-orders'
                },
            ]
        },
    ]
    if (isModerator || isAdmin) {
        menu.push(
            {
                title: 'Cuentas',
                key: 'accounts',
                icon: <TeamOutlined />,
                submenu: [
                    {
                        title: 'Mis cuentas',
                        key: 'accounts/my-accounts',
                        path: '/accounts/my-accounts'
                    },
                    {
                        title: 'Resumen',
                        key: 'accounts/summary',
                        path: '/accounts/summary'
                    },
                    {
                        title: 'Perfiles bloqueados',
                        key: 'accounts/blocked-profiles',
                        path: '/accounts/blocked-profiles'
                    },
                    {
                        title: 'Personalidades',
                        key: 'accounts/personalities',
                        path: '/accounts/personalities'
                    },
                ]
            },
            {
                title: 'Etiquetas',
                key: 'tags',
                icon: <TagsOutlined />,
                submenu: [
                    {
                        title: 'Cuentas',
                        key: 'tagsAccount',
                        icon: <TagsOutlined />,
                        path: '/tags/categories'
                    },
                    {
                        title: 'Grupos',
                        key: 'tagsGroup',
                        icon: <TagsOutlined />,
                        path: '/tags/group/categories'
                    },
                ]
            },
            {
                title: 'Clientes',
                key: 'customers',
                icon: <ContactsOutlined />,
                path: '/customers'
            },
            {
                title: 'Dispositivos',
                key: 'devices',
                icon: <ClusterOutlined />,
                path: '/devices'
            },
        )
    }
    if (isAdmin) {
        menu.push(
            {
                title: 'Usuarios',
                key: 'users',
                icon: <UserOutlined />,
                path: '/users'
            },
        )
    }
    menu.push(
        {
            title: 'Cerrar sesión',
            key: 'logout',
            icon: <LogoutOutlined />,
        },
    )
    return (
        <>
            <Layout.Sider
                breakpoint="md"
                collapsedWidth="0"
                style={{
                    position: 'fixed',
                    zIndex: 101,
                    height: '100%',
                }}
            >
                <CompanyName color='#fff' />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${location.pathname.substring(1)}`]} defaultOpenKeys={['orders', 'accounts']}>
                    {
                        menu.map((item, index) => (
                            <>
                                {item.submenu ?
                                    <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
                                        {item.submenu.map(subitem => (
                                            <Menu.Item key={`${subitem.key}`}>
                                                <Link to={subitem.path} key={`${item.key}-${subitem.key}-link`}>{subitem.title}</Link>
                                            </Menu.Item>
                                        ))}
                                    </Menu.SubMenu>
                                    :
                                    <Menu.Item key={item.key} icon={item.icon}>
                                        {item.key === 'logout' ?
                                            <a onClick={logout}>{item.title}</a>
                                            :
                                            <Link to={item.path} key={`${item.key}-link`}>{item.title}</Link>
                                        }
                                    </Menu.Item>
                                }
                            </>
                        ))
                    }
                </Menu>
            </Layout.Sider>
            <div style={{ marginRight: sm? '0' : '200px'}}/>
        </>
    );
}


export default Sider;

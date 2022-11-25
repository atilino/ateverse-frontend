import React from 'react';
import {
    UserOutlined,
    ContainerOutlined,
    TeamOutlined,
    ClusterOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { CompanyName } from '../components/primitives'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import useAuth from 'hooks/useAuth';

function Sider(props) {
    const { logout, isAdmin, isModerator } = useAuth()

    const location = useLocation()

    const menu = [
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
                        title: 'Cuentas',
                        key: 'accounts/my-accounts',
                        path: '/accounts/my-accounts'
                    },
                    {
                        title: 'Resumen de cuentas',
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
                title: 'Dispositivos',
                key: 'devices',
                icon: <ClusterOutlined />,
                path: '/devices'
            },
        )
    }
    if (isAdmin) {
        menu.push(
            // {
            //     title: 'Redes sociales',
            //     key: 'networks',
            //     icon: <FacebookFilled />,
            //     path: '/networks'
            // },
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
        <Layout.Sider
            breakpoint="lg"
            collapsedWidth="0"
        >
            <CompanyName color='#fff' />
            {console.log(location.pathname.substring(1))}
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${location.pathname.substring(1)}`]} defaultOpenKeys={['orders']}>
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
    );
}


export default Sider;

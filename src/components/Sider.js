import React from 'react';
import {
    UserOutlined,
    ContainerOutlined,
    TeamOutlined,
    ClusterOutlined,
    LogoutOutlined,
    FacebookFilled
} from '@ant-design/icons';
import { CompanyName } from '../components/primitives'
import { Layout, Menu } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import useUser from '../hooks/useUser'

function Sider(props) {
    const { currentUser, logout } = useUser()
    const history = useHistory();
    const { isAdmin, isModerator } = currentUser();

    const handleLogout = (e) => {
        logout()
        history.push('/')
        location.reload()
    }

    const menu = [
        {
            title: 'Ordenes',
            key: 'orders',
            icon: <ContainerOutlined />,
            submenu: [
                {
                    title: 'Crear orden',
                    key: 'create',
                    path: '/orders/create'
                },
                {
                    title: 'Estado de ordenes',
                    key: 'status',
                    path: '/orders/status'
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
                        title: 'Administrar cuentas',
                        key: 'manage',
                        path: '/accounts/manage'
                    },
                    // {
                    //     title: 'Actividad',
                    //     key: 'activity',
                    //     path: '/accounts/activity'
                    // },
                    {
                        title: 'Perfiles bloqueados',
                        key: 'blockedProfiles',
                        path: '/accounts/profiles/blocked'
                    },
                    {
                        title: 'Personalidades',
                        key: 'personalities',
                        path: '/accounts/personalities/templates'
                    },
                ]
            }
        )
    }
    if (isAdmin) {
        menu.push(
            {
                title: 'Redes sociales',
                key: 'networks',
                icon: <FacebookFilled />,
                path: '/networks'
            },
            {
                title: 'Dispositivos',
                key: 'devices',
                icon: <ClusterOutlined />,
                submenu: [
                    {
                        title: 'Administrar dispositivos',
                        key: 'manage',
                        path: '/devices/manage'
                    },
                    {
                        title: 'Monitorear dispositivos',
                        key: 'monit',
                        path: '/devices/monit'
                    },
                ]
            },
            {
                title: 'Usuarios',
                key: 'users',
                icon: <UserOutlined />,
                submenu: [
                    {
                        title: 'Administrar usuarios',
                        key: 'manage',
                        path: '/users/manage'
                    },
                ]
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
            <Menu theme="dark" mode="inline" defaultSelectedKeys={[`orders-create`]} defaultOpenKeys={['orders']}>
                {
                    menu.map((item, index) => (
                        <>
                            {item.submenu ?
                                <Menu.SubMenu key={item.key} title={item.title} icon={item.icon}>
                                    {item.submenu.map(subitem => (
                                        <Menu.Item key={`${item.key}-${subitem.key}`}>
                                            <Link to={subitem.path} key={`${item.key}-${subitem.key}-link`}>{subitem.title}</Link>
                                        </Menu.Item>
                                    ))}
                                </Menu.SubMenu>
                                :
                                <Menu.Item key={item.key} icon={item.icon}>
                                    {item.key === 'logout' ?
                                        <a onClick={handleLogout}>{item.title}</a>
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
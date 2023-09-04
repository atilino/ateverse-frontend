import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { AppHeader } from '../../components'
import { Layout } from 'antd'
import { LeftOutlined } from '@ant-design/icons'

function AccountsLayout(props) {
	const location = useLocation()
	return (
		<Layout className="site-layout">
			<AppHeader title="Etiquetas de Cuentas" subTitle={<Subtitle />}>
			</AppHeader>
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
	)
}

const Subtitle = () => {
	return ''
}

export default AccountsLayout

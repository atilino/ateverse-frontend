import Title from 'antd/lib/typography/Title'

export const DashboardTitle = ({ title, children }) => <Title level={4}>{title || children}</Title>

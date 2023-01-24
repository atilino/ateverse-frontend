import Title from 'antd/lib/typography/Title'

const DashboardTitle = ({ title, children }) => <Title level={4}>{title || children}</Title>

export default DashboardTitle

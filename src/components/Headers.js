import { Col, Layout, Row } from "antd"
import { DashboardTitle } from "."

export const AppHeader = () => <Layout.Header className="header" style={{ padding: 0, backgroundColor: '#fff' }} />

export const DashboardHeader = ({ title, children }) => (
  <div style={{ marginBottom: "2%" }}>
    <Row>
      <Col xl={12} xs={24}>
        <DashboardTitle title={title} />
      </Col>
      <Col xl={{ span: 2, offset: 9 }}>
        {children}
      </Col>
    </Row>
  </div>
)

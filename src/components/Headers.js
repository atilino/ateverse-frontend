import { Col, Layout, PageHeader, Row } from "antd"
import { DashboardTitle } from "."
import { PageTitle } from "./primitives"

/**
 * @param {import('antd').PageHeaderProps}
 */
export const AppHeader = ({ children, style, ...rest }) => (
  <>
    <PageHeader
      style={{
        backgroundColor: '#fff',
        position: 'fixed',
        zIndex: 100,
        width: '100%',
        boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.1)',
        ...style
      }}
      {...rest}
    >
      {children}
    </PageHeader>
    <div style={{ marginBottom: '80px'}}/>
  </>
)

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

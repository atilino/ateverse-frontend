import React from "react"
import { Table } from "antd"

export const TableColumn = ({ children, ...rest }) => (
  <Table.Column {...rest}>
    {children}
  </Table.Column>
)
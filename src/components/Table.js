import React from "react"
import { Table as TableComponent } from "antd"


export const TableColumn = ({ children=undefined, ...rest }) => (
  <TableComponent.Column {...rest}>
    {children}
  </TableComponent.Column>
)

export const Table = ({ children=undefined, ...rest }) => (
  <TableComponent {...rest}>
    {children}
  </TableComponent>
)

import React, { useRef } from "react"
import { Button, Input, Space, Table as TableComponent } from "antd"
import { SearchOutlined } from "@ant-design/icons"


export const TableColumn = ({ children = undefined, ...rest }) => (
  <TableComponent.Column {...rest}>
    {children}
  </TableComponent.Column>
)

export const Table = ({ children = undefined, ...rest }) => (
  <TableComponent {...rest}>
    {children}
  </TableComponent>
)

export const searchProps = ({ index, onSearch, onReset }) => {
  const searchInput = useRef(null);

  const handleSearch = (searchText, confirm) => {
    onSearch(searchText)
    confirm()
  }
  return ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, clearFilters, confirm }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar ${index}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys[0], confirm)}
          style={{ marginBottom: 8, display: 'block', }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys[0], confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters()
              console.log('reseted')
              onReset()
            }}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilterDropdownOpenChange: visible => visible && setTimeout(() => searchInput.current?.select(), 100)
  });
}

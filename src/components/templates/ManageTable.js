import { Space } from 'antd';
import React from 'react';
import { TableColumn, Table } from '../Table';


function ManageTable({
    columns = [],
    children = null,
    actions = [],
    onActionClick,
    size = "small",
    pagination = {},
    actionResponsive=null,
    ...rest
}) {

    return (
        <Table size={size} {...rest} pagination={{ showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30'], ...pagination }}>
            {columns.map((column, index) => (
                <TableColumn {...column} key={index} />
            ))}
            {children}
            {actions.length &&
                <TableColumn
                    title="Acción"
                    key="action"
                    render={(text, record) => (
                        <Space size="small" direction="vertical">
                            {actions.map((action, index) => (
                                <a key={index} onClick={e => onActionClick(e, action.dataIndex, record._id, record)}>{action.title}</a>
                            ))
                            }
                        </Space>
                    )}
                    responsive={actionResponsive}
                />
            }
        </Table>
    );
}

export default ManageTable;

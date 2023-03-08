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
    actionResponsive = null,
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
                        <Space size="small" direction="vertical" align='start'>
                            {actions.map((action, index) => (
                                action.render ?
                                    <a
                                        key={index}
                                        style={{
                                            'pointerEvents': action?.disabled && action?.disabled(record) === true? 'none' : 'auto',
                                            ...action.style
                                        }}
                                        onClick={e => onActionClick(e, action.dataIndex, record._id, record)}
                                        disabled={action?.disabled ? action?.disabled(record): false}
                                    >
                                        {action.render(action, record)}
                                    </a>
                                    :
                                    <a
                                        disabled={action?.disabled ? action?.disabled(record): false}
                                        key={index}
                                        style={{
                                            'pointerEvents': action?.disabled && action?.disabled(record) === true? 'none' : 'auto',
                                            ...action.style
                                        }}
                                        onClick={e => onActionClick(e, action.dataIndex, record._id, record)}
                                    >
                                        {action.title}
                                    </a>
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

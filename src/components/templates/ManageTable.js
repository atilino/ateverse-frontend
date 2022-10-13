import React from 'react';
import { Table, Space } from 'antd';

const { Column } = Table;

function ManageTable({ columns=[], children=null, actions=[], onActionClick, size="small", defaultPageSize=5, ...rest }) {

    return (
        <Table size={size} {...rest} pagination={{ defaultPageSize, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30']}}>
            {columns.map((column, index) => (
                <Column {...column} key={index} />
            ))}
            {children}
            {actions.length &&
                <Column
                    title="Acción"
                    key="action"
                    render={(text, record) => (
                        <Space size="small" direction="vertical">
                            {actions.map((action, index) => (
                                <a key={index} onClick={e => onActionClick(e, action.dataIndex, record._id)}>{action.title}</a>
                            ))
                            }
                        </Space>
                    )}

                />
            }
        </Table>
    );
}

export default ManageTable;
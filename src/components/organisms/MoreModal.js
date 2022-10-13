import { Descriptions, Modal } from 'antd';
import React from 'react';

function MoreModal({ title, data, columns, selected, bodyStyle={ padding: "40px" }, ...rest }) {
    return (
        <Modal {...rest} width="80%" footer={null}>
            <Descriptions
                title={title}
                layout="vertical"
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered>
                {columns.map(column =>
                    <Descriptions.Item key={column.key} label={column.title}>
                        {selected && (
                            column.render ?
                                column.render(selected[column.dataIndex], selected)
                                :
                                selected[column.dataIndex]
                        )
                        }
                    </Descriptions.Item>
                )}
            </Descriptions>
        </Modal>
    );
}

export default MoreModal;
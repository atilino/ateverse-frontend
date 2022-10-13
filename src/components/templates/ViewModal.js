import { Descriptions, Modal } from 'antd';
import React from 'react';

function ViewModal({ title='', columns=[], data={}, visible=false, ...rest }) {

    return (
        visible &&
        <Modal {...rest} visible={visible} width="80%" footer={null}>
            <Descriptions
                title={title}
                layout="vertical"
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                bordered>
                {columns.map(column =>
                    <Descriptions.Item key={column.key} label={column.title}>
                        {Object.keys(data).length && (
                            column.render ?
                                column.render(data[column.dataIndex], data)
                                :
                                data[column.dataIndex]
                        )
                        }
                    </Descriptions.Item>
                )}
            </Descriptions>
        </Modal>
    );
}

export default ViewModal;
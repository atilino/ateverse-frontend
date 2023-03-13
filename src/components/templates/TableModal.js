import { Col, Modal, Row } from 'antd';
import React from 'react';
import { ManageTable } from '.'

function TableModal({ columns = [], data = [], header, tableAtributes = {}, width = '50%', xs = false, md = false, lg = false, ...rest }) {
    width = lg ? '100%' : md ? '50%' : xs ? '25%' : width
    return (
        <Modal width={width} footer={null} {...rest}>
            <div style={{ padding: '1rem' }}>
                <Row>
                    {header}
                </Row>
                <Row>
                    <Col span={24}>
                        <ManageTable dataSource={data} columns={columns} {...tableAtributes} />
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}

export default TableModal;
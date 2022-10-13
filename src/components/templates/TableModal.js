import { Col, Modal, Row } from 'antd';
import React from 'react';
import { ManageTable } from '.'

function TableModal({ columns = [], data = [], header, tableAtributes = {}, ...rest }) {
    return (
        <Modal width="50%" footer={null} {...rest}>
            <Row>
                {header}
            </Row>
            <Row>
                <Col span={24}>
                    <ManageTable dataSource={data} columns={columns} {...tableAtributes} />
                </Col>
            </Row>
        </Modal>
    );
}

export default TableModal;
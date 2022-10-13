import { Modal } from 'antd';
import React from 'react';
import CustomForm from './CustomForm';

const FormModal = ({ children, fields = [], selected = {}, onFinish, visible = false, ...rest }) => (
    visible &&
    <Modal {...rest} width="60%" footer={null} visible={visible}>
        <CustomForm fields={fields} selected={selected} onFinish={onFinish}>
            {children}
        </CustomForm>
    </Modal>
);

export default FormModal;
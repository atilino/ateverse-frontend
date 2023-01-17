import { Modal } from 'antd';
import React from 'react';
import CustomForm from './CustomForm';

const FormModal = ({ children, fields = [], selected = {}, onFinish, form, visible = false, defaultValue, ...rest }) => (
    visible &&
    <Modal {...rest} width="60%" footer={null} visible={visible}>
        <CustomForm fields={fields} selected={selected} onFinish={onFinish} form={form} defaultValue={defaultValue}>
            {children}
        </CustomForm>
    </Modal>
);

export default FormModal;
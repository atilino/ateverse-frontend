import React from 'react';
import { Modal as ModalComponent } from 'antd'

const Modal = ({ title, visible, children, ...rest }) => (
    <ModalComponent
        title={title}
        visible={visible}
        {...rest}
    >
        {children}
    </ModalComponent>
)

export default Modal;
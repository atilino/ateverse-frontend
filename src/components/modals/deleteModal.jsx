import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

function deleteModal({ message, onOk }) {
  Modal.confirm({
    title: '¿Seguro que deseas eliminar este elemento?',
    icon: <ExclamationCircleOutlined />,
    content: message,
    okText: 'Si',
    okType: 'danger',
    cancelText: 'No',
    onOk,
    onCancel() { },
  });
  return (
    <div>

    </div>
  );
}

export default deleteModal;
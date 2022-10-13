import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons'
import orderService from '../../services/orders';
import accountService from '../../services/accounts';
import deviceService from '../../services/devices';
import userService from '../../services/users';
import { notification } from '../primitives';
import personalityService from '../../services/personalities';

const deleteModal = (name, page, id, onFinish) => {
    Modal.confirm({
        title: '¿Seguro que deseas eliminar este elemento?',
        icon: <ExclamationCircleOutlined />,
        content: `Estas a punto de eliminar a ${name}`,
        okText: 'Si',
        okType: 'danger',
        cancelText: 'No',
        onOk() {deleteItem(page, id)},
        onCancel() {},
    });
    
    const deleteItem = async (page, id) => {
        const selector = {
            orders: () => orderService.deleteOrderById(id),
            accounts: () => accountService.deleteAccountById(id),
            devices: () => deviceService.deleteDeviceById(id),
            users: () => userService.deleteUserById(id),
            profiles: () => accountService.deleteProfileById(id),
            personalityTemplates: () => personalityService.deleteTemplateById(id)
        }
        const result = await selector[page]()
        if(result.error) notification.deleteError(result.error)
        else notification.success('Eliminado con exito')
        onFinish()
        // window.location.reload()
    }
}


export default deleteModal;
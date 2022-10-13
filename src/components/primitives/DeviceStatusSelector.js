import React, { useEffect, useState } from 'react';
import { getDeviceStatus } from '../../services/catalogs'
import notification from './notification'
import formater from '../../libs/formater'
import { Form, Select } from 'antd';

function DeviceStatusSelector({ label='Estado', required=true }) {
    const [status, setStatus] = useState([])

    useEffect(async () => {
        const result = await getDeviceStatus()
        if (result.error) return notification.loadingError(result.status)
        setStatus(formater.select(result.data, { label: 'name', value: '_id' }))
    }, [])

    return (
        <Form.Item
            label={label}
            name="status"
            key="status"
        >
            <Select
                placeholder="Seleccionar estado"
                style={{ width: '100%' }}
                options={status}
            />
        </Form.Item>
    );
}

export default DeviceStatusSelector;
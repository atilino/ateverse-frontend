import React, { useEffect, useState } from 'react';
import networkService from '../../services/networks'
import notification from './notification'
import formater from '../../libs/formater'
import { Form, Select } from 'antd';

function NetworkSelector({ label='Red social', required=true }) {
    const [networks, setNetworks] = useState([])

    useEffect(async () => {
        const result = await networkService.getNetworks()
        if (result.error) return notification.loadingError(result.status)
        setNetworks(formater.select(result.data, { label: 'label', value: '_id' }))
    }, [])

    return (
        <Form.Item
            label={label}
            name="network"
            key="network"
            rules={[
                {
                    required: required,
                    message: 'La red social es requerida',
                },
            ]}
        >
            <Select
                placeholder="Seleccionar red"
                style={{ width: '100%' }}
                options={networks}
            />
        </Form.Item>
    );
}

export default NetworkSelector;
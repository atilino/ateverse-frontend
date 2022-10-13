import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd'
import { getRoles } from '../../services/roles';
import { notification } from '.';

function RoleSelector() {

    const [options, setOptions] = useState([])

    useEffect(() => {
        const getData = async () => {
            const result = await getRoles()
            if (result.error) return notification.loadingError()
            const formatedResult = formatData(result.data)
            setOptions(formatedResult)
        }
        getData()
    }, [])

    const formatData = (data) => {
        return data.map(item => {
            return {
                value: item.name,
                label: item.name
            }
        })
    }
    return (
        <Form.Item
            label='Roles'
            key='roles'
            name='roles'
        >
            <Select
                mode="multiple"
                placeholder="Seleccionar rol"
                style={{ width: '100%' }}
                options={options}
            />
        </Form.Item>
    );
}

export default RoleSelector;
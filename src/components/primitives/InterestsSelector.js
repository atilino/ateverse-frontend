import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd'
import { notification } from '.';
import interestsService from '../../services/interests'
import formater from '../../libs/formater';

function InterestsSelector({  label="Intereses", required=true, defaultValue=[] }) {

    const [options, setOptions] = useState([])

    useEffect(() => {
        const getData = async () => {
            const result = await interestsService.getInterests()
            if (result.error) return notification.loadingError()
            setOptions(formater.select(result.data, { label: 'label', value: '_id' }))
        }
        getData()
    }, [])

    return (
        <Form.Item
            label={label}
            key='interests'
            name='interests'
        >
            <Select
                mode="multiple"
                placeholder="Seleccionar intereses"
                style={{ width: '100%' }}
                options={options}
                rules={[
                    {
                        required: required,
                        message: 'Los intereses son requeridos',
                    },
                ]}
            />
        </Form.Item>
    );
}

export default InterestsSelector;
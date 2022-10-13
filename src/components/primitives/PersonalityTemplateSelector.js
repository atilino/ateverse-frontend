import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd'
import { notification } from '.';
import personalityService from '../../services/personalities'
import formater from '../../libs/formater';

function PersonalityTemplateSelector({  label="Template de personalidad", required=true, defaultValue=[], onChange=()=>{} }) {

    const [options, setOptions] = useState([])

    useEffect(() => {
        const getData = async () => {
            const result = await personalityService.getTemplates()
            if (result.error) return notification.loadingError()
            setOptions(formater.select(result.data, { label: 'name', value: '_id' }))
        }
        getData()
    }, [])

    return (
        <Form.Item
            label={label}
            key='personalityTemplate'
            name='personalityTemplate'
        >
            <Select
                placeholder="Seleccionar template de personalidad"
                style={{ width: '100%' }}
                options={options}
                onChange={onChange}
            />
        </Form.Item>
    );
}

export default PersonalityTemplateSelector;
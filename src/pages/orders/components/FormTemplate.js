import { Col, Row } from 'antd';
import React from 'react';
import { FormItem, FormLayout, FormSelect } from '../../../components/Form';
import { useCustomer, useTag } from '../../../hooks';
import { DebounceSelect } from '../../../components';

function FormTemplate({ priority, children, disabled, ...rest }) {
    const { customers } = useCustomer()
    const { listTags } = useTag()

    const fetchTags = async value => {
        const tags = await listTags({ name: value })
        return tags.map(tag => ({ ...tag, label: tag.name, value: tag._id }))
    }
    return (
        <FormLayout
            name='order'
            {...rest}
            style={{ width: '100%', ...rest.style }}
        >
            <Row justify='center'>
                <Col span={24}>
                    <FormSelect
                        label='Cliente'
                        name='customer'
                        data={customers}
                        config={{ label: 'name', value: '_id' }}
                        disabled={disabled}
                    />
                </Col>
            </Row>
            <Row justify='center'>
                <Col span={24}>
                    <FormItem label='Etiquetas' name='tags'>
                        <DebounceSelect
                            mode="multiple"
                            placeholder="Seleccionar etiquetas"
                            style={{ width: '100%' }}
                            fetchOptions={fetchTags}
                        />
                    </FormItem>
                </Col>
            </Row>
            {children}
        </FormLayout>
    );
}

export default FormTemplate;
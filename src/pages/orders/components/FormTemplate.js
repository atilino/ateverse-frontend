import { Col, Row } from 'antd';
import React from 'react';
import { FormItem, FormLayout, FormSelect } from '../../../components/Form';
import { useCustomer, useTag } from '../../../hooks';
import { DebounceSelect } from '../../../components';

function FormTemplate({ priority, children, ...rest }) {
    const { customers } = useCustomer()
    const { listTags } = useTag()

    const fetchTags = async value => {
        const tags = await listTags({ name: value })
        return tags.map(tag => ({ ...tag, label: tag.name, value: tag._id }))
    }

    function validateItems(array) {
        const categories = {}
        const isDuplicate = item => {
            const { name, multiSelect } = item.categoryId
            if (categories[name] && !categories[name].multiSelect) {
                return true
            }
            categories[name] = { multiSelect }
            return false
        }
        return !array.flatMap(isDuplicate).some(duplicate => duplicate)
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
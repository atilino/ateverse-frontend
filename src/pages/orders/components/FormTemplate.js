import { Checkbox, Col, Row } from 'antd';
import React from 'react';
import { FormItem, FormLayout, FormSelect } from '../../../components/Form';
import { useCustomer } from '../../../hooks';

function FormTemplate({ priority, children, ...rest }) {
    const { customers } = useCustomer()
    return (
        <FormLayout {...rest} initialValues={{ ...rest.initialValues, customer: customers[0]?._id }}>
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
            {children}
            {!priority &&
                <FormItem label="Prioritaria" name="priority" valuePropName="checked">
                    <Checkbox />
                </FormItem>
            }
        </FormLayout>
    );
}

export default FormTemplate;
import { Col, Row } from 'antd';
import React from 'react';
import { FormLayout, FormSelect } from '../../../components/Form';
import { useCustomer } from '../../../hooks';

function FormTemplate({ priority, children, ...rest }) {
    const { customers } = useCustomer()
    return (
        <FormLayout
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
            {children}
        </FormLayout>
    );
}

export default FormTemplate;
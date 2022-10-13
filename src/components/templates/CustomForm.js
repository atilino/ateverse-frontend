import React from 'react';
import { Form, Input, Button, Modal, Select } from 'antd';

const fieldTypes = {
    text: (atributes) => <Input {...atributes}/>,
    password: (atributes) => <Input.Password {...atributes}/>,
    number: (atributes) => <Input type="number" {...atributes}/>,
    textarea: (atributes) => <Input.Textarea {...atributes}/>,
}

function CustomForm({ children, fields = [], selected = {}, onFinish, }) {
    return (
        <Form onFinish={onFinish} initialValues={selected}>
            {fields.length > 0 && fields.map((field = { atributes: {} }) => (
                <Form.Item
                    label={field.label}
                    key={field.key}
                    name={field.name}
                    rules={field.rules}
                >
                    {field.type !== 'select' ?
                        fieldTypes[field.type](field.atributes)
                        :
                        field.type === 'select' && (
                            <Select {...field.atributes}>
                                {field.options.map((option, index) =>
                                    <Select.Option value={option.value ? option.value : index} key={option.key ? option.key : index}>{option.name ? option.name : option}</Select.Option>
                                )}
                            </Select>
                        )
                    }

                </Form.Item>
            ))
            }
            {children}
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Guardar
                </Button>
            </Form.Item>
        </Form>
    );
}

export default CustomForm;
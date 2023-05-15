import React from 'react';
import { Form, Input, Button, Select, Checkbox } from 'antd';

const fieldTypes = {
    text: (atributes) => <Input {...atributes} />,
    password: (atributes) => <Input.Password {...atributes} />,
    number: (atributes) => <Input type="number" {...atributes} />,
    textarea: (atributes) => <Input.TextArea {...atributes} />,
    checkbox: (atributes) => <Checkbox {...atributes} />,
}

function CustomForm({ children, fields = [], selected = {}, onFinish, form, defaultValue }) {
    return (
        <Form onFinish={onFinish} initialValues={selected} form={form} defaultValue={defaultValue}>
            {fields.length > 0 && fields.map((field = { atributes: {} }) => (
                <Form.Item
                    label={field.label}
                    key={field.key}
                    name={field.name}
                    rules={field.rules}
                    valuePropName={field.valuePropName}
                    {...field}
                >
                    {field.render ?
                        field.render
                        :
                        field.type !== 'select' ?
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
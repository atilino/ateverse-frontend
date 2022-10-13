import React from 'react';
import {
    Form,
    Button,
    Input,
    InputNumber
} from 'antd'
import { Selector } from './primitives';
import './Form.css'

export const FormLayout = ({ children, disabled = false, ...rest }) => {
    return (
        <Form
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 16,
            }}
            layout="horizontal"
            size="middle"
            {...rest}
        >
            {children}
            <FormItem
                wrapperCol={{
                    offset: 8,
                    span: 16
                }}
            >
                <Button disabled={disabled} style={{ width: "50%", margin: "auto" }} type="primary" htmlType="submit">
                    Enviar
                </Button>
            </FormItem>
        </Form >
    );
}

export const FormItem = ({ children, ...rest }) => (
    <Form.Item style={{ justifyContent: "center", padding: "0 2%" }} {...rest}>
        {children}
    </Form.Item>
)

export const FormList = ({ children, ...rest }) => (
    <Form.List {...rest}>
        {children}
    </Form.List>
)

export const FormInput = ({ label, name, rules, ...rest }) => (
    <FormItem label={label} name={name} rules={rules}>
        <Input {...rest} />
    </FormItem>
)

export const FormInputNumber = ({ label, name, rules, ...rest }) => (
    <FormItem label={label} name={name} rules={rules}>
        <InputNumber {...rest} />
    </FormItem>
)

/**
 * 
 * @param {string} label Label of form item
 * @param {string} name Name of form item
 * @param {object} rules List of rules
 * @param {array} data Data of select options
 * @param {object} config Provide the select options configuration: { label = name of label property on data array, value = name of value property on data array}
 */
export const FormSelect = ({ label, name, rules, children, ...rest }) => (
    <FormItem label={label} name={name} rules={rules}>
        <Selector {...rest} />
    </FormItem>
)

export const FormButton = ({ children, ...rest }) => (
    <FormItem>
        <Button {...rest}>
            {children}
        </Button>
    </FormItem>
)

export const useForm = () => Form.useForm()
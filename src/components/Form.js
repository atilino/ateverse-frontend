import React from 'react';
import {
    Form,
    Button,
    Input,
    InputNumber,
    Checkbox
} from 'antd'
import { Selector } from './primitives';
import './Form.css'

export const FormLayout = ({ children, disabled = false, noSubmit = false, ...rest }) => {
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
            {!noSubmit &&
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
            }
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

/**
 * 
 * @param {import('antd').InputProps} props 
 * @param {import('antd').FormItemProps} props.item
 */
export const FormInput = ({ label, name, rules, item, ...rest }) => (
    <FormItem label={label} name={name} rules={rules} {...item}>
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
export const FormSelect = ({ label, name, rules, children, item, ...rest }) => (
    <FormItem label={label} name={name} rules={rules} {...item}>
        <Selector {...rest} />
    </FormItem>
)

/**
 * 
 * @param {import('antd').ButtonProps} props 
 * @returns {React.Component}}
 */
export const FormButton = ({ children, item, ...rest }) => (
    <FormItem {...item}>
        <Button {...rest}>
            {children}
        </Button>
    </FormItem>
)

/**
 * 
 * @param {import('antd').CheckboxProps} props 
 * @param {import('antd').FormItemProps} props.item
 */
export const FormCheckbox = ({ children, label, name, rules, item, ...rest }) => (
    <FormItem label={label} name={name} rules={rules} {...item}>
        <Checkbox {...rest}>
            {children}
        </Checkbox>
    </FormItem>
)

export const useForm = () => Form.useForm()
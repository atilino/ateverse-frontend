import { Checkbox } from 'antd';
import React from 'react';
import { FormItem, FormLayout } from '../../../components/Form';

function FormTemplate({ priority, children, ...rest }) {
    return (
        <FormLayout
            {...rest}
        >
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
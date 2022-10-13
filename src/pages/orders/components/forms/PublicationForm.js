import { Input } from 'antd';
import React from 'react';
import { FormItem } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import useProfiles from '../../../../hooks/useProfiles';
import AvailableMessage from '../AvailableMessage';

function PublicationForm({ initialValues, onValuesChange, form, value, onFinish, onError }) {
    const { profilesCount } = useProfiles({ type: 'available', network: 'twitter' })

    return (
        <FormTemplate
            disabled={profilesCount === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={onValuesChange}
            onFinish={values => onFinish({ ...values, network: 'twitter' })}
        >
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                <AvailableMessage quantity={profilesCount} />
            </div>

            <FormItem label="Publicaciones" name="publications">
                <Input.TextArea />
            </FormItem>
        </FormTemplate>
    );
}

export default PublicationForm;
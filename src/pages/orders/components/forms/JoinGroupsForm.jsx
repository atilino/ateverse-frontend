import React from 'react'
import { FormItem, FormSelect } from '../../../../components/Form'
import FormTemplate from '../FormTemplate'
import useProfiles from '../../../../hooks/useProfiles'
import { JoinGroupsInput } from '..'

function JoinGroupsForm({ initialValues, onValuesChange, form, onFinish, onError }) {

    const { profiles } = useProfiles({ type: 'active', network: 'facebook' })

    return (
        <FormTemplate
            priority
            disabled={profiles.length === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={values => onValuesChange({ joinGroups: values })}
            onFinish={values => onFinish({ options: values, priority: true, customer: values.customer })}
        >
            <FormSelect
                label="Perfil"
                name="profileId"
                data={profiles}
                config={{
                    label: 'accountId name',
                    value: '_id'
                }}
            />
            <FormItem
                label="Grupos"
                name="groups"
                rules={[
                    {
                        required: true,
                        message: 'Se requiere seleccionar un grupo'
                    },
                ]}
            >
                <JoinGroupsInput />
            </FormItem>
        </FormTemplate>
    );
}

export default JoinGroupsForm;

import React from 'react';
import { FormInput, FormItem, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import { ShareGroupsInput } from '..'
import useProfiles from '../../../../hooks/useProfiles';
import { validateLink } from '../../utilities';
import { filterUndefined } from 'utilities/index';

function ShareGroupsForm({ form, initialValues, onValuesChange, onFinish, onError }) {

    const { profiles, groups, getProfileGroups } = useProfiles({ type: 'active', network: 'facebook' })
    return (
        <FormTemplate
            priority
            disabled={profiles.length === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={values => {
                const { profileId, groups } = values

                if (profileId) getProfileGroups(profileId)
                if (groups) {
                    groups = filterUndefined(groups)
                }
                onValuesChange({ shareGroups: values })
            }}
            onFinish={values => {

                if (!validateLink('facebook', values.link)) return onError('URL no valida', 'Compruebe su link')
                if (values.groups) {
                    values.groups = values.groups.map(group => {
                        return {
                            name: group.name,
                            comment: group.comment ? group.comment : ''
                        }
                    })
                }
                onFinish({ options: values, priority: true, customer: values.customer })
            }}
        >
            <FormInput label="Link" name="link" />
            <FormSelect
                label="Perfil"
                name="profileId"
                data={profiles}
                config={{
                    label: "accountId name",
                    value: "_id"
                }}
                rules={[
                    {
                        required: true,
                        message: 'Se requiere seleccionar un perfil'
                    },
                ]}
            />
            <FormItem
                label="Grupos"
                name="groups"
                rules={[
                    {
                        required: true,
                        message: 'Se requiere seleccionar un grupo'
                    },
                ]}>
                <ShareGroupsInput groups={groups} />
            </FormItem>
        </FormTemplate>
    );
}

export default ShareGroupsForm;

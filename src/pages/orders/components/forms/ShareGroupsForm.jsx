import React from 'react';
import { FormInput, FormItem, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import { ShareGroupsInput } from '..'
import useProfiles from '../../../../hooks/useProfiles';
import { validateLink } from '../../utilities';
import { haveRepeatedValueByKey, filterUndefined } from '../../../../utilities';

function ShareGroupsForm({ form, initialValues, onValuesChange, onFinish, onError }) {

    const { profiles, groups, filterProfilesGroups } = useProfiles({ type: 'groups', network: 'facebook' })
    return (
        <FormTemplate
            priority
            disabled={profiles.length === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={values => {
                onValuesChange({ options: { groups: values.groups } })
            }}
            onFinish={values => {
                if (!validateLink('facebook', values.link)) return onError('URL no valida', 'Compruebe su link')
                if (haveRepeatedValueByKey(values.groups, 'groupId')) {
                    return onError('Grupos repetidos', 'Algunos grupos ya se encuentran seleccionados')
                }
                onFinish({
                    options: {
                        groups: values.groups.map(group => ({ ...group, comment: group.comment || '' })),
                        link: values.link
                    },
                    priority: true,
                    customer: values.customer
                })
            }}
        >
            <FormInput label="Link" name="link" />
            <FormItem
                label="Grupos"
                name="groups"
                rules={[
                    {
                        required: true,
                        message: 'Se requiere seleccionar un grupo'
                    },
                ]}>
                <ShareGroupsInput groups={groups} selectedGroups={initialValues.options.groups} />
            </FormItem>
        </FormTemplate>
    );
}

export default ShareGroupsForm;

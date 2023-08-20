import React from 'react';
import { FormInput, FormItem, FormSelect } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import { ShareGroupsInput, ShareGroupsInputMulti } from '..'
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
                const groups = [];
                if (!validateLink('facebook', values.link)) return onError('URL no valida', 'Compruebe su link')
                if (!values.groups && !values.groupsMulti) return onError('Debes seleccionar un grupo')
                if(values.groups) groups.push(...values.groups.map(group => ({ ...group, comment: group.comment || '' })));
                if(values.groupsMulti) groups.push(...values.groupsMulti.selecteds.groupIds.map(group => ({ groupId: group, comment: '' })))
                if (haveRepeatedValueByKey(groups, 'groupId')) {
                    return onError('Grupos repetidos', 'Algunos grupos ya se encuentran seleccionados')
                }
                onFinish({
                    options: {
                        groups: groups,
                        link: values.link
                    },
                    priority: true,
                    customer: values.customer,
                    tags: values.tags
                })
            }}
        >
            <FormInput label="Link" name="link" />
            <FormItem
                label="Grupos"
                name="groupsMulti"
                rules={[]}>
                <ShareGroupsInputMulti groups={groups} selectedGroups={initialValues.options.groups} />
            </FormItem>
            <FormItem
                label="Grupos"
                name="groups"
                rules={[]}>
                <ShareGroupsInput groups={groups} selectedGroups={initialValues.options.groups} />
            </FormItem>
        </FormTemplate>
    );
}

export default ShareGroupsForm;

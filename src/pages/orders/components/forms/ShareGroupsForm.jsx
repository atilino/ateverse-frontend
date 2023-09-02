import React, { useEffect, useState } from 'react';
import { FormInput, FormItem, FormSelect, FormList } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import { ShareGroupsInput, ShareGroupsInputMulti } from '..'
import { useProfiles, useTag } from '../../../../hooks';
import { validateLink } from '../../utilities';
import { haveRepeatedValueByKey, filterUndefined } from '../../../../utilities';
import { Selector } from '../../../../components/primitives';

function ShareGroupsForm({ form, initialValues, onValuesChange, onFinish, onError }) {

    const { profiles, groups, filterProfilesGroups } = useProfiles({ type: 'groups', network: 'facebook' })
    const { listTagsGroup, tags: tagsGroup } = useTag()
    const [selectedTagsGroup, setSelectedTagsGroup] = useState([]);

    useEffect(()=>{listTagsGroup()},[])

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
                if (!values.link || !validateLink('facebook', values.link)) return onError('URL no valida', 'Compruebe su link')
                if(!values.tagsGroups?.length) {
                    if (!values.groups?.length && !values.groupsMulti?.selecteds?.groupIds?.length) return onError('Debes seleccionar un grupo')
                    if(values.groups?.length) groups.push(...values.groups.map(group => ({ ...group, comment: group.comment || '' })));
                    if(values.groupsMulti) groups.push(...values.groupsMulti.selecteds.groupIds.map(group => ({ groupId: group, comment: '' })))
                    if (haveRepeatedValueByKey(groups, 'groupId')) {
                        return onError('Grupos repetidos', 'Algunos grupos ya se encuentran seleccionados')
                    }
                }
                onFinish({
                    options: {
                        groups: groups,
                        link: values.link,
                        tagsGroup: values.tagsGroups,
                    },
                    priority: true,
                    customer: values.customer,
                    tags: values.tags
                })
            }}
        >
            <FormInput label="Link" name="link" />
            <FormItem
                label="Etiquetas de Grupos"
                name="tagsGroups"
                rules={[]}
            >
                <FormItem
                    name={"tagsGroups"}
                    rules={[]}
                    style={{ width: '100%', marginRigth: '2%', marginBottom: '2%' }}
                >
                    <Selector
                        mode="multiple"
                        data={tagsGroup}
                        placeholder="Selecciona etiquetas de grupos"
                        config={{ label: 'name', value: '_id' }}
                        onChange={(selecteds) => setSelectedTagsGroup(selecteds)}
                    />
                </FormItem>
            </FormItem>
            {
                !(selectedTagsGroup.length > 0) &&
                <>
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
                </>
            }
        </FormTemplate>
    );
}

export default ShareGroupsForm;

import { FormItem } from '../../../../components/Form';
import FormTemplate from '../FormTemplate';
import { ShareGroupsInputMulti } from '..'
import { useProfiles} from '../../../../hooks';

function ConfirmGroupsForm({ form, initialValues, onValuesChange, onFinish, onError }) {

    const { profiles, groups, filterProfilesGroups } = useProfiles({ type: 'groups', network: 'facebook' })

    return (
        <FormTemplate
            priority
            disabledTags
            disabled={profiles.length === 0}
            form={form}
            initialValues={initialValues}
            onValuesChange={values => {
                onValuesChange({ options: { groups: values.groups } })
            }}
            onFinish={values => {
                const groups = [];
                if (!values.groupsMulti?.selecteds?.groupIds) return onError('Debes seleccionar un grupo')
                if(values.groupsMulti) groups.push({groupId: values.groupsMulti.selecteds.groupIds})
                console.log(groups)
                onFinish({
                    options: {
                        groups: groups,
                    },
                    priority: true,
                    customer: values.customer,
                    tags: []
                })
            }}
        >
            <FormItem
                label="Grupos"
                name="groupsMulti"
                rules={[]}
            >
                <ShareGroupsInputMulti groups={groups} multiselect={false} />
            </FormItem>
        </FormTemplate>
    );
}

export default ConfirmGroupsForm;

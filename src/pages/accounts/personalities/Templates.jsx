import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import { deleteModal, FormModal, ManagePanel, ViewModal } from '../../../components/templates'
import { notification } from '../../../components/primitives';
import { getData } from '../../../libs/dataToTable';
import { actions, columns } from '../../../resources/tables';
import { forms } from '../../../resources/forms'
import personalityService from '../../../services/personalities';
import { PersonalityForm } from '../../../components/organisms';

function Templates(props) {
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [selected, setSelected] = useState({})
    const [personalityModal, setPersonalityModal] = useState(false)

    useEffect(async () => {
        const result = await getData('personalityTemplates')
        if (result.error) return notification.loadingError(result.status)
        setData(result.data)
    }, [reload])

    const handleActionClick = async (e, index, id) => {
        e.preventDefault()

        const selection = data.filter(item => item._id === id)[0]
        setSelected(selection)

        if (index === 'update') {
            let personality = await getPersonality(selection.personality)
            const interests = personality.interests.map(interest => interest._id)
            personality = { ...personality, network: personality.networkPriority._id, interests }

            setSelected({ ...personality, ...selection })
            setUpdateModal(true)
        }
        if (index === 'delete') {
            deleteModal(selection.name, 'personalityTemplates', id, () => setReload(!reload))
        }
    }
    const onFinish = async (values, method) => {
        const {
            network,
            activityLevel,
            activityHours,
            activityDays,
            interests,
            ...valuesTemplate
        } = values
        let personality = {
            networkPriority: network,
            activityLevel,
            activityHours,
            activityDays,
            interests,
        }
        const resultPersonality = await personalityService.updatePersonalityById(selected.personality, personality)
        if (resultPersonality.error) return notification.updateError()
        values = { ...valuesTemplate, personality: selected.personality }

        const result = await personalityService.updateTemplateById(selected._id, values)
        if (result.error) return notification.updateError(result.status)
        notification.updateSuccess()
        handleCloseModal()
    }
    const handleViewPersonality = async (id) => {
        const result = await getPersonality(id)
        setSelected(result)
        setPersonalityModal(true)
    }
    const getPersonality = async (id) => {
        const result = await personalityService.getPersonalityById(id)
        if (result.error) return notification.loadingError(result.status)
        return result.data
    }
    const handleCloseModal = () => {
        setReload(!reload)
        setUpdateModal(false)
        setPersonalityModal(false)

    }
    const CustomColumns = (
        <>
            <Table.Column
                title='Personalidad'
                dataIndex='personality'
                key='personality'
                align="center"
                render={personality => <a onClick={() => handleViewPersonality(personality)}>Ver</a>}
            />
        </>
    )
    return (
        <>
            <ManagePanel
                model='personalityTemplates'
                reload={handleCloseModal}
                tableAtributes={{
                    data: data,
                    columns: columns.personalityTemplates,
                    actions: actions.deleteAndUpdate,
                    onActionClick: handleActionClick,
                    loading: data.length ? false : true,
                    children: CustomColumns
                }}
            />
            {personalityModal &&
                <ViewModal
                    visible={personalityModal}
                    title='Personalidad'
                    data={selected}
                    columns={columns.personality}
                    onCancel={handleCloseModal} />
            }
            {updateModal &&
                <FormModal
                    visible={updateModal}
                    fields={forms.personalityTemplates}
                    selected={selected}
                    onCancel={handleCloseModal}
                    onFinish={(values) => onFinish(values)}
                    title={'Actualizar template de personalidad'}
                >
                    <PersonalityForm />
                </FormModal>
            }
        </>
    )
}

export default Templates;

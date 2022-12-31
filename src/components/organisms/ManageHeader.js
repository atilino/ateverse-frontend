import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { FormModal } from '../templates';
import { spanishLabels } from '../../resources/variables';
import { NetworkSelector, notification, PageTitle, RoleSelector } from '../primitives';
import { forms } from '../../resources/forms'
import accountService from '../../services/accounts';
import deviceService from '../../services/devices';
import authService from '../../services/auth';
import { useParams } from 'react-router-dom'
import networkService from '../../services/networks';
import { PersonalityForm } from '.';
import personalityService from '../../services/personalities';
import PersonalityTemplateSelector from '../primitives/PersonalityTemplateSelector';
import useAccount from '../../hooks/useAccount';

function ManageHeader({ title, model, label, reload, onCreateSubmit, formFields }) {
    const [createModal, setCreateModal] = useState(false)
    const [requiredFields, setRequiredFields] = useState(true)
    const { createAccount } = useAccount()

    const customForm = {
        users: <RoleSelector />,
        profiles: <NetworkSelector />,
        accounts: <>
            <PersonalityForm requiredFields={requiredFields}/>
            <PersonalityTemplateSelector onChange={()=>setRequiredFields(false)}/>
        </>,
        personalityTemplates: <PersonalityForm />
    }
    const { accountId } = useParams()

    const toAccountObject = (object) => {
        return {
            name: object.name,
            phone: object.phone,
            personality: {
                networkPriority: object.networkPriority,
                activityLevel: object.activityLevel,
                activityHours: object.activityHours,
                activityDays: object.activityDays,
                interests: object.interests,
            }
        }
    }

    const onFinish = async (values) => {
        if (model === undefined) {
            onCreateSubmit(values)
            return setCreateModal(false)
        }
        if (model === 'profiles') {
            values.accountId = accountId
        }
        if (model === 'accounts') {
            if (!values.personalityTemplate) {
                values =  toAccountObject(values)
            } else {
                const { personalityTemplate, ...accountValues } = values
                accountValues.personality = personalityTemplate
                values = accountValues
            }
        }
        if (model === 'personalityTemplates') {
            const {
                network,
                activityLevel,
                activityHours,
                activityDays,
                interests,
                ...templateValues
            } = values
            let personality = {
                networkPriority: network,
                activityLevel,
                activityHours,
                activityDays,
                interests,
            }
            const personalityCreated = await personalityService.createPersonality(personality)
            templateValues.personality = personalityCreated.data
            values = templateValues
        }
        const selector = {
            accounts: () => createAccount(values),
            devices: () => deviceService.createDevice(values),
            users: () => authService.signUp(values),
            profiles: () => accountService.createProfile(values),
            networks: () => networkService.createNetwork(values),
            personalityTemplates: () => personalityService.createTemplate(values)
        }
        const result = await selector[model]()
        if (result?.error) {
            return notification.createError(result.error)
        }
        notification.createSuccess()
        reload()
        setCreateModal(false)
    };
    return (
        <>
            <Row>
                <Col xl={12} xs={24}>
                    <PageTitle>{title}</PageTitle>
                </Col>
                <Col xl={{ span: 2, offset: 9 }}>
                    {model !== 'orders' && <Button style={{ margin: "10px 0px" }} onClick={() => setCreateModal(true)} >Crear {spanishLabels[model] || label} </Button>}
                </Col>
            </Row>
            {createModal &&
                <FormModal
                    visible={createModal}
                    fields={forms[model] || formFields}
                    onCancel={() => setCreateModal(false)}
                    onFinish={onFinish}
                    title={`Crear ${spanishLabels[model] || label}`}
                    align="center"
                >
                    {customForm[model]}
                </FormModal>
            }
        </>
    );
}


export default ManageHeader;
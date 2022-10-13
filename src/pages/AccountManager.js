import React, { useState } from 'react';
import { Table } from 'antd'
import { deleteModal, FormModal, ManagePanel, ViewModal } from '../components/templates'
import { notification } from '../components/primitives';
import { actions, columns } from '../resources/tables';
import { forms } from '../resources/forms';
import { PersonalityForm, SelectorModal } from '../components/organisms';
import useAccount from '../hooks/useAccount'
import useToggle from '../hooks/useToggle'
import useDevice from '../hooks/useDevice'

function AccountManager(props) {

    const { accounts, account, updateAccount, personalityInterests, selectAndUpdateAccount } = useAccount()

    const { devices } = useDevice()
    const [reload, setReload] = useState(false)
    const modals = {
        changeDevice: useToggle(),
        update: useToggle(),
        personality: useToggle()
    }

    const handleActionClick = async (e, index, id) => {
        e.preventDefault()
        const selectedAccount = selectAndUpdateAccount(id)
        if (index === 'update') {
            const formatedAccountObj = toMixedForm(selectedAccount)
            selectAndUpdateAccount(account._id, formatedAccountObj)
            modals.update.toggle()
        }
        if (index === 'delete') {
            deleteModal(selectedAccount.name, 'accounts', id, () => setReload(!reload))
        }
        if (index === 'changeDevice') modals.changeDevice.toggle()

        if (index === 'viewPersonality') modals.personality.toggle()
    }
    const toMixedForm = (object) => {
        return {
            ...object,
            activityLevel: object.personality.activityLevel,
            activityHours: object.personality.activityHours,
            activityDays: object.personality.activityDays,
            networkPriority: object.personality.networkPriority._id,
            interests: object.personality.interests.map(interest => interest._id),
        }
    }
    const toAccountObject = (object) => {
        return {
            name: object.name,
            phone: object.phone,
            personality: {
                id: account.personality._id? account.personality._id : null,
                networkPriority: object.networkPriority,
                activityLevel: object.activityLevel,
                activityHours: object.activityHours,
                activityDays: object.activityDays,
                interests: object.interests,
            }
        }
    }
    const updateAccountAndPersonality = async (values) => {
        updateAccount(account._id, toAccountObject(values))
            .then(() => {
                notification.updateSuccess()
            })
            .catch(error => {
                notification.updateError(error)
            })
        modals.update.toggle()
    }

    const CustomColumns = (
        <Table.Column
            title='Personalidad'
            dataIndex='personality'
            key='personality'
            align="center"
            render={(value, record) => (
                <a onClick={e => handleActionClick(e, 'viewPersonality', record._id,)}>
                    Ver
                </a>
            )}
        />
    )
    return (
        <>
            <ManagePanel
                title='Administrar cuentas'
                model='accounts'
                tableAtributes={{
                    data: accounts,
                    columns: columns.accounts,
                    actions: actions.accounts,
                    onActionClick: handleActionClick,
                    loading: accounts.length ? false : true,
                    children: CustomColumns
                }}
            />
            <FormModal
                visible={modals.update.state}
                fields={forms.accounts}
                selected={account}
                onCancel={() => modals.update.toggle()}
                onFinish={updateAccountAndPersonality}
                title={'Actualizar cuenta'}
            >
                <PersonalityForm dataSource={{ interests: personalityInterests }} />
            </FormModal>
            <ViewModal
                visible={modals.personality.state}
                title='Personalidad'
                data={account.personality}
                columns={columns.personality}
                onCancel={modals.personality.toggle}
            />
            <SelectorModal
                title='Cambiar dispositivo'
                visible={modals.changeDevice.state}
                options={devices}
                defaultValue={account.deviceId?._id}
                placeholder='Selecciona dispositivo'
                config={{
                    label: 'imei',
                    value: '_id'
                }}
                onCancel={modals.changeDevice.toggle}
                onSubmit={value => {
                    updateAccount(account._id, { deviceId: value })
                        .then(() => {
                            notification.updateSuccess()
                            modals.changeDevice.toggle()
                        })
                        .catch(error => {
                            notification.updateError(error)
                        })
                }}
            />
        </>
    );
}

export default AccountManager;
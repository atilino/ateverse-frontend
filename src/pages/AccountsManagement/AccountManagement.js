import React, { useState } from 'react';
import { deleteModal, FormModal, ManagePanel, ViewModal } from '../../components/templates'
import { notification } from '../../components/primitives';
import { columns } from '../../resources/tables';
import { forms } from '../../resources/forms';
import { PersonalityForm, SelectorModal } from '../../components/organisms';
import useAccount from '../../hooks/useAccount'
import useToggle from '../../hooks/useToggle'
import useDevice from '../../hooks/useDevice'
import { AccountsTable } from './components';
import { Col } from 'antd';

function AccountManagement(props) {

    const {
        account,
        updateAccount,
        personalityInterests,
        selectAndUpdateAccount,
        updateAccountStatus
    } = useAccount()

    const { devices } = useDevice()
    const [reload, setReload] = useState(false)
    const modals = {
        changeDevice: useToggle(),
        update: useToggle(),
        personality: useToggle()
    }

    const toMixedForm = (object) => {
        return {
            ...object,
            activityLevel: object.personality.activityLevel,
            activityHours: object.personality.activityHours,
            activityDays: object.personality.activityDays,
            networkPriority: object.personality.networkPriority?._id,
            interests: object.personality.interests.map(interest => interest._id),
        }
    }
    const toAccountObject = (object) => {
        return {
            name: object.name,
            phone: object.phone,
            personality: {
                id: account.personality._id ? account.personality._id : null,
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

    const onStatusChange = async (id, status) => {
        updateAccountStatus(id, status)
            .then(() => {
                notification.updateSuccess()
            })
            .catch(error => {
                notification.updateError(error)
            })
    }

    return (
        <>
            <ManagePanel title='Administrar cuentas' model='accounts' >
                <Col span={24}>
                    <AccountsTable
                        onChangeDevice={id => {
                            selectAndUpdateAccount(id)
                            modals.changeDevice.toggle()
                        }}
                        onStatusChange={onStatusChange}
                        onDeleteClick={id => {
                            const selectedAccount = selectAndUpdateAccount(id)
                            deleteModal(selectedAccount.name, 'accounts', id, () => setReload(!reload))
                        }}
                        onUpdateClick={id => {
                            const selectedAccount = selectAndUpdateAccount(id)
                            const formatedAccountObj = toMixedForm(selectedAccount)
                            selectAndUpdateAccount(selectedAccount._id, formatedAccountObj)
                            modals.update.toggle()
                        }}
                        onPersonalityClick={id => {
                            selectAndUpdateAccount(id)
                            modals.personality.toggle()
                        }}
                    />
                </Col>
            </ManagePanel>

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

export default AccountManagement;

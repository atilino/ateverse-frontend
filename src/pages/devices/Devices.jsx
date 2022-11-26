import { useState } from 'react';
import { LoaderButton, TableColumn, DashboardHeader, CreateButton } from 'components'
import { deleteModal, FormModal, ManageTable, TableModal } from 'components/templates'
import { notification, SwitchButton } from 'components/primitives';
import { tables, forms, variables, ERRORS } from 'constants/devices'
import { ConnectionIndicator } from './components';

import useDevice from 'hooks/useDevice'
import { useNavigate } from 'react-router-dom';
import { ManagementMenu } from './components';

function Devices() {

    const navigate = useNavigate()
    const { devices, device, findDevice, updateDevice, createDevice } = useDevice()

    const [updateModal, setUpdateModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [deviceAccountsModal, setDeviceAccountsModal] = useState(false)

    const handleDeviceAccountClick = (id) => {
        findDevice(id)
        setDeviceAccountsModal(true)
    }

    const handleActionClick = (e, index, id) => {
        e.preventDefault()

        findDevice(id)

        if (index === 'update') {
            setUpdateModal(true)
        }
        if (index === 'delete') {
            deleteModal('este dispositivo', 'devices', id, () => { })
        }
        if (index === 'detail') {
            navigate(`${id}/detail`)
        }
    }
    const handleCreateDevice = async (values) => {
        createDevice(values)
            .then(() => {
                notification.createSuccess()
            })
        handleCloseModal()
            .catch(error => notification.createError(error))
    }
    const handleUpdateDevice = async (values) => {
        updateDevice(device._id, values)
            .then(() => {
                notification.updateSuccess()
                handleCloseModal()
            })
            .catch(error => notification.updateError(error))
    }

    const onSwitchClick = async (state, id) => {
        updateDevice(id, { switch: state })
            .then(() => {
                notification.updateSuccess()
            })
            .catch(error => {
                notification.updateError(ERRORS[error.message])
            })
    }

    const handleCloseModal = () => {
        setUpdateModal(false)
        setDeviceAccountsModal(false)
        setCreateModal(false)
    }

    return (
        <>
            <CreateButton
                title="Crear dispositivo"
                onClick={(e) => setCreateModal(true)}
            />
            <FormModal
                visible={createModal}
                fields={forms.CREATE_FIELDS}
                onCancel={handleCloseModal}
                onFinish={handleCreateDevice}
                title={`Crear dispositivo`}
                align="center"
            />
            <ManageTable
                loading={devices.length ? false : true}
                columns={tables.COLUMNS.DASHBOARD}
                dataSource={devices}
                actions={tables.ACTIONS}
                onActionClick={handleActionClick}
            >
                <TableColumn
                    title="Conexión"
                    dataIndex="connected"
                    key="connected"
                    render={(connection, record) =>
                        <ConnectionIndicator state={connection} />
                    }
                    align="center"
                />
                <TableColumn
                    title="Switch"
                    dataIndex="switch"
                    key="switch"
                    render={(state, { _id, status }) =>
                        <SwitchButton
                            checked={state}
                            loading={status === 'ON' || status === 'OFF' ? false : true}
                            onChange={(currentState) => onSwitchClick(currentState, _id)}
                        />
                    }
                    align="center"
                />
                <TableColumn
                    title="Cuentas asignadas"
                    dataIndex="accounts"
                    key="accounts"
                    render={(accounts, record) => <a onClick={() => handleDeviceAccountClick(record._id)}>{accounts.length}</a>}
                    align="center"
                    responsive={['md']}
                />
                <TableColumn
                    title="Administrar"
                    dataIndex="management"
                    key="management"
                    render={(value, record) => (
                        <ManagementMenu deviceId={record._id} />
                    )}
                    responsive={['md']}
                    align="center"
                />
            </ManageTable>
            <TableModal
                visible={deviceAccountsModal}
                columns={tables.COLUMNS.ACCOUNTS}
                data={device.accounts}
                onCancel={handleCloseModal}
            />
            <FormModal
                visible={updateModal}
                fields={forms.UPDATE_FIELDS}
                selected={device}
                onCancel={handleCloseModal}
                onFinish={handleUpdateDevice}
                title={`Actualizar dispositivo`}
            />
        </>
    );
}

export default Devices;

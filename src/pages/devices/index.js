import { useState } from 'react';
import { LoaderButton, TableColumn, DashboardHeader, CreateButton } from 'components'
import { deleteModal, FormModal, ManageTable, TableModal } from 'components/templates'
import { notification, SwitchButton } from 'components/primitives';
import { tables, forms, variables } from 'constants/devices'
import { DownloadOutlined } from '@ant-design/icons';
import { ConnectionIndicator } from 'components/indicators';

import useDevice from 'hooks/useDevice'

function Devices() {
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

    const handleUpgrade = (id) => {
        updateDevice(id, { actions: { update: true } })
            .then(() => {
                notification.success("En proceso de actualización")
            })
            .catch(error => notification.error("Error al ejecturar acción"))
    }

    const onSwitchClick = async (state, id) => {
        updateDevice(id, { switch: state })
            .then(() => {
                notification.updateSuccess()
            })
            .catch(error => notification.updateError(error))
    }

    const handleCloseModal = () => {
        setUpdateModal(false)
        setDeviceAccountsModal(false)
        setCreateModal(false)
    }

    return (
        <>
            <DashboardHeader title={variables.DASHBOARD_TITLE}>
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
            </DashboardHeader>
            <ManageTable
                loading={devices.length ? false : true}
                columns={tables.COLUMNS.DASHBOARD}
                dataSource={devices}
                actions={tables.ACTIONS}
                onActionClick={handleActionClick}
                defaultPageSize={5}
            >
                <TableColumn
                    title="Conexión"
                    dataIndex="connected"
                    key="connected"
                    render={(value, record) => 
                        <ConnectionIndicator state={value}/>
                    }
                    align="center"
                />
                <TableColumn
                    title="Switch"
                    dataIndex="accounts"
                    key="accounts"
                    render={(value, record) =>
                        <SwitchButton
                            state={record.switch}
                            loading={!record.switch && record.status.name !== "Suspendido" ? true : false}
                            onChange={(e) => onSwitchClick(e, record._id)}
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
                    title="Notificaciones"
                    dataIndex="notifications"
                    key="notifications"
                    render={(value, record) => (
                        <LoaderButton
                            description="Presione para actualizar a la nueva versión"
                            state={record.upgradeable}
                            shape="round"
                            icon={<DownloadOutlined />}
                            loading={record.actions.update && record.upgradeable ? true : false}
                            loadingDescription="En actualización"
                            onClick={() => handleUpgrade(record._id)}
                        />
                    )}
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
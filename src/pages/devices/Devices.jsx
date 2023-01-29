import { useState } from 'react';
import { TableColumn, CreateButton, FilterSearchInput, Label } from '../../components'
import { deleteModal, FormModal, ManageTable, TableModal } from 'components/templates'
import { notification, Selector, SwitchButton } from '../../components/primitives';
import { tables, forms, ERRORS, DEVICE_STATUS } from 'constants/devices'
import { useNavigate } from 'react-router-dom';
import { ManagementMenu, ConnectionIndicator, SwitchFiltersPanel } from './components';
import { Checkbox, Col, Row } from 'antd';
import { useInterval, useDevice } from '../../hooks';

function Devices() {

    const navigate = useNavigate()
    const {
        devices,
        device,
        findDevice,
        updateDevice,
        createDevice,
        listDevices,
        pagination
    } = useDevice()

    const [updateModal, setUpdateModal] = useState(false)
    const [createModal, setCreateModal] = useState(false)
    const [deviceAccountsModal, setDeviceAccountsModal] = useState(false)

    useInterval(() => {
        const inProgressTask = devices?.find(d => (d.status !== 'ON' && d.status !== 'OFF'))
        if (inProgressTask !== undefined) {
            listDevices(pagination.page, pagination.limit)
        }
    }, 5)

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
            <Row justify='center' align='middle'>
                <Col span={16}>
                    <FilterSearchInput
                        onSubmit={({ filter, value }) => listDevices(pagination.page, pagination.limit, { [filter]: value })}
                        filters={[
                            { label: 'IMEI', value: 'imei' },
                        ]}
                        defaultFilter='imei'
                    />
                </Col>
            </Row>
            <Row justify='center' align='middle' style={{ marginBottom: '.5rem' }}>
                <Col span={8}>
                    <Label>Estado</Label>
                    <Selector
                        style={{ width: '80%' }}
                        data={[{ label: 'Todos', name: 'all' }, ...Object.entries(DEVICE_STATUS).map(([key, value]) => ({ label: value, name: key }))]}
                        defaultValue='all'
                        onChange={status => {
                            if (status === 'all') {
                                return listDevices(pagination.page, pagination.limit)
                            }
                            listDevices(pagination.page, pagination.limit, { status })
                        }}
                    />
                </Col>
                <SwitchFiltersPanel
                    onChange={filters => {
                        listDevices(pagination.page, pagination.limit, filters)
                    }}
                    onEnabledChange={isEnabled => {
                        if (isEnabled) {
                            return listDevices(pagination.page, pagination.limit, { switch: false, connected: false })
                        }
                        listDevices(pagination.page, pagination.limit)
                    }}
                />
            </Row>
            <CreateButton
                title="Crear dispositivo"
                onClick={(e) => setCreateModal(true)}
                style={{ margin: '1rem 0' }}
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
                loading={devices?.length ? false : true}
                columns={tables.COLUMNS.DASHBOARD}
                dataSource={devices}
                actions={tables.ACTIONS}
                onActionClick={handleActionClick}
                pagination={{
                    current: pagination.page,
                    pageSize: pagination.limit,
                    pageSizeOptions: [5, 10, 20],
                    showSizeChanger: true,
                    total: pagination.totalResults,
                    showTotal: (total, [from, to]) => `${from} a ${to} de ${total} dispositivos encontrados`,
                    onChange: page => page !== pagination.page && listDevices(page, pagination.limit),
                    onShowSizeChange: (current, limit) => listDevices(current, limit),
                }}
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

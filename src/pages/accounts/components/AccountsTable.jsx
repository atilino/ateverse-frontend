'use strict'
import { Selector } from 'components/primitives'
import { searchProps, TableColumn } from 'components/Table'
import { ManageTable } from 'components/templates'
import React from 'react'
import { Link } from 'react-router-dom'
import { constants } from 'utilities/index'
import { useAccount, useAuth, useResponsiveBreakpoints } from '../../../hooks'

const ACTIONS = [
	{
		title: 'Actualizar',
		dataIndex: 'update',
		key: 'update',
	},
	{
		title: 'Eliminar',
		dataIndex: 'delete',
		key: 'delete',
	},
	{
		title: 'Ver mensajes',
		dataIndex: 'getMessages',
		key: 'getMessages',
	},
	{
		title: 'Cambiar dispositivo',
		dataIndex: 'changeDevice',
		key: 'changeDevice',
	},
]

/** @typedef {(id: string, account: object) => void} actionCallback */
/**
 *
 * @param {object} props
 * @param {Array<import('src/models/account.model').Account>} props.accounts
 * @param {actionCallback} props.onPersonalityClick
 * @param {actionCallback} props.onDeleteClick
 * @param {actionCallback} props.onUpdateClick
 * @param {actionCallback} props.onChangeDevice
 * @param {actionCallback} props.onGetMessages
 * @param {(id: string, status: string) => void} props.onStatusChange
 */
function AccountsTable({
	onPersonalityClick,
	onDeleteClick,
	onUpdateClick,
	onChangeDevice,
	onStatusChange,
	onGetMessages,
}) {
	const { xs } = useResponsiveBreakpoints()
	const { isAdmin } = useAuth()
	const { accounts, pagination, getAccounts } = useAccount({ service: 'accounts' }, { limit: xs ? 10 : 5 })

	const COLUMNS = [
		{
			title: 'Dispositivo asignado',
			dataIndex: 'deviceId',
			key: 'deviceId',
			render: deviceId => (deviceId ? deviceId.imei : 'No asignado'),
			responsive: ['md'],
			...searchProps({
				index: 'imei',
				onSearch: value => getAccounts(pagination.page, pagination.limit, { imei: value }),
				onReset: () => getAccounts(pagination.page, pagination.limit),
			}),
		},
		{
			title: 'Nombre',
			dataIndex: 'name',
			key: 'name',
			...searchProps({
				index: 'nombre',
				onSearch: value => getAccounts(pagination.page, pagination.limit, { name: value }),
				onReset: () => getAccounts(pagination.page, pagination.limit),
			}),
		},
		{
			title: 'Teléfono',
			dataIndex: 'phone',
			key: 'phone',
			responsive: ['md'],
			...searchProps({
				index: 'telefono',
				onSearch: value => getAccounts(pagination.page, pagination.limit, { phone: value }),
				onReset: () => getAccounts(pagination.page, pagination.limit),
			}),
		},
		{
			title: 'Perfiles',
			dataIndex: 'profiles',
			key: 'profiles',
			align: 'center',
			render: (profiles, record) => <Link to={`../${record._id}/profiles`}>{profiles && profiles.length}</Link>,
		},
	]

	const actions = {
		update: onUpdateClick,
		delete: onDeleteClick,
		changeDevice: onChangeDevice,
		getMessages: onGetMessages,
	}
	const handleAction = (e, action, id, account) => {
		e.preventDefault()
		return actions[action](id, account)
	}

	return (
		<ManageTable
			columns={COLUMNS}
			actions={ACTIONS}
			dataSource={accounts}
			onActionClick={handleAction}
			pagination={{
				current: pagination.page,
				pageSize: pagination.limit,
				pageSizeOptions: [5, 10, 20],
				showSizeChanger: true,
				total: pagination.totalResults,
				showTotal: (total, [from, to]) => `${from} a ${to} de ${total} ${xs ? '' : 'cuentas encontradas'}`,
				onChange: page => page !== pagination.page && getAccounts(page, pagination.limit),
				onShowSizeChange: (current, limit) => getAccounts(current, limit),
			}}
			actionResponsive={['md']}
		>
			<TableColumn
				title="Personalidad"
				dataIndex="personality"
				key="personality"
				align="center"
				render={(value, record) => (
					<a
						onClick={e => {
							e.preventDefault()
							return onPersonalityClick(record._id, record)
						}}
					>
						Ver
					</a>
				)}
				responsive={['md']}
			/>
			<TableColumn
				title="Estado"
				dataIndex="status"
				key="status"
				align="center"
				render={(value, record) =>
					isAdmin ? (
						<Selector
							value={value}
							data={constants.ACCOUNT_STATUS}
							style={{ width: '9rem' }}
							onChange={status => onStatusChange(record._id, status)}
						/>
					) : (
						constants.ACCOUNT_STATUS.find(({ name }) => name === value).label
					)
				}
			/>
		</ManageTable>
	)
}

export default AccountsTable

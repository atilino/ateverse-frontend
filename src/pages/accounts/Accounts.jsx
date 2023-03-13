import React, { useState } from 'react'
import { deleteModal, FormModal, ManagePanel, TableModal, ViewModal } from '../../components/templates'
import { notification } from '../../components/primitives'
import { columns } from '../../resources/tables'
import { forms } from '../../resources/forms'
import { PersonalityForm, SelectorModal } from '../../components/organisms'
import useAccount from '../../hooks/useAccount'
import useToggle from '../../hooks/useToggle'
import useDevice from '../../hooks/useDevice'
import { AccountsTable } from './components'
import { Col } from 'antd'
import { date } from 'utilities'

function Accounts(props) {
	const {
		account,
		updateAccount,
		personalityInterests,
		selectAndUpdateAccount,
		updateAccountStatus,
		getMessages,
		messages,
	} = useAccount()

	const { devices } = useDevice()
	const [reload, setReload] = useState(false)
	const modals = {
		changeDevice: useToggle(),
		update: useToggle(),
		personality: useToggle(),
		messages: useToggle(),
	}

	const toMixedForm = object => {
		return {
			...object,
			activityLevel: object.personality.activityLevel,
			activityHours: object.personality.activityHours,
			activityDays: object.personality.activityDays,
			networkPriority: object.personality.networkPriority?._id,
			interests: object.personality.interests.map(interest => interest._id),
		}
	}
	const toAccountObject = object => {
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
			},
			mobilePort: object.mobilePort
		}
	}
	const updateAccountAndPersonality = async values => {
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
			<ManagePanel model="accounts">
				<Col span={24}>
					<AccountsTable
						onChangeDevice={(id, account) => {
							selectAndUpdateAccount(account)
							modals.changeDevice.toggle()
						}}
						onStatusChange={onStatusChange}
						onDeleteClick={(id, account) => {
							selectAndUpdateAccount(account)
							deleteModal(account.name, 'accounts', id, () => setReload(!reload))
						}}
						onUpdateClick={(id, account) => {
							const formatedAccountObj = toMixedForm(account)
							selectAndUpdateAccount(formatedAccountObj)
							modals.update.toggle()
						}}
						onPersonalityClick={(id, account) => {
							selectAndUpdateAccount(account)
							modals.personality.toggle()
						}}
						onGetMessages={(id, account) => {
							selectAndUpdateAccount(account)
							getMessages(id)
							modals.messages.toggle()
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
				title="Personalidad"
				data={account.personality}
				columns={columns.personality}
				onCancel={modals.personality.toggle}
			/>
			<SelectorModal
				title="Cambiar dispositivo"
				visible={modals.changeDevice.state}
				options={devices}
				defaultValue={account.deviceId?._id}
				placeholder="Selecciona dispositivo"
				config={{
					label: 'imei',
					value: '_id',
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
			<TableModal
        width='75%'
        visible={modals.messages.state}
        onCancel={modals.messages.toggle}
				data={messages}
				columns={[
					{
						title: 'Mensaje',
						dataIndex: 'message',
						key: 'message',
					},
					{
						dataIndex: 'createdAt',
						key: 'createdAt',
						render: createdDateString => date.formatDDMMYYYYHHMM(createdDateString),
					},
				]}
			/>
		</>
	)
}

export default Accounts

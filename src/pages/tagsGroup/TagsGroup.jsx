import { Col, Layout } from 'antd'
import React, { useState } from 'react'
import { AppHeader, deleteModal, notification } from '../../components'
import { FormModal, ManageTable } from '../../components/templates'
import { useTag } from '../../hooks'
import { ManageHeader } from '../../components/organisms'
import { useParams } from 'react-router-dom'

function TagsGroup(props) {
	const { categoryId } = useParams()
	const { tags, createTagGroup, updateTagGroup, deleteTagGroup, tag, findTag } = useTag('tagsGroup', { categoryId })
	const [updateModal, setUpdateModal] = useState(false)

	const formFields = [
		{
			label: 'Nombre',
			name: 'name',
			key: 'name',
			type: 'text',
			rules: [
				{
					required: true,
					message: 'El nombre es requerido',
				},
			],
		},
	]

	const handleActionClick = (e, action, id, tag) => {
		e.preventDefault()
		findTag(id)
		if (action === 'update') setUpdateModal(true)
		if (action === 'delete')
			deleteModal({
				message: `Estas a punto de eliminar esta etiqueta ${tag.name}`,
				onOk: () => deleteTagGroup(tag._id),
			})
	}
	const handleUpdate = async values => {
		updateTagGroup(tag._id, values)
			.then(() => {
				notification.updateSuccess()
				setUpdateModal(false)
			})
			.catch(error => notification.updateError(error))
	}

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
	]

	return (
		<>
			<ManageHeader
				label="Etiqueta"
				onCreateSubmit={values => {
					createTagGroup({ ...values, categoryId: categoryId })
						.then(() => notification.createSuccess())
						.catch(error => notification.createError(error))
				}}
				formFields={formFields}
			/>
			<Col span={24}>
				<ManageTable
					columns={[
						{
							title: 'Nombre',
							dataIndex: 'name',
							key: 'name',
						},
					]}
					dataSource={tags}
					actions={ACTIONS}
					onActionClick={handleActionClick}
				/>
			</Col>
			<FormModal
				visible={updateModal}
				fields={formFields}
				selected={tag}
				onCancel={() => setUpdateModal(false)}
				onFinish={handleUpdate}
				title={`Actualizar etiqueta`}
			/>
		</>
	)
}

export default TagsGroup

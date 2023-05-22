import { Col, Layout } from 'antd'
import React, { useState } from 'react'
import { AppHeader, deleteModal, notification, TableColumn } from '../../components'
import { FormModal, ManageTable } from '../../components/templates'
import { useTag } from '../../hooks'
import { ManageHeader } from '../../components/organisms'
import { Indicator } from 'components/index'
import { CheckOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

function TagCategories(props) {
	const { categories, createCategory, updateCategory, deleteCategory, findCategory, category } = useTag()
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
		{
			label: 'Seleccion multiple',
			name: 'multiSelect',
			key: 'multiSelect',
			type: 'checkbox',
			valuePropName: 'checked',
		},
	]

	const handleActionClick = (e, action, id, category) => {
		e.preventDefault()
		findCategory(id)
		if (action === 'update') setUpdateModal(true)
		if (action === 'delete')
			deleteModal({
				message: `Estas a punto de eliminar la categoria ${category.name}`,
				onOk: () => deleteCategory(category._id),
			})
	}
	const handleUpdate = async values => {
		updateCategory(category._id, values)
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
				label="categoría"
				onCreateSubmit={values => {
					createCategory(values)
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
					dataSource={categories}
					actions={ACTIONS}
					onActionClick={handleActionClick}
				>
					<TableColumn
						title="Selección multiple"
						dataIndex="multiSelect"
						key="multiSelect"
						render={(multiSelect, record) => (
							<Indicator state={multiSelect}>
								<CheckOutlined size={42} />
							</Indicator>
						)}
						align="flex-start"
						responsive={['md']}
					/>
					<TableColumn title="Tags" render={(_, record) => <Link to={`../${record._id}`}>Ver</Link>} />
				</ManageTable>
			</Col>
			<FormModal
				visible={updateModal}
				fields={formFields}
				selected={category}
				onCancel={() => setUpdateModal(false)}
				onFinish={handleUpdate}
				title={`Actualizar categoria`}
			/>
		</>
	)
}

export default TagCategories

import { Col, Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { AppHeader, deleteModal, notification } from '../../components';
import { FormModal, ManageTable } from '../../components/templates';
import { useProfiles, useTag } from '../../hooks';
import { ManageHeader } from '../../components/organisms';
import { DebounceSelect } from '../../components'

function Customers(props) {

  const { groups, group, findGroup, updateGroup } = useProfiles({ type: 'groups', network: 'facebook' })
  const { listTagsGroup } = useTag()

  const fetchTags = async value => {
    const tags = await listTagsGroup({ name: value })
    return tags.map(tag => ({ ...tag, label: tag.name, value: tag._id }))
  }

  function validateItems(array) {
		const categories = {}
		const isDuplicate = item => {
			const { name, multiSelect } = item.categoryId
			if (categories[name] && !categories[name].multiSelect) {
				return true
			}
			categories[name] = { multiSelect }
			return false
		}
		return !array.flatMap(isDuplicate).some(duplicate => duplicate)
	}

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
      ]
    },
    {
      label: 'Enlace',
      name: 'url',
      key: 'url',
      type: 'text',
      rules: [
        {
          required: true,
          message: 'El enlace es requerido',
        },
      ]
    },
    {
			label: 'Tags',
			name: 'tags',
			key: 'tags',
			render: (
				<DebounceSelect
					mode="multiple"
					placeholder="Seleccionar etiquetas"
					style={{ width: '100%' }}
					fetchOptions={fetchTags}
				/>
			),
			rules: [
				{
					async validator(_, newCurrentTags) {
						const allTags = await listTagsGroup()
						newCurrentTags = allTags.filter(tag => newCurrentTags.find(newTag => tag._id === newTag.value))
						if (!validateItems(newCurrentTags)) {
							return Promise.reject(new Error('No se puede agregar más de una etiqueta de la misma categoría'))
						}
						return Promise.resolve()
					},
				},
			],
		},
  ]

  const handleActionClick = (e, action, id, group) => {
    e.preventDefault()
    findGroup(id)
    if (action === 'update') setUpdateModal(true)
  }

  const handleUpdate = async (values) => {
    updateGroup(group._id, values)
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
    // {
    //   title: 'Perfiles',
    //   dataIndex: 'update',
    //   key: 'profiles',
    // },
  ]

  return (
    <Layout>
      <AppHeader title='Grupos de Facebook' />
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <Col span={24}>
          <ManageTable
            columns={[
              {
                title: 'Nombre',
                dataIndex: 'name',
                key: 'name'
              }
            ]}
            dataSource={groups}
            actions={ACTIONS}
            onActionClick={handleActionClick}
          />
        </Col>
        <FormModal
          visible={updateModal}
          fields={formFields}
          selected={group}
          onCancel={() => setUpdateModal(false)}
          onFinish={handleUpdate}
          title={`Actualizar grupo`}
        />
      </Layout.Content>
    </Layout>
  );
}

export default Customers

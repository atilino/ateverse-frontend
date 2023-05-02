import { Col, Layout } from 'antd';
import React, { useState } from 'react';
import { AppHeader, deleteModal, notification, TableColumn } from '../../components';
import { FormModal, ManageTable } from '../../components/templates';
import { useCustomer, useTag } from '../../hooks';
import { ManageHeader } from '../../components/organisms';
import { Indicator } from 'components/index'
import { CheckOutlined } from '@ant-design/icons';

function Tags(props) {

  const { customers, customer, updateCustomer, findCustomer, createCustomer, deleteCustomer } = useCustomer();
  const { categories } = useTag();
  const [updateModal, setUpdateModal] = useState(false);

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
    }
  ]

  const handleActionClick = (e, action, id, customer) => {
    e.preventDefault()
    findCustomer(id)
    if (action === 'update') setUpdateModal(true)
    if (action === 'delete') deleteModal({
      message: `Estas a punto de eliminar a ${customer.name}`,
      onOk: () => deleteCustomer(customer._id)
    })
  }
  const handleUpdate = async (values) => {
    updateCustomer(customer._id, values)
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
      title: 'Etiquetas',
      dataIndex: 'addTag',
      key: 'addTag',
    },
    {
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
    },
  ]

  return (
    <Layout>
      <AppHeader title='Etiquetas' />
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <ManageHeader
          label='categoría'
          onCreateSubmit={(values) => {
            createCustomer(values)
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
                key: 'name'
              },
            ]}
            dataSource={categories}
            actions={ACTIONS}
            onActionClick={handleActionClick}
          >
            <TableColumn
              title="Selección única"
              dataIndex="multiSelect"
              key="multiSelect"
              render={(multiSelect, record) =>
                <Indicator state={!multiSelect}>
                  <CheckOutlined size={42} />
                </Indicator>
              }
              align="flex-start"
              responsive={['md']}
                />
          </ManageTable>
        </Col>
        <FormModal
          visible={updateModal}
          fields={formFields}
          selected={customer}
          onCancel={() => setUpdateModal(false)}
          onFinish={handleUpdate}
          title={`Actualizar etiqueta`}
        />
      </Layout.Content>
    </Layout>
  );
}

export default Tags

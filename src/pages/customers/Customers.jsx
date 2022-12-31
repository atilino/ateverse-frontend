import { Col, Layout } from 'antd';
import React, { useState } from 'react';
import { AppHeader, deleteModal, notification } from '../../components';
import { FormModal, ManageTable } from '../../components/templates';
import { useCustomer } from '../../hooks';
import { ManageHeader } from '../../components/organisms';

function Customers(props) {
  const {
    customers,
    customer,
    updateCustomer,
    findCustomer,
    createCustomer,
    deleteCustomer
  } = useCustomer()

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
      title: 'Eliminar',
      dataIndex: 'delete',
      key: 'delete',
    },
  ]

  return (
    <Layout>
      <AppHeader title='Clientes' />
      <Layout.Content
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
        }}
      >
        <ManageHeader
          label='cliente'
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
              }
            ]}
            dataSource={customers}
            actions={ACTIONS}
            onActionClick={handleActionClick}
          />
        </Col>
        <FormModal
          visible={updateModal}
          fields={formFields}
          selected={customer}
          onCancel={() => setUpdateModal(false)}
          onFinish={handleUpdate}
          title={`Actualizar cliente`}
        />
      </Layout.Content>
    </Layout>
  );
}

export default Customers

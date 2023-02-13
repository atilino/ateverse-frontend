import React, { useState } from 'react';
import { FormModal, ManageTable } from '../../components/templates'
import { constants, date } from '../../utilities';
import { DeliveryDateIndicator, StatusIndicator, Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';
import { Badge, Col, Row, Tooltip } from 'antd';
import { CircularBorder, notification, TableColumn } from '../../components';
import { Link, } from 'react-router-dom';
import { ProfileOutlined } from '@ant-design/icons';
import { useCustomer, useInterval, useOrder, useResponsiveBreakpoints } from '../../hooks';
import { FilterOrdersInput } from './components';


function Orders() {

  const { order, orders, listOrders, pagination, updateOrder, updateLocalOrder } = useOrder('orders', { initialPagination: true })
  const { customers } = useCustomer()
  const [updateModal, setUpdateModal] = useState(false)
  const formFields = [
    {
      label: 'Cliente',
      name: 'customer',
      type: 'select',
      options: customers.map(customer => ({ value: customer._id, name: customer.name })),
      rules: [
        {
          required: true,
          message: 'El cliente es requerido',
        },
      ]
    }
  ]

  const { sm } = useResponsiveBreakpoints()
  const columns = [
    {
      title: 'Red',
      dataIndex: 'network',
      key: 'network',
      align: 'center',
      render: network => <NetworkLogo networkName={network.name} />
    },
    {
      title: 'Cliente',
      dataIndex: ['customer', 'name'],
      align: 'center'
    },
    {
      title: 'Tipo de orden',
      align: 'center',
      dataIndex: 'variant',
      key: 'variant',
      render: (variant, { network, options, status }) => (
        <>
          {options.direct && status === 'IN_PROGRESS' &&
            <Badge status="processing" color='#fc6262' />
          }
          {constants.ORDER_VARIANTS[network.name].find(v => v.id === variant).label}
        </>
      )
    },
    {
      title: 'Resumen',
      align: 'center',
      responsive: ['lg'],
      render: (text, { network, variant, options, executed }) => {
        const variantName = constants.ORDER_VARIANTS[network.name].find(v => v.id === variant).name
        return <Summary variantName={variantName} interactions={options} executed={executed} />
      }
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      responsive: ['lg'],
      render: status => <StatusIndicator status={status} />
    },
    {
      title: "Fecha de entrega",
      dataIndex: "deliveryAt",
      key: "deliveryAt",
      responsive: ['lg'],
      render: date => <DeliveryDateIndicator deliveryDate={date} />
    },
  ]

  const actions = [
    {
      title: 'Actualizar',
      dataIndex: 'update',
      key: 'update',
    }
  ]

  useInterval(() => {
    const inProgressOrder = orders?.find(o => (o.status === 'CREATED' || o.status === 'IN_PROGRESS') && new Date(o.createdAt) > date.offset(new Date(), -date.DAY))
    if (inProgressOrder !== undefined) {
      listOrders(pagination.page, pagination.limit)
    }
  }, 5)

  const handleActionClick = (e, action, id, data) => {
    setUpdateModal(true)
    updateLocalOrder(data)
  }

  return (
    <>
      <FilterOrdersInput
        onChange={values => listOrders(pagination.page, pagination.limit, values)}
      />
      <Row>
        <Col span={24}>
          <ManageTable
            dataSource={orders}
            columns={columns}
            loading={orders.length ? false : true}
            size='middle'
            actions={actions}
            onActionClick={handleActionClick}
            pagination={{
              current: pagination.page,
              pageSize: pagination.limit,
              pageSizeOptions: [5, 10, 20],
              showSizeChanger: true,
              total: pagination.totalResults,
              showTotal: (total, [from, to]) => `${from} a ${to} de ${total} ${sm ? '' : 'ordenes encontradas'}`,
              onChange: page => page !== pagination.page && listOrders(page, pagination.limit),
              onShowSizeChange: (current, limit) => listOrders(current, limit),
            }}
          >
            <TableColumn
              title='Administrar'
              align='center'
              render={(value, record) => (
                <Row align='center'>
                  <Tooltip title='Detalles'>
                    <Link to={`../${record._id}`}>
                      <CircularBorder backgroundColor='#def4fc'>
                        <ProfileOutlined style={{ fontSize: '1.2rem' }} />
                      </CircularBorder>
                    </Link>
                  </Tooltip>

                </Row>
              )}
            />
          </ManageTable>
        </Col>
        <FormModal
          visible={updateModal}
          fields={formFields}
          selected={{ ...order, customer: order.customer?._id }}
          onCancel={() => setUpdateModal(false)}
          onFinish={(values) => {
            updateOrder(order._id, values)
              .then(() => {
                notification.updateSuccess()
                setUpdateModal(false)
              })
              .catch(notification.updateError)
          }}
          title={`Actualizar orden`}
        />
      </Row>
    </>
  );
}

export default Orders;

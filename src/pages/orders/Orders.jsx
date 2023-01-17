import React, { useEffect } from 'react';
import { ManageTable } from '../../components/templates'
import { constants, date, polling } from '../../utilities';
import { DeliveryDateIndicator, StatusIndicator, Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';
import { Badge, Col, Row, Tooltip } from 'antd';
import { CircularBorder, FilterSearchInput, TableColumn } from '../../components';
import { Link } from 'react-router-dom';
import { ProfileOutlined } from '@ant-design/icons';
import { useOrder } from '../../hooks';

function Orders(props) {

  const { orders, listOrders } = useOrder()

  const columns = [
    {
      title: 'Red',
      dataIndex: 'network',
      key: 'network',
      align: 'center',
      render: network => <NetworkLogo networkName={network.name} />
    },
    {
      title: 'Tipo de orden',
      align: 'center',
      dataIndex: 'variant',
      key: 'variant',
      responsive: ['lg'],
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
      render: status => <StatusIndicator status={status} />
    },
    {
      title: "Fecha de entrega",
      dataIndex: "deliveryAt",
      key: "deliveryAt",
      render: date => <DeliveryDateIndicator deliveryDate={date} />
    },
  ]

  const ordersPolling = polling(5, listOrders)

  useEffect(() => {
    const inProgressOrder = orders?.find(o =>
      (o.status === 'CREATED' || o.status === 'IN_PROGRESS') && new Date(o.createdAt) > date.offset(new Date(), -date.DAY)
    )
    if (inProgressOrder !== undefined) {
      ordersPolling.start()
    }
  }, [orders])
  return (
    <>
      <Row justify='center'>
        <FilterSearchInput
          onSubmit={({ filter, value }) => {
            if (value.length > 0) {
              return listOrders({
                [filter]: value
              })
            }
            listOrders()
          }}
          filters={[{ label: 'Link', value: 'link' }]}
          defaultFilter='link'
        />
      </Row>
      <Row>
        <Col span={24}>
          <ManageTable
            dataSource={orders}
            columns={columns}
            loading={orders.length ? false : true}
            size='middle'
            pagination={{
              defaultPageSize: 10
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
      </Row>
    </>
  );
}

export default Orders;

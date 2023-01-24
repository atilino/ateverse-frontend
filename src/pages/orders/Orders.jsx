import React, { useEffect } from 'react';
import { ManageTable } from '../../components/templates'
import { constants, date, polling } from '../../utilities';
import { DeliveryDateIndicator, StatusIndicator, Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';
import { Badge, Col, Row, Tooltip } from 'antd';
import { CircularBorder, FilterSearchInput, Label, Selector, TableColumn } from '../../components';
import { Link, useSearchParams } from 'react-router-dom';
import { ProfileOutlined } from '@ant-design/icons';
import { useNetwork, useOrder } from '../../hooks';

function Orders(props) {

  const { orders, listOrders } = useOrder()
  const { networks } = useNetwork()
  const [search, setSearch] = useSearchParams()

  search
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
        <Col span={2} style={{ padding: '.4rem' }}>
          <Row justify='end'>
            <Label>
              Red:
            </Label>
          </Row>
        </Col>
        <Col span={4} >
          <Selector
            data={[
              {
                _id: 'all',
                label: 'Todas'
              },
              ...networks
            ]}
            config={{
              value: '_id',
              label: 'label'
            }}
            defaultValue={search.get('network') || 'all'}
            onChange={network => {

              if(network !== 'all') {
                setSearch(current => ({ ...current, network }))
                return listOrders({
                  link: search.get('link'),
                  customer: search.get('customer'),
                  network
                })
              }
              listOrders({
                link: search.get('link'),
                customer: search.get('customer'),
              })
              setSearch(current => ({ ...current }))
            }}
            style={{ width: '80%' }}
          />
        </Col>
        <Col span={12}>
          <FilterSearchInput
            onSubmit={({ filter, value }) => {
              if (value.length > 0) {
                listOrders({
                  link: search.get('link'),
                  customer: search.get('customer'),
                  network: search.get('network'),
                  [filter]: value
                })

              return search.set(filter, value)
              }
              listOrders({
                link: search.get('link'),
                customer: search.get('customer'),
                network: search.get('network'),
                [filter]: undefined
              })
              return search.delete(filter)
            }}
            onFilterChange={filter => {
              search.delete(filter)
              return listOrders({
                link: search.get('link'),
                customer: search.get('customer'),
                network: search.get('network'),
                [filter]: undefined
              })
            }}
            filters={[
              { label: 'Link', value: 'link' },
              { label: 'Cliente', value: 'customer' }
            ]}
            defaultFilter='link'
          />
        </Col>
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

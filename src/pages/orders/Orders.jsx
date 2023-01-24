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

  const onNetworkChange = (network) => {
    if (network !== 'all') {
      search.set('network', network)
      listOrders({
        link: search.get('link'),
        customer: search.get('customer'),
        variant: search.get('variant'),
        network
      })
    }else {
      listOrders({
        link: search.get('link'),
        customer: search.get('customer'),
        link: search.get('variant'),
      })
      search.delete('network')
    }
    setSearch(search)
  }

  const onVariantChange = (variant) => {
    if (variant === 'all') {
      listOrders({
        link: search.get('link'),
        customer: search.get('customer'),
        network: search.get('network')
      })
      search.delete('variant')
    }else {
      search.set('variant', variant)
      listOrders({
        link: search.get('link'),
        customer: search.get('customer'),
        network: search.get('network'),
        variant: Number(variant - 1)
      })
    }
    setSearch(search)
  }

  const variantsData = () => {
    const allField = {
      name: 'all',
      label: 'Todas'
    }
    if (search.get('network') && networks.length) {
      const networkName = networks.find(network => network._id === search.get('network'))?.name
      return [allField, ...constants.ORDER_VARIANTS[networkName].map(({ id, label }) => ({ value: id, label }))]
    }
    return [allField]
  }
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
            onChange={onNetworkChange}
            style={{ width: '80%' }}
          />
        </Col>
        <Col span={2} style={{ padding: '.4rem' }}>
          <Row justify='end'>
            <Label>
              Tipo:
            </Label>
          </Row>
        </Col>
        <Col span={4} >
          <Selector
            data={variantsData()}
            defaultValue={search.get('variant') || 'all'}
            onChange={onVariantChange}
            style={{ width: '80%' }}
          />
        </Col>
        <Col span={10}>
          <FilterSearchInput
            onSubmit={({ filter, value }) => {
              if (value.length > 0) {
                listOrders({
                  link: search.get('link'),
                  customer: search.get('customer'),
                  network: search.get('network'),
                  variant: Number(search.get('variant')) - 1,
                  [filter]: value
                })
                search.set(filter, value)
              }else {
                listOrders({
                  link: search.get('link'),
                  customer: search.get('customer'),
                  network: search.get('network'),
                  variant: Number(search.get('variant')) - 1
                })
                search.delete(filter)
              }
              setSearch(search)
            }}
            onFilterChange={filter => {
              search.delete(filter)
              setSearch(search)
              return listOrders({
                link: search.get('link'),
                customer: search.get('customer'),
                network: search.get('network'),
                variant: Number(search.get('variant')) - 1,
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

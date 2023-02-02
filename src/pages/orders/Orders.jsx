import React from 'react';
import { ManageTable } from '../../components/templates'
import { constants, date } from '../../utilities';
import { DeliveryDateIndicator, StatusIndicator, Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';
import { Badge, Col, Row, Tooltip } from 'antd';
import { CircularBorder, FilterSearchInput, Label, Selector, TableColumn } from '../../components';
import { Link, useSearchParams } from 'react-router-dom';
import { ProfileOutlined } from '@ant-design/icons';
import { useInterval, useNetwork, useOrder, useResponsiveBreakpoints } from '../../hooks';

function Orders(props) {

  const { orders, listOrders, pagination } = useOrder('orders', { initialPagination: true })
  const { networks } = useNetwork()
  const [search, setSearch] = useSearchParams()
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

  useInterval(() => {
    const inProgressOrder = orders?.find(o => (o.status === 'CREATED' || o.status === 'IN_PROGRESS') && new Date(o.createdAt) > date.offset(new Date(), -date.DAY))
    if (inProgressOrder !== undefined) {
      listOrders(pagination.page, pagination.limit)
    }
  }, 5)

  const onNetworkChange = (network) => {
    search.set('network', network)
    listOrders(pagination.page, pagination.limit, { network: network === 'all' ? undefined : network })
    network === 'all' && search.delete('network')
    setSearch(search)
  }

  const onVariantChange = (variant) => {
    variant !== 'all' && search.set('variant', variant)
    variant === 'all' && search.delete('variant')
    listOrders(pagination.page, pagination.limit, { variant: variant === 'all' ? undefined : Number(variant - 1) })
    setSearch(search)
  }

  const variantsData = () => {
    const allField = {
      name: 'all',
      label: 'Todos'
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
        <Col span={16} md={16} xs={24}>
          <FilterSearchInput
            onSubmit={({ filter, value }) => listOrders(pagination.page, pagination.limit, { [filter]: value.length > 0 ? value : undefined })}
            filters={[
              { label: 'Link', value: 'link' },
              { label: 'Cliente', value: 'customer' }
            ]}
            defaultFilter='link'
          />
        </Col>
      </Row>
      <Row justify='center' align='middle' style={{ marginBottom: '1.5rem' }} wrap={true}>
        <Col md={{ pull: 1 }} xs={{ pull: 0 }} style={{ marginBottom: '.5rem' }}>
          <Label>
            Red:
          </Label>
        </Col>
        <Col md={{ span: 4, pull: 1}} xs={{ span: 18, pull: 0 }} style={{ marginBottom: '.5rem' }} >
          <Selector
            data={[{ _id: 'all', label: 'Todas' }, ...networks]}
            config={{ value: '_id', label: 'label' }}
            defaultValue={search.get('network') || 'all'}
            onChange={onNetworkChange}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={{ push: 0 }} md={{ push: 1 }}  style={{ marginBottom: '.5rem' }}>
          <Label>
            Tipo:
          </Label>
        </Col>
        <Col md={{ span: 4, push: 1}} xs={{ span: 18, push: 0 }}  style={{ marginBottom: '.5rem' }}>
          <Selector
            data={variantsData()}
            defaultValue={search.get('variant') || 'all'}
            onChange={onVariantChange}
            style={{ width: '100%' }}
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
      </Row>
    </>
  );
}

export default Orders;

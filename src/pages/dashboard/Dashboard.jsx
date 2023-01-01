import { Col, DatePicker, Row, Typography } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { PageLayout, Selector, SingleValueCard } from '../../components';
import { useCustomer, useField, useMetrics, useNetwork } from '../../hooks';

function Dashboard(props) {
  const { metrics, getMetrics, downloadMetrics } = useMetrics()
  const { networks } = useNetwork()
  const { customers } = useCustomer()
  const networkSelector = useField({ defaultValue: null })
  const customerSelector = useField({ defaultValue: null })
  const datePicker = useField({ defaultValue: null })


  const metricMap = {
    'reactions': 'Reaccciones',
    'comments': 'Comentarios',
    'shares': 'Compartidos',
    'followers': 'Seguidos',
    'groups': 'Compartido en grupos',
    'reports': 'Reportes'
  }

  useEffect(() => {
    getMetrics({
      network: networkSelector.value,
      customer: customerSelector.value
    })
  }, [networkSelector.value, customerSelector.value, datePicker.value])

  return (
    <PageLayout title='Dashboard'>
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>Métricas</Typography.Title>
        </Col>
        <Col span={3}>
          <Selector
            data={[{ label: 'Todas', name: null }, ...networks]}
            onChange={networkSelector.onChange}
            config={{ value: 'name', label: 'label' }}
            defaultValue={null}
          />
        </Col>
        <Col span={3}>
          <Selector
            data={[{ name: 'Todos' }, ...customers]}
            onChange={customerSelector.onChange}
            config={{ value: 'name', label: 'name' }}
            defaultValue='Todos'
          />
        </Col>
        <Col span={6}>
          <DatePicker.RangePicker />
        </Col>
      </Row>
      <Row>
        <Typography.Title level={4}>
          Métricas por red
        </Typography.Title>
      </Row>
      <Row gutter={10}>
        {
          metrics.networkOrders.map(networkMetric => (
            <Col span={6}>
              <SingleValueCard title={networkMetric.label} value={networkMetric.qty} />
            </Col>
          ))
        }
      </Row>
      <Row style={{ marginTop: '1.5rem' }}>
        <Typography.Title level={4}>
          Métricas por interacción
        </Typography.Title>
      </Row>
      <Row gutter={10}>
        {
          metrics.taskOrders.map(variantMetric => (
            <Col span={6}>
              <SingleValueCard title={metricMap[variantMetric.name]} value={variantMetric.qty} />
            </Col>
          ))
        }
      </Row>
      <Row style={{ marginTop: '1.5rem' }}>
        <Typography.Title level={4}>
          Métricas por cliente
        </Typography.Title>
      </Row>
      <Row gutter={10}>
        {
          metrics.customerOrders.map(customerMetric => (
            <Col span={6}>
              <SingleValueCard title={customerMetric.name} value={customerMetric.qty} />
            </Col>
          ))
        }
      </Row>

    </PageLayout>
  );
}

export default Dashboard;
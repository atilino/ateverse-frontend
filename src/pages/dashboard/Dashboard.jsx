import { Col, Collapse, DatePicker, Row, Typography } from 'antd';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { BarChart, DoughnutChart, DownloadButton, PageLayout, Selector, SingleValueCard } from '../../components';
import { useCustomer, useField, useMetrics, useNetwork } from '../../hooks';
import { date } from '../../utilities';

function Dashboard(props) {
  const { metrics, getMetrics, downloadMetrics } = useMetrics()
  const { networks } = useNetwork()
  const { customers } = useCustomer()
  const networkSelector = useField({ defaultValue: 'Todas' })
  const customerSelector = useField({ defaultValue: 'Todos' })
  const datePicker = useField({ defaultValue: [moment().subtract(30, 'days'), moment()] })

  const chartColors = {
    facebook: '#1870E6',
    instagram: '#C43670',
    twitter: '#188CD8',
  }

  useEffect(() => {
    getMetrics({
      network: networkSelector.value === 'Todas' ? undefined : networkSelector.value,
      customer: customerSelector.value === 'Todos' ? undefined : customerSelector.value,
      from: datePicker.value[0],
      to: datePicker.value[1],
    })
  }, [networkSelector.value, customerSelector.value, datePicker.value])

  const download = async (type) => {
    const response = await downloadMetrics({
      network: networkSelector.value === 'Todas' ? undefined : networkSelector.value,
      customer: customerSelector.value === 'Todos' ? undefined : customerSelector.value,
      from: datePicker.value[0],
      to: datePicker.value[1],
      type
    })
    return window.URL.createObjectURL(new Blob([response]))
  }

  const generateReportName = () => `report-${date.formatDDMMYYYY(datePicker.value[0])}-${date.formatDDMMYYYY(datePicker.value[1])}`

  return (
    <PageLayout title='Dashboard'>
      <Row align='middle'>
        <Col span={4}>
          <Typography.Title level={3}>Métricas</Typography.Title>
        </Col>
        <Col span={4}>
          <DownloadButton filename={generateReportName()} ext='pdf' onDownload={() => download('simplified')}>
            Reporte basico
          </DownloadButton>
        </Col>
        <Col span={4}>
          <DownloadButton filename={generateReportName()} ext='pdf' onDownload={() => download('detailed')}>
            Reporte detallado
          </DownloadButton>
        </Col>
        <Col span={3}>
          <Typography.Text> Red </Typography.Text>
          <Selector
            data={[{ label: 'Todas', name: 'Todas' }, ...networks]}
            onChange={networkSelector.onChange}
            config={{ value: 'name', label: 'label' }}
            defaultValue={networkSelector.value}
          />
        </Col>
        <Col span={3}>
          <Typography.Text> Cliente </Typography.Text>
          <Selector
            data={[{ name: 'Todos' }, ...customers]}
            onChange={customerSelector.onChange}
            config={{ value: 'name', label: 'name' }}
            defaultValue={customerSelector.value}
          />
        </Col>
        <Col span={6}>
          <DatePicker.RangePicker
            onChange={datePicker.onChange}
            defaultValue={datePicker.value}
          />
        </Col>
      </Row>
      <Row gutter={[10, 10]} style={{ marginTop: '1.5rem' }}>
        <Col span={6}>
          <BarChart
            labels={[]}
            datasets={[{
              data: metrics.networkOrders.map(networkMetric => ({ x: networkMetric.label, y: networkMetric.qty })),
              backgroundColor: metrics.networkOrders.map(networkMetric => chartColors[networkMetric?.name])
            }]}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
            height='250px'
            width='100%'
          />
        </Col>
        <Col span={12}>
          <DoughnutChart
            labels={metrics.taskOrders.map(variantMetric => variantMetric.label)}
            datasets={[{
              data: metrics.taskOrders.map(variantMetric => variantMetric.qty),
              backgroundColor: ['#3BB371', '#FB3640', '#188CD8', '#E65F5C', '#E89005', '#D84A05', '#C43670', '#1D3461']
            }]}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    boxWidth: 15,
                  }
                }
              }
            }}
            height='250px'
            width='100%'
          />
        </Col>
        <Col span={6}>
          <BarChart
            labels={[]}
            datasets={[{
              data: metrics.customerOrders.map(customerMetric => ({ x: customerMetric.name, y: customerMetric.qty })),
              backgroundColor: '#188CD8'
            }]}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false
                }
              }
            }}
            height='250px'
            width='100%'
          />
        </Col>
      </Row>
      <Row style={{ marginTop: '1.5rem' }}>
        <Typography.Title level={5}>Ordenes por red</Typography.Title>
      </Row>
      <Row gutter={[10, 10]}>
        {
          metrics.networkOrders.map(networkMetric => (
            networkSelector.value === 'Todas' ?
              <Col span={6} key={networkMetric.name}>
                <SingleValueCard title={networkMetric.label} value={networkMetric.qty} />
              </Col>
              :
              networkSelector.value === networkMetric.name &&
              <Col span={6} key={networkMetric.name}>
                <SingleValueCard title={networkMetric.label} value={networkMetric.qty} />
              </Col>
          ))
        }
      </Row>
      <Row style={{ marginTop: '1.5rem' }}>
        <Typography.Title level={5}>Interacciones</Typography.Title>
      </Row>
      <Row gutter={[10, 10]}>
        {
          metrics.taskOrders.map(variantMetric => (
            <Col span={6} key={variantMetric.name}>
              <SingleValueCard title={variantMetric.label} value={variantMetric.qty} />
            </Col>
          ))
        }
      </Row>
      <Row style={{ marginTop: '1.5rem' }}>
        <Typography.Title level={5}>Ordenes por cliente</Typography.Title>
      </Row>
      <Row gutter={[10, 10]}>
        {
          metrics.customerOrders.map(customerMetric => (
            <Col span={6} key={customerMetric.name}>
              <SingleValueCard title={customerMetric.name} value={customerMetric.qty} />
            </Col>
          ))
        }
      </Row>
    </PageLayout>
  );
}

export default Dashboard;
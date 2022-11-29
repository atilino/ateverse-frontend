import { Descriptions, Row, Table } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrder, useResponsiveBreakpoints } from '../../hooks';
import { DeliveryDateIndicator, NetworkLogo, StatusIndicator } from './components/indicators';
import { CheckCircleFilled } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { word, constants } from '../../utilities';
import { love, care, haha, like, angry, wow, sad } from '../../assets/img/icons'
const reactionIcons = [love, care, haha, wow, sad, angry]

const { Item } = Descriptions

function OrderDetail() {
  const { orderId } = useParams()
  const { order } = useOrder('order', { orderId })
  const { sm } = useResponsiveBreakpoints()

  const SUMMARY_COLUMNS = [
    {
      title: 'Cuenta',
      render: (text, record) => record.accountId.name
    },
    {
      title: 'Reacción',
      align: 'center',
      render: (text, record) => <Check state={record?.executed.reaction} />
    },
    {
      title: 'Comentario',
      render: (text, record) => record.executed?.comment
    },
    {
      title: 'Compartido',
      render: (text, record) => <Check state={record?.executed.share} />
    },
    {
      title: 'Evidencia',
      dataIndex: '',
      key: ''
    }
  ]

  const Check = ({ state }) => state ? <CheckCircleFilled style={{ color: '#3BB371', fontSize: '24px' }} /> : null

  return (
    <>
      <Title level={4}>General</Title>
      <Descriptions
        column={sm ? 1 : 2}
        bordered
        contentStyle={{ backgroundColor: 'white' }}
        style={{ marginBottom: '1.5rem' }}
      >
        <Item label='Red social' contentStyle={{ textAlign: 'center' }}>
          <NetworkLogo networkName={order?.network.name} label={true} />
        </Item>
        <Item label='Link'>
          <a target='_blank'>{word.dotBreak(order?.options.link)}</a>
        </Item>
        <Item label='Creado por'>
          {order.userId?.username}
        </Item>
        <Item label='Fecha de creación'>
          <DeliveryDateIndicator deliveryDate={order.createdAt} />
        </Item>
        <Item label='Feacha de entrega'>
          <DeliveryDateIndicator deliveryDate={order.deliveryAt} />
        </Item>
        <Item label='Estado'>
          <StatusIndicator status={order.status} />
        </Item>
      </Descriptions>

      <Title level={4}>Resumen de interacción</Title>
      <Descriptions
        column={sm ? 1 : 2}
        bordered
        style={{ marginBottom: '1.5rem' }}
        contentStyle={{ backgroundColor: 'white' }}
      >
        <Item label='Variante'>
          {constants.getOrderVariant(order.network.name || 'facebook', order.network.variant || 0)}
        </Item>
        {order.variant === 0 &&
          <>
            <Item label='Reacciones'>
              <Row justify='space-around' align='middle'>
                {order.options.reactions}/{order.executed.reactions}
              </Row>
            </Item>
            <Item label='Comentarios'>
              <Row justify='center' align='middle'>
                <img src={reactionIcons[order.options.reactionType]} style={{ maxWidth: '2rem', margin: '0 -1rem' }} />
                <span style={{ margin: '0 1.5rem' }}>
                  {order.options.reactions}/{order.executed.reactions}
                </span>
              </Row>
            </Item>
            <Item label='Compartidos'>
              <Row justify='center' align='middle'>
                {order.options.reactions}/{order.executed.reactions}
              </Row>
            </Item>
            <Item label='Reacciones'>
              <Row justify='center' align='middle'>
                {order.options.reactions}/{order.executed.reactions}
              </Row>
            </Item>
            <Item label='Reacciones'>
              <Row justify='center' align='middle'>
                {order.options.reactions}/{order.executed.reactions}
              </Row>
            </Item>
          </>
        }
      </Descriptions>
      {!sm &&
        <>
          <Title level={4}>Interaciones</Title>
          <Table
            dataSource={order.accountsSummary}
            columns={SUMMARY_COLUMNS}
            bordered
          />
        </>
      }
    </>
  );
}
export default OrderDetail;
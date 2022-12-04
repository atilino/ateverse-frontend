import { Descriptions, List, Row, Table } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrder, useResponsiveBreakpoints } from '../../hooks';
import { DeliveryDateIndicator, NetworkLogo, StatusIndicator } from './components/indicators';
import { CheckCircleFilled } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { word, constants } from '../../utilities';
import { love, care, haha, like, angry, wow, sad } from '../../assets/img/icons'
import { EvidenceButton } from './components/buttons';
const reactionIcons = [like, love, care, haha, wow, sad, angry]

const { Item } = Descriptions

function OrderDetail() {
  const { orderId } = useParams()
  const { order } = useOrder('order', { orderId })
  const { sm } = useResponsiveBreakpoints()

  const SUMMARY_COLUMNS = [
    {
      title: 'Cuenta',
      align: 'end',
      render: (text, record) => record.accountId.name
    },
    {
      title: 'Evidencia',
      align: 'center',
      render: (text, record) => (
        <EvidenceButton
          orderId={orderId}
          accountId={record.accountId._id}
          accountName={record.accountId.name}
          enabled={record.evidence}
        />
      )
    }
  ]

  const VARIANT_COLUMNS = {
    facebook: {
      0: [
        {
          title: 'Reacción',
          align: 'center',
          render: (text, record) => <Check state={record.executed.reaction} />
        },
        {
          title: 'Comentario',
          align: 'center',
          render: (text, record) => record.executed?.comment
        },
        {
          title: 'Compartido',
          align: 'center',
          render: (text, record) => <Check state={record.executed.share} />
        },
      ],
      1: [
        {
          title: 'Grupos agregados',
          render: (text, record) => (
            <List
              dataSource={record.executed.groups.map(group => group.name)}
              size='small'
              renderItem={item => (
                <List.Item>{item}</List.Item>
              )}
            />
          )
        }
      ],
      2: [
        {
          title: 'Grupos donde se compartio',
          render: (text, record) => (
            <List
              dataSource={record.executed.groups?.map(group => group.name)}
              size='small'
              renderItem={item => (
                <List.Item>{item}</List.Item>
              )}
            />
          )
        }
      ],
      3: [
        {
          title: 'Reporte',
          align: 'center',
          render: (text, record) => <Check state={record.executed.report} />
        }
      ]
    },
    twitter: {
      0: [
        {
          title: 'Reacción',
          align: 'center',
          render: (text, record) => <Check state={record.executed.reaction} />
        },
        {
          title: 'Comentario',
          align: 'center',
          render: (text, record) => record.executed?.comment
        },
        {
          title: 'Compartido',
          align: 'center',
          render: (text, record) => <Check state={record.executed.share} />
        },
      ],
      1: [
        {
          title: 'Publicación',
          render: (text, record) => record.executed.publication
        }
      ]
    },
    instagram: {
      0: [
        {
          title: 'Reacción',
          align: 'center',
          render: (text, record) => <Check state={record.executed.reaction} />
        },
        {
          title: 'Comentario',
          align: 'center',
          render: (text, record) => record.executed?.comment
        }
      ]
    }
  }

  SUMMARY_COLUMNS.splice(1, 0, ...VARIANT_COLUMNS[order.network.name || 'facebook'][order.variant])

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
        {order.options.link !== undefined &&
          <Item label='Link'>
            <a target='_blank' href={order.options.link}>{word.dotBreak(order.options.link)}</a>
          </Item>
        }
        <Item label='Creado por'>
          {order.userId?.username}
        </Item>
        <Item label='Fecha de creación'>
          <DeliveryDateIndicator deliveryDate={order.createdAt} />
        </Item>
        <Item label='Fecha de entrega'>
          <DeliveryDateIndicator deliveryDate={order.deliveryAt} />
        </Item>
        <Item label='Estado'>
          <StatusIndicator status={order.status} />
        </Item>
      </Descriptions>

      <Title level={4}>Resumen de interacción</Title>
      <Descriptions
        column={sm ? 1 : order.network.name === 'facebook' ? 2 : 3}
        bordered
        style={{ marginBottom: '1.5rem' }}
        contentStyle={{ backgroundColor: 'white' }}
      >
        <Item label='Variante'>
          {constants.ORDER_VARIANTS[order.network.name || 'facebook']?.find(v => v.id === (order.variant)).label}
        </Item>

        {order.variant === 0 &&
          <>
            <Item label='Reacciones'>
              <Row justify='center' align='middle'>
                <img src={reactionIcons[order.options.reactionType]} style={{ maxWidth: '2rem', margin: '0 -1rem' }} />
                <span style={{ margin: '0 1.5rem' }}>
                  {order.executed.reactions}/{order.options.reactions}
                </span>
              </Row>
            </Item>
            <Item label='Comentarios'>
              <Row justify='center' align='middle'>
                {order.executed.comments.length}/{order.options.comments.length}
              </Row>
            </Item>
            {order.network.name === 'facebook' &&
              <Item label='Compartidos'>
                <Row justify='center' align='middle'>
                  {order.executed.shares}/{order.options.shares}
                </Row>
              </Item>
            }
          </>
        }
        {order.network.name === 'facebook' &&
          (order.variant === 1 || order.variant === 2) &&
          <Item label='Grupos'>
            <Row justify='center' align='middle'>
              {order.executed.groups.length}/{order.options.groups.length}
            </Row>
          </Item>
          || order.variant === 3 &&
          <Item label='Reportes'>
            <Row justify='center' align='middle'>
              {order.executed.reports}/{order.options.reports}
            </Row>
          </Item>
        }
        {order.variant === 1 && order.network.name === 'twitter' &&
          <Item label='Publicaciones'>
            <Row justify='center' align='middle'>
              {order.executed.publications.length}/{order.options.publications.length}
            </Row>
          </Item>
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
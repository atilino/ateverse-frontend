import React, { useEffect, useState } from 'react';
import { ManageTable } from '../../components/templates'
import { notification } from '../../components/primitives';
import { getData } from '../../libs/dataToTable';
import userService from '../../services/users';
import { constants } from 'utilities/index';
import { DeliveryDateIndicator, StatusIndicator, Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';
import { Col, Row, Tooltip } from 'antd';
import { CircularBorder, TableColumn } from '../../components';
import { Link } from 'react-router-dom';
import { ProfileOutlined } from '@ant-design/icons';

function Orders(props) {

    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [selected, setSelected] = useState({})

    let timerId
    useEffect(() => {
        if (Object.keys(selected).length) {
            getUserData(selected.userId)
        }
    }, [selected])

    const getUserData = async (id) => {
        const result = await userService.getUserById(id)
        if (result.error) notification.loadingError(result.error)
        else setUserData(result.data)
    }
    useEffect(async () => {
        const result = await getData('orders')
        if (result.error) return notification.loadingError(result.status)
        setData(result.data)
        timerId = setTimeout(() => setReload(!reload), 6000)

        return clearInterval(timerId)
    }, [reload])

    const handleActionClick = (e, index, id) => {
        e.preventDefault()

        const selection = data.filter(item => item._id === id)[0]
        setSelected(selection)

        setModal(true)
    }
    const columns = [
        {
            title: 'Red',
            dataIndex: 'network',
            key: 'network',
            render: network =>
                <div style={{ textAlign: 'center' }}>
                    <NetworkLogo networkName={network.name} />
                </div>
        },
        {
            title: 'Tipo de orden',
            dataIndex: 'variant',
            key: 'variant',
            responsive: ['lg'],
            render: (variant, { network }) => constants.ORDER_VARIANTS[network.name].find(v => v.id === variant).label
        },
        {
            title: 'Resumen',
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
            render: status => (
                <Row>
                    <StatusIndicator status={status} />
                    {constants.ORDER_STATUS[status]}
                </Row>
            )
        },
        {
            title: "Fecha de entrega",
            dataIndex: "deliveryAt",
            key: "deliveryAt",
            render: date => <DeliveryDateIndicator deliveryDate={date} />
        },
    ]

    return (
        <>
            <Col span={24}>
                <ManageTable
                    dataSource={data}
                    columns={columns}
                    loading={data.length ? false : true}
                    size='middle'
                    pagination={{
                        defaultPageSize: 5
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
        </>
    );
}

export default Orders;

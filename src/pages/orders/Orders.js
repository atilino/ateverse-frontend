import React, { useEffect, useState } from 'react';
import { ManagePanel } from '../../components/templates'
import { notification } from '../../components/primitives';
import { MoreModal } from '../../components/organisms';
import { getData } from '../../libs/dataToTable';
import { actions } from '../../resources/tables';
import { formatDate } from '../../libs/utils'
import userService from '../../services/users';
import { constants } from 'utilities/index';
import { Summary } from './components/indicators';
import NetworkLogo from './components/indicators/NetworkLogo';

function Orders(props) {

    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState({})
    const [userData, setUserData] = useState({})
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
            render: (variant, { network }) => constants.ORDER_VARIANTS[network.name].find(v => v.id === variant).label
        },
        {
            title: 'Resumen',
            render: (text, { network, variant, options, executed }) => {
                const variantName = constants.ORDER_VARIANTS[network.name].find(v => v.id === variant).name
                return <Summary variantName={variantName} interactions={options} executed={executed} />
            }
        },
        {
            title: "Estado",
            dataIndex: "status",
            key: "status",
            render: status => constants.ORDER_STATUS[status]
        },
        {
            title: "Fecha de entrega",
            dataIndex: "deliveryAt",
            key: "deliveryAt",
            render: date => date === null ? 'No disponible' : formatDate(date, "dateTime")
        },
    ]
    const modalColumns = [
        {
            title: 'Usuario',
            dataIndex: 'userId',
            key: 'userId',
            render: id => userData.username
        },
        {
            title: 'Link',
            render: (text, { options }) => options.link && <a href={options.link} target="_blank">{options.link.slice(0, -25)}...</a>
        },
        ...columns,
        {
            title: "Fecha de creación",
            dataIndex: "createdAt",
            key: "createdAt",
            render: date => date ? formatDate(date) : 'No disponible'
        },
    ]
    return (
        <>
            <ManagePanel
                title='Administrar ordenes'
                customHeader={false}
                tableAtributes={{
                    data: data,
                    columns: columns,
                    actions: actions.orders,
                    onActionClick: handleActionClick,
                    loading: data.length ? false : true,
                    pagination: {
                        defaultPageSize: 10
                    },
                }}
            >
            </ManagePanel>
            {modal &&
                <MoreModal
                    title="Detalle de orden"
                    visible={modal}
                    columns={modalColumns}
                    selected={selected}
                    onCancel={() => setModal(false)}
                />
            }
        </>
    );
}

export default Orders;

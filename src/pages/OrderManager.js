import React, { useEffect, useState } from 'react';
import { ManagePanel } from '../components/templates'
import { notification } from '../components/primitives';
import { MoreModal } from '../components/organisms';
import { getData } from '../libs/dataToTable';
import { actions, columns } from '../resources/tables';
import { formatDate } from '../libs/utils'
import userService from '../services/users';

function OrderManager(props) {

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
    const orderColumns = [
        {
            title: 'Usuario',
            dataIndex: 'userId',
            key: 'userId',
            render: id => userData.username
        },
        {
            title: 'Link',
            dataIndex: 'link',
            key: 'link',
            render: text => text && <a href={text} target="_blank">{text.slice(0, -25)}...</a>
        },
        {
            title: 'Publicaciónes',
            dataIndex: 'publications',
            key: 'publications',
            render: publications => publications && publications.join(', ')
        },
        ...columns.orders,
        {
            title: "Fecha de creación",
            dataIndex: "createdAt",
            key: "createdAt",
            render: date => date? formatDate(date) : 'No disponible'
        },
    ]
    return (
        <>
            <ManagePanel
                title='Administrar ordenes'
                customHeader={true}
                tableAtributes={{
                    data: data,
                    columns: columns.orders,
                    actions: actions.orders,
                    onActionClick: handleActionClick,
                    loading: data.length ? false : true,
                    defaultPageSize: 10,
                }}
            >
            </ManagePanel>
            {modal &&
                <MoreModal
                    title="Detalle de orden"
                    visible={modal}
                    columns={orderColumns}
                    selected={selected}
                    onCancel={() => setModal(false)}
                />
            }
        </>
    );
}

export default OrderManager;

import React, { useEffect, useState } from 'react';
import networkService from '../services/networks';
import { notification } from '../components/primitives';
import { FormModal, ManagePanel } from '../components/templates';
import { getData } from '../libs/dataToTable';
import { forms } from '../resources/forms';
import { actions, columns } from '../resources/tables';

function NetworksManager(props) {
    const [reload, setReload] = useState(false)
    const [data, setData] = useState([])
    const [updateModal, setUpdateModal] = useState(false)
    const [selected, setSelected] = useState({})

    useEffect(async () => {
        const result = await getData('networks')
        if (result.error) return notification.loadingError(result.status)
        setData(result.data)
    }, [reload])

    const handleActionClick = (e, index, id) => {
        e.preventDefault()

        const selection = data.filter(item => item._id === id)[0]
        setSelected(selection)

        if (index === 'update') {
            setUpdateModal(true)
        }
        if (index === 'delete') {
            deleteModal(selection.email, 'networks', id, () => setReload(!reload))
        }
    }
    const onFinish = async (values, method) => {
        const result = await networkService.updateNetworkById(selected._id, values)
        if (result.error) return notification.updateError(result.status)
        notification.updateSuccess()
        handleCloseModal()
    }
    const handleCloseModal = () => {
        setReload(!reload)
        setUpdateModal(false)
    }
    return (
        <>
            <ManagePanel
                title='Administrar redes'
                model='networks'
                reload={handleCloseModal}
                tableAtributes={{
                    data: data,
                    columns: columns.networks,
                    actions: actions.networks,
                    onActionClick: handleActionClick,
                    loading: data.length ? false : true,
                }}
            />
            <FormModal
                visible={updateModal}
                fields={forms.networks}
                selected={selected}
                onCancel={handleCloseModal}
                onFinish={(values) => onFinish(values, 'update')}
                title={`Actualizar red`}
            />
        </>
    )
}

export default NetworksManager;
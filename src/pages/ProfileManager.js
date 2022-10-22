import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import accountService from '../services/accounts';
import { ManageHeader } from '../components/organisms';
import { notification, Selector } from '../components/primitives';
import { deleteModal, FormModal, ManageTable } from '../components/templates';
import { forms } from '../resources/forms';
import { actions, columns } from '../resources/tables';
import { TableColumn } from 'components/Table';
import { constants } from 'utilities/index';
import { useProfiles } from 'hooks';
import { currentUser } from '../libs/userInfo';

function ProfileManager(props) {
    const { id } = useParams()

    const [data, setData] = useState([])
    const [reload, setReload] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [selected, setSelected] = useState({})
    const { updateProfileStatus } = useProfiles()

    const { isAdmin } = currentUser()

    useEffect(async () => {
        const result = await accountService.getProfilesByAccountId(id)
        if (result.error) return notification.loadingError(result.status)
        setData(result.data)
    }, [reload])

    const handleActionClick = (e, index, i) => {
        e.preventDefault()

        const selection = data.filter(item => item._id === i)[0]
        setSelected(selection)

        if (index === 'update') {
            setUpdateModal(true)
        }
        if (index === 'delete') {
            deleteModal('el perfil de ' + selection.network.label, 'profiles', i, () => setReload(!reload))
        }
    }
    const onFinish = async (values) => {
        values.accountId = id
        const result = await accountService.updateProfileById(selected._id, values)
        if (result.error) return notification.updateError(result.status)
        notification.updateSuccess()
        setUpdateModal(false)
        setReload(!reload)
    }

    const onStatusChange = async (id, status) => {
        updateProfileStatus(id, status)
            .then(() => {
                notification.updateSuccess()
                setReload(!reload)
            })
            .catch(error => {
                notification.updateError(error)
            })
    }

    return (
        <>
            <ManageHeader model='profiles' reload={() => setReload(!reload)} />
            <Row>
                <Col span={24}>
                    <ManageTable
                        loading={data.length ? false : true}
                        columns={columns.profiles}
                        dataSource={data}
                        actions={actions.profiles}
                        onActionClick={handleActionClick}
                    >
                        <TableColumn
                            title='Estado'
                            dataIndex='status'
                            key='status'
                            align="center"
                            render={(value, record) => (
                                <Selector
                                    value={value}
                                    data={isAdmin ? constants.ADMIN_PROFILE_STATUS : constants.PROFILE_STATUS }
                                    style={{ width: '12rem' }}
                                    onChange={(status) => onStatusChange(record._id, status)}
                                />
                            )}
                        />
                    </ManageTable>
                </Col>
            </Row>
            <FormModal
                visible={updateModal}
                fields={forms.profiles}
                selected={selected}
                onCancel={() => setUpdateModal(false)}
                onFinish={(values) => onFinish(values, 'update')}
                title={'Actualizar perfil'}
            />
        </>
    );
}

export default ProfileManager;

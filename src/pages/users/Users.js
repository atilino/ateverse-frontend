import React, { useState } from 'react';
import { deleteModal, FormModal, ManagePanel } from '../../components/templates'
import { notification } from '../../components/primitives';
import { actions, columns } from '../../resources/tables';
import { forms } from '../../resources/forms'
import useUser from '../../hooks/useUser'

function UserManager() {
    const { users, user, findUser, updateUser } = useUser()

    const [updateModal, setUpdateModal] = useState(false)

    const handleActionClick = (e, index, id) => {
        e.preventDefault()

        findUser(id)

        if (index === 'update') setUpdateModal(true)

        if (index === 'delete') deleteModal(user.email, 'users', id)

    }
    const updateSelectedUser = async (values) => {
        updateUser(user._id, values)
        .then(() =>{
            notification.updateSuccess()
            setUpdateModal(false)
        })
            .catch(error => {
                return notification.updateError(error)

            })
    }

    return (
        <>
            <ManagePanel
                title='Administrar usuarios'
                model='users'
                reload={()=>{}}
                tableAtributes={{
                    data: users,
                    columns: columns.users,
                    actions: actions.users,
                    onActionClick: handleActionClick,
                    loading: users.length ? false : true,
                }}
            />
            <FormModal
                visible={updateModal}
                fields={forms.users}
                selected={user}
                onCancel={() => setUpdateModal(false)}
                onFinish={updateSelectedUser}
                title={`Actualizar usuario`}
            />
        </>
    )
}

export default UserManager;

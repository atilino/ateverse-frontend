import React from 'react';
import { Selector } from '../components/primitives'
import { ManagePanel } from '../components/templates';
import useProfiles from '../hooks/useProfiles';
import useNetwork from '../hooks/useNetwork';
import { columns } from '../resources/tables'
import { currentUser } from '../libs/userInfo';
import { TableColumn } from 'components/Table';
import { constants } from 'utilities/index';

function BlockedProfiles() {

    const defaultValue = 'facebook'
    const { profiles, getBlockedProfiles, updateProfileStatus } = useProfiles({ type: 'blocked', network: defaultValue })
    const { networks } = useNetwork()

    const { isAdmin } = currentUser()


    const onStatusChange = async (id, status) => {
        updateProfileStatus(id, status)
            .then(() => {
                notification.updateSuccess()
            })
            .catch(error => {
                notification.updateError(error)
            })
    }

    const customColumns = <>
        <TableColumn
            title='Estado'
            dataIndex='status'
            key='status'
            align="center"
            render={(value, record) => (
                <Selector
                    value={value}
                    data={isAdmin ? constants.ADMIN_PROFILE_STATUS : constants.PROFILE_STATUS}
                    style={{ width: '12rem' }}
                    onChange={(status) => onStatusChange(record._id, status)}
                />
            )}
        />
    </>

    return (
        <ManagePanel
            title='Perfiles bloqueados'
            customHeader={false}
            tableAtributes={{
                data: profiles,
                columns: columns.profiles,
                loading: profiles.length ? false : true,
                children: customColumns
            }}
            customContent={
                <Selector
                    data={networks}
                    onChange={getBlockedProfiles}
                    defaultValue={defaultValue}
                />
            }
        />
    );
}

export default BlockedProfiles;

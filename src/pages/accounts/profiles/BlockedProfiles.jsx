import React from 'react';
import { PageTitle, Selector } from '../../../components/primitives'
import { ManagePanel, ManageTable } from '../../../components/templates';
import useProfiles from '../../../hooks/useProfiles';
import useNetwork from '../../../hooks/useNetwork';
import { TableColumn } from 'components/Table';
import { constants } from 'utilities/index';
import useAuth from 'hooks/useAuth';

function BlockedProfiles() {

  const defaultValue = 'facebook'
  const { profiles, getBlockedProfiles, updateProfileStatus } = useProfiles({ type: 'blocked', network: defaultValue })
  const { networks } = useNetwork()
  const { isAdmin } = useAuth()
  const columns = [
    {
      title: 'Dispositivo',
      key: 'device',
      dataIndex: ['accountId', 'deviceId', 'imei'],
      render: imei => imei || 'No asignado'
    },
    {
      title: 'Red social',
      dataIndex: 'network',
      key: 'network',
      render: network => network?.name
    },
    {
      title: 'Nombre',
      dataIndex: 'accountId',
      key: 'accountId',
      responsive: ['md'],
      render: account => account?.name || 'No existe'
    },
    {
      title: 'Usuario',
      dataIndex: 'username',
      key: 'username',
      responsive: ['md'],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contraseña',
      dataIndex: 'password',
      key: 'password',
      responsive: ['md'],
    }
  ]
  return (
    <>
      <Selector
        data={networks}
        onChange={getBlockedProfiles}
        defaultValue={defaultValue}
        style={{ marginBottom: '1.5rem' }}
      />
      <ManageTable
        dataSource={profiles}
        columns={columns}
        loading={profiles.length ? false : true}
        pagination={{
          defaultPageSize: 10
        }}
      >
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
              onChange={status => {
                updateProfileStatus(record._id, status)
                  .then(() => notification.updateSuccess())
                  .catch(error => notification.updateError(error))
              }}
            />
          )}
        />
      </ManageTable>
    </>
  );
}

export default BlockedProfiles;

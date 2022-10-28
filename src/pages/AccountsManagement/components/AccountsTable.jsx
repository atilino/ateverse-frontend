//@ts-check
'use strict'
import { Selector } from 'components/primitives';
import { TableColumn } from 'components/Table';
import { ManageTable } from 'components/templates';
import React from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../../../libs/userInfo';
import { constants } from 'utilities/index';

const COLUMNS = [
  {
    title: 'Dispositivo asignado',
    dataIndex: 'deviceId',
    key: 'deviceId',
    render: deviceId => deviceId ? deviceId.imei : 'No asignado',
    responsive: ['md'],
  },
  {
    title: 'Nombre',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Teléfono',
    dataIndex: 'phone',
    key: 'phone',
    responsive: ['md'],
  },
  {
    title: 'Perfiles',
    dataIndex: 'profiles',
    key: 'profiles',
    align: "center",
    render: (profiles, record) => <Link to={`/accounts/${record._id}/profile`}>{profiles && profiles.length}</Link>,
  }
]

const ACTIONS = [
  {
    title: 'Actualizar',
    dataIndex: 'update',
    key: 'update',
  },
  {
    title: 'Eliminar',
    dataIndex: 'delete',
    key: 'delete',
  },
  {
    title: 'Cambiar dispositivo',
    dataIndex: 'changeDevice',
    key: 'changeDevice',
  },
]

/** @typedef {(id: string) => void} actionCallback */
/**
 *
 * @param {object} props
 * @param {Array<import('src/models/account.model').Account>} props.accounts
 * @param {actionCallback} props.onPersonalityClick
 * @param {actionCallback} props.onDeleteClick
 * @param {actionCallback} props.onUpdateClick
 * @param {actionCallback} props.onChangeDevice
 * @param {(id: string, status: string) => void} props.onStatusChange
 */
function AccountsTable({
  accounts,
  onPersonalityClick,
  onDeleteClick,
  onUpdateClick,
  onChangeDevice,
  onStatusChange
}) {

  const { isAdmin } = currentUser()

  const actions = {
    update: onUpdateClick,
    delete: onDeleteClick,
    changeDevice: onChangeDevice
  }
  const handleAction = (e, action, id) => {
    e.preventDefault()
    return actions[action](id)
  }

  return (
    <ManageTable columns={COLUMNS} actions={ACTIONS} dataSource={accounts} onActionClick={handleAction}>
      <TableColumn
        title='Personalidad'
        dataIndex='personality'
        key='personality'
        align="center"
        render={(value, record) => (
          <a onClick={e => {
            e.preventDefault()
            return onPersonalityClick(record._id)
          }}>
            Ver
          </a>
        )}
      />
      <TableColumn
        title='Estado'
        dataIndex='status'
        key='status'
        align="center"
        render={(value, record) => (
          isAdmin ?
            <Selector
              //@ts-ignore
              value={value}
              data={constants.ACCOUNT_STATUS}
              style={{ width: '9rem' }}
              onChange={status => onStatusChange(record._id, status)}
            />
            :
            constants.ACCOUNT_STATUS.find(({ name }) => name === value).label
        )}
      />
    </ManageTable>
  );
}

export default AccountsTable;

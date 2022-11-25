//@ts-check
'use strict'
import { Selector } from 'components/primitives';
import { searchProps, TableColumn } from 'components/Table';
import { ManageTable } from 'components/templates';
import React from 'react';
import { Link } from 'react-router-dom';
import { constants } from 'utilities/index';
import useAccount from 'hooks/useAccount';
import useAuth from 'hooks/useAuth';


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

/** @typedef {(id: string, account: object) => void} actionCallback */
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
  onPersonalityClick,
  onDeleteClick,
  onUpdateClick,
  onChangeDevice,
  onStatusChange
}) {

  const { isAdmin } = useAuth()
  const { accounts, accountsPagination, getAccounts } = useAccount()

  const COLUMNS = [
    {
      title: 'Dispositivo asignado',
      dataIndex: 'deviceId',
      key: 'deviceId',
      render: deviceId => deviceId ? deviceId.imei : 'No asignado',
      responsive: ['md'],
      ...searchProps({
        index: 'imei',
        onSearch: (value) => getAccounts(1, accountsPagination.limit, { imei: value }),
        onReset: () => getAccounts()
      })
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      ...searchProps({
        index: 'nombre',
        onSearch: (value) => getAccounts(1, accountsPagination.limit, { name: value }),
        onReset: () => getAccounts()
      })
    },
    {
      title: 'Teléfono',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['md'],
      ...searchProps({
        index: 'telefono',
        onSearch: (value) => getAccounts(1, accountsPagination.limit, { phone: value }),
        onReset: () => getAccounts()
      })
    },
    {
      title: 'Perfiles',
      dataIndex: 'profiles',
      key: 'profiles',
      align: "center",
      render: (profiles, record) => <Link to={`../${record._id}/profiles`}>{profiles && profiles.length}</Link>,
    }
  ]

  const actions = {
    update: onUpdateClick,
    delete: onDeleteClick,
    changeDevice: onChangeDevice
  }
  const handleAction = (e, action, id, account) => {
    e.preventDefault()
    return actions[action](id, account)
  }


  return (
    <ManageTable
      columns={COLUMNS}
      actions={ACTIONS}
      dataSource={accounts}
      onActionClick={handleAction}
      pagination={{
        current: accountsPagination.page,
        pageSize: accountsPagination.limit,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: true,
        total: accountsPagination.totalResults,
        showTotal: (total, [from, to]) => `${from} a ${to} de ${total} cuentas encontradas`,
        onChange: page => page !== accountsPagination.page && getAccounts(page, accountsPagination.limit),
        onShowSizeChange: (current, limit) => getAccounts(current, limit),
      }}
    >
      <TableColumn
        title='Personalidad'
        dataIndex='personality'
        key='personality'
        align="center"
        render={(value, record) => (
          <a onClick={e => {
            e.preventDefault()
            return onPersonalityClick(record._id, record)
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

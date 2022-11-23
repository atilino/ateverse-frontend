import { Table } from 'components/Table';
import React from 'react';
import { constants } from 'utilities/index';

function AccountsSummaryTable({ accounts }) {

  const PROFILES_COLUMNS = (networkName) => [
    {
      title: 'Usuario',
      dataIndex: 'username',
      render: (value, record) => record.profiles.filter(profile => profile.network.name === networkName)[0]?.username
    },
    {
      title: 'Contraseña',
      dataIndex: 'password',
      render: (value, record) => record.profiles.filter(profile => profile.network.name === networkName)[0]?.password
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      render: (value, record) => statusRender(record.profiles.filter(profile => profile.network.name === networkName)[0]?.status)
    }
  ]

  const SUBCOLUMNS = [
    {
      title: 'Cuenta',
      dataIndex: 'account',
      children: [
        {
          title: 'Nombre',
          dataIndex: 'name',
          fixed: 'left',
          width: 200,
        },
        {
          title: 'Teléfono',
          dataIndex: 'phone',
          width: 200,
        }
      ]
    },
    {
      title: 'Facebook',
      dataIndex: 'facebook',
      children: PROFILES_COLUMNS('facebook')
    },
    {
      title: 'Twitter',
      dataIndex: 'twitter',
      children: PROFILES_COLUMNS('twitter')
    },
    {
      title: 'Instagram',
      dataIndex: 'instagram',
      children: PROFILES_COLUMNS('instagram')
    },
  ]

  const statusRender = (status) => constants.ADMIN_PROFILE_STATUS.find(s => s.name === status)?.label

  return (
    accounts.length !== 0 &&
    <Table
      loading={accounts.length === 0}
      dataSource={accounts.map((account, index) => ({ ...account, key: index }))}
      columns={[{
        title: 'Dispositivos',
        dataIndex: 'imei',
        key: 'imei',
        fixed: 'left',
        render: text => <span style={{ fontWeight: 600, fontSize: '1rem' }}>{text}</span>
      }]}
      size='large'
      scroll={{
        x: '100%',
      }}
      expandable={{
        defaultExpandAllRows: true,
        expandRowByClick: true,
        expandedRowRender: record => (
          <Table
            size='small'
            pagination={false}
            bordered
            columns={SUBCOLUMNS}
            dataSource={record.accounts}
            scroll={{
              x: '100vw',
            }}
          />
        ),
      }}
    >
    </Table>
  );
}

export default AccountsSummaryTable;
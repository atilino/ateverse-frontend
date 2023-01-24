import React from 'react';
import { Selector } from '../../../components/primitives'
import { ManageTable } from '../../../components/templates';
import useProfiles from '../../../hooks/useProfiles';
import useNetwork from '../../../hooks/useNetwork';
import { TableColumn } from 'components/Table';
import { COLUMNS, PROFILE_STATUS } from './constants';

function BlockedProfiles() {

  const defaultValue = 'facebook'
  const { profiles, getBlockedProfiles, updateProfileStatus } = useProfiles({ type: 'blocked', network: defaultValue })
  const { networks } = useNetwork()

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
        columns={COLUMNS}
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
              data={PROFILE_STATUS}
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

import { ManageTable } from 'components/templates';
import useDevice from 'hooks/useDevice';
import React from 'react';
import { useParams } from 'react-router-dom';
import { constants } from 'utilities/index';
import { ManagementHeader } from './components';

function Processes() {
  const { deviceId } = useParams()
  const { device } = useDevice('device', { id: deviceId})
  const processes = useDevice('processes', { id: deviceId })

  const columns = [
    {
      title: 'Servicio',
      dataIndex: 'name',
      key:'name'
    },
    {
      title: 'Uso',
      dataIndex: 'percent',
      key:'percent',
      render: usage => `${usage.toFixed(2)}%`
    },
    {
      title: 'Cantidad',
      dataIndex: 'value',
      key:'value',
      render: ram => `${(ram/constants.MBYTE).toFixed(2)} MB`
    },
    {
      title: 'Estado',
      dataIndex: 'status',
      key:'status'
    },
  ]

  return (
    <>
      <ManagementHeader device={device}/>
      <ManageTable
        columns={columns}
        dataSource={processes.processes}
      >

      </ManageTable>
    </>
  );
}

export default Processes;
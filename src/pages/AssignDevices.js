import React, { useEffect, useState } from 'react';
import { notification, PageTitle } from '../components/primitives';
import { Col, Row, Table } from 'antd'
import accountService from '../services/accounts';
import deviceService from '../services/devices'
import { networks } from '../resources/variables';

function AssignDevices(props) {

    const [selectedRows, setSelectedRows] = useState([])
    const [reload, setReload] = useState(false)
    const [accounts, setAccounts] = useState([])
    const [devices, setDevices] = useState([])

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const accountsData = await accountService.getAccounts()
        if (accountsData.error) notification.loadingError(accountsData.error)
        else {
            setAccounts(format(accountsData.data))
        }
        const devicesData = await deviceService.getDevices()
        if (devicesData.error) notification.loadingError(devicesData.error)
        else {
            setDevices(format(devicesData.data))
        }
    }

    const format = (data) => {
        if (data.length) {
            const formated = data.map(item => ({ ...item, key: item._id }))
            return formated
        } else return []
    }

    const columns = {
        devices: [
            {
                title: 'IMEI',
                dataIndex: 'imei',
            }
        ],
        accounts: [
            {
                title: 'Nombre',
                dataIndex: 'name',
            },
            {
                title: 'Red',
                dataIndex: 'network',
                render: network => networks[network]
            },
        ]
    }

    const onSelectChange = (selected) => {
        console.log(selected)
        // setSelectedRows(old =>)
    }

    const rowSelection = {
        type: 'radio',
        selectedRows,
        onChange: onSelectChange
    }

    return (
        <>
            <PageTitle>Asignar cuentas a dispositivo</PageTitle>
            <Row>
                <Col span={12}>
                    <Table rowSelection={rowSelection} columns={columns.devices} dataSource={devices} pagination={{pageSize: 20}}/>
                </Col>
                <Col span={12}>
                    <Table rowSelection={rowSelection} columns={columns.accounts} dataSource={accounts} pagination={{pageSize: 20}}/>
                </Col>
            </Row>
        </>
    );
}

export default AssignDevices;
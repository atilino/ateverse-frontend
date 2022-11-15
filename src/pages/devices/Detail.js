import React, { useEffect, useState } from 'react'
import { PageTitle } from '../../components/primitives'
import { Row, Col, Table } from 'antd'
import deviceService from '../../services/devices'
import { notification } from '../../components/primitives'
import { columns } from '../../resources/tables'
import { Line } from 'react-chartjs-2'

function Detail() {
    const [selectedDevice, setSelectedDevice] = useState({})
    const [devicesData, setDevicesData] = useState([])
    const [telemetryData, setTelemetryData] = useState({
        data: {
            cpu: [],
            ram: []
        },
        labels: []
    })

    const chartData = {
        labels: telemetryData.labels,
        datasets: [
            {
                label: 'RAM',
                data: telemetryData.data.ram,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'CPU',
                data: telemetryData.data.cpu,
                fill: false,
                backgroundColor: 'rgb(0, 50, 140)',
                borderColor: 'rgba(0, 50, 140, 0.2)',
            },
        ],
    }
    useEffect(() => {
        if (!Object.keys(selectedDevice).length) {
            getDevicesData()
        }
        else {
            getTelemetryData()
        }
    }, [selectedDevice])


    const getDevicesData = async () => {
        const devices = await deviceService.getDevices()
        if (devices.error) return notification.loadingError()
        const keyedDevices = devices.data.map(device => ({ key: device._id, ...device }))
        setDevicesData(keyedDevices)
    }

    const getTelemetryData = async () => {
        const telemetry = await deviceService.getDeviceLogs(selectedDevice)
        if (telemetry.error) return notification.loadingError()
        const formatedTelemetry =  formatTelemetry(telemetry.data)
        setTelemetryData(formatedTelemetry)
    }

    const formatTelemetry = (data) => {
        const cpu = data.map(item => item.cpu)
        const ram = data.map(item => item.ram)
        const labels = data.map(item => new Date(item.createdAt).toLocaleString())
        return {
            data: {
                cpu,
                ram,
            },
            labels
        }
    }

    return (
        <>
            <PageTitle>Monitorear dispositivos</PageTitle>
            <Row>
                <Col xl={12} xs={24}>
                    <Table
                        rowSelection={{
                            type: 'radio',
                            onChange: (selectedKey, selected) => {
                                setSelectedDevice(selectedKey);
                            },
                        }}
                        columns={columns.devices}
                        dataSource={devicesData}
                    />
                </Col>
                <Col xl={12} xs={24}>
                    <Line data={chartData} />
                </Col>
            </Row>
        </>
    );
}

export default Detail;

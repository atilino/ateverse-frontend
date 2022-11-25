import React from 'react'
import { useDevice } from 'hooks/index';
import { useParams } from 'react-router-dom';
import { constants, date } from 'utilities/index';
import { Row } from 'antd';
import { ManagementHeader } from './components';
import { LineChart } from '../../components/charts';

function DeviceDetail() {
    const { deviceId } = useParams()
    const { device, updateDevice } = useDevice('device', { id: deviceId })

    const cpu = useDevice('logs', {
        id: deviceId,
        variableName: 'cpu',
        from: date.yesterday().toISOString()
    })

    const ram = useDevice('logs', {
        id: deviceId,
        variableName: 'ram',
        from: date.yesterday().toISOString()
    })

    const disk = useDevice('logs', {
        id: deviceId,
        variableName: 'disk',
        from: date.yesterday().toISOString()
    })

    const internet = useDevice('logs', {
        id: deviceId,
        variableName: 'internet',
        from: date.yesterday().toISOString()
    })

    return (
        <>
            <ManagementHeader device={device} />
            <Row justify='center'>
                <LineChart
                    labels={cpu.logs.percent ? cpu.logs.percent.map(log => date.formatHHMMSS(log.createdAt)) : []}
                    x1={cpu.logs.percent ? cpu.logs.percent.map(log => log.value / 100) : []}
                    x2={cpu.logs.temperature ? cpu.logs.temperature.map(log => log.value) : []}
                    x1Label='CPU'
                    x2Label='Temperatura'
                    heigth='250px'
                    width='80%'
                />
            </Row>
            <Row justify='center'>
                <LineChart
                    labels={ram.logs.percent ? ram.logs.percent.map(log => date.formatHHMMSS(log.createdAt)) : []}
                    x1={ram.logs.percent ? ram.logs.percent.map(log => log.value / 100) : []}
                    x1Label='RAM'
                    heigth='250px'
                    width='80%'
                />
            </Row>
            <Row justify='center'>
                <LineChart
                    labels={disk.logs.percent ? disk.logs.percent.map(log => date.formatHHMMSS(log.createdAt)) : []}
                    x1={disk.logs.percent ? disk.logs.percent.map(log => log.value / 100) : []}
                    x1Label='Disco duro'
                    heigth='250px'
                    width='80%'
                />
            </Row>
            <Row justify='center'>
                <LineChart
                    labels={internet.logs.send ? internet.logs.send.map(log => date.formatHHMMSS(log.createdAt)) : []}
                    x1={internet.logs.send ? internet.logs.send.map(log => log.value / constants.MBIT) : []}
                    x2={internet.logs.receive ? internet.logs.receive.map(log => log.value / constants.MBIT) : []}
                    x1Label='Envio Mbits'
                    x2Label='Recepción Mbits'
                    y1Format={{}}
                    heigth='250px'
                    width='80%'
                />
            </Row>
        </>
    )
}

export default DeviceDetail;

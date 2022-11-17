import { useEffect, useState } from 'react'
import deviceService from '../services/devices'
import { resultHandler } from './helpers'

/**
 * @param {( 'devices' | 'logs' | 'processes')} [firstLoadService]
 * @param {object} [config]
 */
const useDevice = (firstLoadService, config) => {

    const [devices, setDevices] = useState([])
    const [device, setDevice] = useState({
        imei: '',
        status: '',
        switch: false,
        accounts: []
    })
    const [logs, setLogs] = useState([])
    const [processes, setProcesses] = useState()

    useEffect(async () => {
        if (firstLoadService === 'logs') {
            await getDeviceLogs(config)
        } else if (firstLoadService === 'processes') {
            const { id } = config
            await listDeviceProcesses(id)
        }
        else {
            await listDevices()
        }
    }, [])

    const listDevices = () => {
        return deviceService
            .getDevices()
            .then(resultDevices => {
                setDevices(resultDevices.data)
            })
    }

    const findDevice = (id) => {
        const foudedDevice = devices.filter(item => item._id === id)[0]
        setDevice(foudedDevice)
        return
    }

    const createDevice = (deviceObject) => {
        return deviceService
            .createDevice(deviceObject)
            .then(response => {
                resultHandler(response, result => {
                    setDevice(result)
                    setDevices(values => [result, ...values])
                })
            })
    }

    const updateDevice = (id, deviceObject) => {
        return deviceService
            .updateDeviceById(id, deviceObject)
            .then(response => {
                resultHandler(response, result => {
                    setDevice(result)
                    const devicesUpdated = devices.map(item => {
                        if (item._id === id) {
                            return { ...item, ...result }
                        }
                        return item
                    })
                    setDevices(devicesUpdated)
                })
            })
    }

    const deleteDevice = (id) => {
        return deviceService
            .deleteDeviceById(id)
            .then(() => {
                setDevices(devices.filter(item => item._id !== id))
            })
    }

    const getDeviceLogs = ({ id, variableName, from, to }) => {
        return deviceService.getDeviceLogs(id, variableName, from, to)
            .then(resultLogs => {
                setLogs(resultLogs.data)
            })
    }

    const listDeviceProcesses = (id) => {
        return deviceService.listProcesses(id)
            .then(resultProcesses => {
                setProcesses(resultProcesses.data)
            })
    }
    return {
        devices,
        device,
        logs,
        processes,
        listDevices,
        createDevice,
        updateDevice,
        deleteDevice,
        findDevice,
        getDeviceLogs,
        listDeviceProcesses
    }
}

export default useDevice

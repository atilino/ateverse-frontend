import { useEffect, useState } from 'react'
import deviceService from '../services/devices'
import { resultHandler } from './helpers'

const useDevice = () => {

    const [devices, setDevices] = useState([])
    const [device, setDevice] = useState({
        imei: '',
        status: '',
        switch: false,
        accounts: []
    })
    const [logs, setLogs] = useState([])

    useEffect(() => {
        deviceService
            .getDevices()
            .then(resultDevices => {
                setDevices(resultDevices.data)
            })
    }, [])

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
                        if(item._id === id){
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
    return {
        devices,
        device,
        createDevice,
        updateDevice,
        deleteDevice,
        findDevice
    }
}

export default useDevice

import { useEffect, useState } from 'react'
import Device from '../adapters/device.adapter'
import deviceService from '../services/devices'
import { resultHandler } from './helpers'
import { DEFAULT_PAGINATE_LIMIT } from '../constants/devices'
import usePagination from './usePagination'
import { useSearchParams } from 'react-router-dom'
import { constants } from '../utilities'

/** @typedef {import("../models/device.model").Device} IDevice*/

/**
 * @param {( 'devices' | 'logs' | 'processes' | 'device' )} [service]
 * @param {object} [config]
 * @param {boolean} [config.initialPagination]
 */
const useDevice = (service, config = { initialPagination: false }) => {

    /** @type {[IDevice[], function]} */
    const [devices, setDevices] = useState([])

    /** @type {[IDevice, function]} */
    const [device, setDevice] = useState(new Device())
    const [logs, setLogs] = useState({})
    const [processes, setProcesses] = useState()
    const [pagination, setPagination] = usePagination({
        page: 1,
        limit: DEFAULT_PAGINATE_LIMIT,
        initialPagination: config.initialPagination
    })
    const [search] = useSearchParams()

    useEffect(async () => {
        if (service === 'logs') {
            await getDeviceLogs(config)
        } else if (service === 'processes') {
            const { id } = config
            await listDeviceProcesses(id)
        } else if (service === 'device') {
            const { id } = config
            await getDeviceById(id)
        }
        else {
            await listDevices(config.initialPage, config.initialLimit)
        }
    }, [])

    /**
     * @param {number} page
     * @param {number} limit
     * @param {object} filters
     * @param {number} [filters.imei]
     * @param {number} [filters.status]
     * @param {string} [filters.switch]
     * @param {number} [filters.connected]
     * @param {number} [filters.upgradeable]
     * @returns {Promise}
     */
    const listDevices = (page, limit, filters) => {
        filters = {
            imei: search.get('imei'),
            status: search.get('status'),
            switch: constants.BOOLEAN[search.get('switch')],
            connected: constants.BOOLEAN[search.get('connected')],
            upgradeable: constants.BOOLEAN[search.get('upgradeable')],
            ...filters
        }
        return deviceService
            .listDevices(page, limit, filters)
            .then(resultDevices => {
                const { data: { results, ...paginationData } } = resultDevices
                setDevices(results)
                setPagination(paginationData)
            })
    }

    const getDeviceById = (id) => {
        return deviceService
            .getDeviceById(id)
            .then(resultDevice => {
                setDevice(new Device(resultDevice.data))
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
        return deviceService.listDeviceProcesses(id)
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
        getDeviceById,
        createDevice,
        updateDevice,
        deleteDevice,
        findDevice,
        getDeviceLogs,
        listDeviceProcesses,
        pagination
    }
}

export default useDevice

import { useEffect, useState } from 'react'
import networkService from '../services/networks'
import { error } from '../utilities'
import { resultHandler } from './helpers'

const useNetwork = () => {
    const [networks, setNetworks] = useState([])
    const [groups, setGroups] = useState([])

    useEffect(() => {
        networkService.getNetworks()
            .then(response => {
                resultHandler(response, result => setNetworks(result))
            })
        networkService.getAllGroups()
            .then(response => {
                resultHandler(response, result => setGroups(result))
            })
    }, [])

    const getGroupsQuery = ({ name = null, url = null }) => {
        return networkService.getAllGroups({ name, url })
            .then(response => {
                resultHandler(response, result => setGroups(result))
            })
    }
    const createGroup = (groupObject = { name: '', url: '' }) => {
        if (!groupObject.name || !groupObject.name.length) return error('El nombre es requerido')
        if (!url || !url.length) return error('La URL es requerida')
        return networkService.createGroup(groupObject)
            .then(response => resultHandler(response, result => setGroups(result)))
    }

    const updateGroup = (id, groupObject = { name: '', url: '' }) => {
        if (!id || !id.length) return error('El es id requerido')
        return networkService.createGroup(groupObject)
            .then(response => resultHandler(response, result => setGroups(result)))
    }

    const removeGroup = (id) => {
        if (!id || !id.length) return error('El es id requerido')
        networkService.createGroup(groupObject)
            .then(response => resultHandler(response, result => setGroups(result)))
    }

    return {
        networks,
        groups,
        createGroup,
        updateGroup,
        removeGroup,
        getGroupsQuery
    }
}

export default useNetwork
import { useEffect, useState } from 'react';
import accountService from '../services/accounts';
import { resultHandler } from './helpers';

const useProfiles = ({ type = 'all', network = 'facebook', templateId } = {}) => {
    const [profiles, setProfiles] = useState([])
    const [profilesCount, setProfilesCount] = useState(0)
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if (type === 'all') getAllProfiles(network)
        if (type === 'blocked') getBlockedProfiles(network)
        if (type === 'available') getAvailableProfiles(network, templateId)
        if (type === 'active') getActiveProfiles(network)
        if (type === 'groups') {
            listProfilesGroups()
            getActiveProfiles(network)
        }
    }, [])

    const getAllProfiles = async (network) => {
        accountService
            .getProfiles(network)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(result.data)
            })
    }

    const listProfilesGroups = async () => {
        accountService
            .listProfilesGroups()
            .then(result => {
                if (result.error) throw Error(result.error)
                else setGroups(result.data)
            })
    }

    const filterProfilesGroups = (_id) => {
        const filtered = groups.filter(group => group._id!== _id)
        setGroups(filtered)
        return filtered
    }

    const getBlockedProfiles = async (network) => {
        accountService
            .getBlockedProfiles(network)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(result.data)
            })
    }

    const getAvailableProfiles = async (network, templateId, tags) => {
        accountService
            .getAvailableProfiles(network, templateId, tags)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfilesCount(result.data)
            })
    }

    const getActiveProfiles = async (network) => {
        accountService
            .getActiveProfiles(network)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(result.data)
            })
    }

    const createProfile = async (profileObject) => {
        accountService
            .createProfile(profileObject)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(profiles.concat(result.data))
            })
    }
    const updateProfile = async (id, profileObject) => {
        accountService
            .updateProfileById(id, profileObject)
            .then(result => {
                if (result.error) throw Error(result.error)
                else {
                    const updatedProfiles = profiles.map(item => {
                        if (item._id === id) return { ...item, ...profileObject }
                        return item
                    })
                    setProfiles(updatedProfiles)
                }
            })
    }
    const updateProfileStatus = (id, status) => {
        return accountService
            .updateProfileStatus(id, status)
            .then(response => {
                resultHandler(response, result => {
                    const updatedProfile = profiles.map(item => {
                        if (item._id === id) return { ...item, status: status }
                        return item
                    })
                    setProfiles(updatedProfile)
                })
            })
    }

    const deleteProfile = async (id) => {
        accountService
            .deleteProfileById(id)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(profiles.filter(item => item._id !== id))
            })
    }
    return {
        groups,
        profiles,
        profilesCount,
        getAllProfiles,
        getBlockedProfiles,
        getAvailableProfiles,
        getActiveProfiles,
        listProfilesGroups,
        createProfile,
        updateProfile,
        updateProfileStatus,
        deleteProfile,
        filterProfilesGroups
    }
}


export default useProfiles

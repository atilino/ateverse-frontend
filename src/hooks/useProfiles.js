import { useEffect, useState } from 'react';
import accountService from '../services/accounts';

const useProfiles = ({ type = 'all', network = 'facebook' }) => {
    const [profiles, setProfiles] = useState([])
    const [profilesCount, setProfilesCount] = useState(0)
    const [groups, setGroups] = useState([])

    useEffect(() => {
        if (type === 'all') getAllProfiles(network)
        if (type === 'blocked') getBlockedProfiles(network)
        if (type === 'available') getAvailableProfiles(network)
        if (type === 'active') getActiveProfiles(network)
    }, [])

    const getAllProfiles = async (network) => {
        accountService
            .getProfiles(network)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(result.data)
            })
    }

    const getProfileGroups = async (id) => {
        accountService
            .getProfileGroups(id)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setGroups(result.data)
            })
    }

    const getBlockedProfiles = async (network) => {
        accountService
            .getBlockedProfiles(network)
            .then(result => {
                if (result.error) throw Error(result.error)
                else setProfiles(result.data)
            })
    }

    const getAvailableProfiles = async (network) => {
        accountService
            .getAvailableProfiles(network)
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
        getProfileGroups,
        createProfile,
        updateProfile,
        deleteProfile
    }
}


export default useProfiles
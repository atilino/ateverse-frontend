import { useState, useEffect } from 'react'
import accountService from '../services/accounts'
import interestService from '../services/interests'
import { resultHandler } from './helpers'

const useAccount = () => {
    const [accounts, setAccounts] = useState([])
    const [account, setAccount] = useState({})
    const [personalityInterests, setPersonalityInterests] = useState([])

    useEffect(() => {
        accountService
            .getAccounts()
            .then(resultAccounts => {
                setAccounts(resultAccounts.data)
            })
        getAllPersonalityInterests()
    }, [])

    const getAccount = (id) => {
        return accountService
            .getAccountById(id)
            .then(resultAccounts => {
                resultHandler(resultAccounts, result => {
                    setAccount(result)
                })
            })
    }

    const selectAndUpdateAccount = (id, accountObject = {}) => {
        let account = accounts.filter(item => item._id === id)[0]
        setAccount({ ...account, ...accountObject })
        return { ...account, ...accountObject }
    }

    const getDeviceAccounts = (deviceImei) => {
        return accountService
            .getAccountsByImei(deviceImei)
            .then(resultAccounts => {
                resultHandler(resultAccounts, result => {
                    setAccounts(result)
                })
            })
    }
    const createAccount = (accountObject) => {
        return accountService
            .createAccount(accountObject)
            .then(resultAccount => {
                resultHandler(resultAccount, result => {
                    setAccounts(accounts => [...accounts, result])
                })
            })
    }

    const updateAccount = (id, accountObject) => {
        return accountService
            .updateAccountById(id, accountObject)
            .then(resultAccount => {
                resultHandler(resultAccount, result => {
                    const updatedAccounts = accounts.map(item => {
                        if (item._id === id) return { ...item, ...result }
                        return item
                    })
                    setAccounts(updatedAccounts)
                })
            })
    }

    const updateAccountStatus = (id, status) => {
        return accountService
            .updateAccountStatus(id, status)
            .then(response => {
                resultHandler(response, result => {
                    const updatedAccounts = accounts.map(item => {
                        if (item._id === id) return { ...item, status: status }
                        return item
                    })
                    setAccounts(updatedAccounts)
                })
            })
    }
    const deleteAccount = (id) => {
        return accountService
            .deleteAccountById(id)
            .then(response => {
                resultHandler(response, result => {
                    setAccounts(accounts.filter(item => item._id !== id))
                })
            })
    }

    const getAllPersonalityInterests = () => {
        return interestService
            .getInterests()
            .then(resultInterests => {
                resultHandler(resultInterests, result => {
                    setPersonalityInterests(result)
                })
            })

    }
    return {
        accounts,
        account,
        getAccount,
        getDeviceAccounts,
        createAccount,
        updateAccount,
        deleteAccount,
        personalityInterests,
        getAllPersonalityInterests,
        selectAndUpdateAccount,
        updateAccountStatus
    }
}

export default useAccount

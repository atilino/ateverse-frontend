import { AlipayCircleOutlined } from '@ant-design/icons'
import { DEFAULT_PAGINATE_LIMIT } from 'constants/accounts'
import { useState, useEffect } from 'react'
import accountService from '../services/accounts'
import interestService from '../services/interests'
import { resultHandler } from './helpers'
import usePagination from './usePagination'

/**
 * @param {object} [config]
 * @param {('accounts' | 'accountsSummary')} config.service
 * @param {object} [settings]
 */
const useAccount = (config = { service: 'accounts' }, settings) => {
	const [accounts, setAccounts] = useState([])
	const [pagination, setPagination] = usePagination({
		limit: settings?.limit || DEFAULT_PAGINATE_LIMIT,
		page: 1,
		initialPagination: true
	})
	const [account, setAccount] = useState({})
	const [accountsSummary, setAccountsSummary] = useState([])
	const [personalityInterests, setPersonalityInterests] = useState([])

	useEffect(() => {
		if (config.service === 'accounts') {
			getAccounts(pagination.page, settings?.limit || pagination.limit)
			getAllPersonalityInterests()
		} else if (config.service === 'accountsSummary') {
			listAccountsSummary()
		}
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

	/**
	 * Get paginated accounts
	 * @param {number} [page]
	 * @param {number} [limit]
	 * @param {object} [filters]
	 * @param {string} [filters.imei]
	 * @param {string} [filters.name]
	 * @param {number} [filters.phone]
	 * @return {object} Pagination data
	 */
	const getAccounts = (page, limit, filters) => {
		accountService
			.getAccounts(page, limit, { imei: filters?.imei, name: filters?.name, phone: filters?.phone })
			.then(resultAccounts => {
				const { data: { results, ...paginationData } } = resultAccounts
				setAccounts(results)
				setPagination(paginationData)
			})
	}
	const selectAndUpdateAccount = (accountObject) => {
		setAccount(accountObject)
	}

	const listAccountsSummary = () => {
	return accountService
			.listAccountsSummary()
			.then(resultAccountsSummary => {
				resultHandler(resultAccountsSummary, result => {
					setAccountsSummary(result)
				})
			})
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
		pagination,
		account,
		accountsSummary,
		getAccount,
		getDeviceAccounts,
		createAccount,
		updateAccount,
		deleteAccount,
		personalityInterests,
		getAllPersonalityInterests,
		selectAndUpdateAccount,
		updateAccountStatus,
		getAccounts,
		listAccountsSummary
	}
}

export default useAccount

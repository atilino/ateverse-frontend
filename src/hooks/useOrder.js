import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom";
import orderService from '../services/orders'
import { resultHandler } from "./helpers";
import usePagination from "./usePagination";
import useUser from './useUser';
import { DEFAULT_PAGINATE_LIMIT } from "../constants/orders";

/**
 * 
 * @param {( 'orders' | 'order' | 'direct' )} [service]
 * @param {object} [config]
 */
const useOrder = (service = 'orders', config) => {
	const { currentUser } = useUser()
	const { username } = currentUser()
	const init = {
		userId: username,
		network: 'facebook',
		link: '',
		reactions: 0,
		reactionType: 0,
		comments: 0,
		commentsText: '',
		shares: 0,
		variant: 0,
		publications: '',
		joinGroups: {},
		shareGroups: {},
		commentsText: [],
		priority: false,
		options: {
			link: undefined,
			reactions: 0,
			comments: [],
			shares: 0,
			reactionType: 0,
			publications: [],
			groups: [],
			reports: 0,
			direct: false
		},
		executed: {
			reactions: 0,
			comments: [],
			shares: 0,
			publications: [],
			groups: [],
			reports: 0
		},
		customer: null,
		deliveryAt: new Date(),
		createdAt: new Date(),
		updatedAt: new Date()
	}

	const [orders, setOrders] = useState([])
	const [order, setOrder] = useState(init)
	const [pagination, setPagination] = usePagination({
		page: 1,
		limit: DEFAULT_PAGINATE_LIMIT
	})
	const [search] = useSearchParams()

	useEffect(async () => {
		if (service === 'order') {
			await getOrderById(config.orderId)
		} else if (service === 'orders') {
			await listOrders(pagination.page, pagination.limit)
		}
		else if (service === 'direct') {
			await getDirectOrder()
		}
	}, [])

	/**
	 * 
	 * @param {object} [query]
	 * @param {string} query.link
	 * @param {string} query.network
	 * @param {string} query.customer
	 * @param {number} query.variant
	 * @returns {Promise<Array>}
	 */
	const listOrders = (page, limit, query) => {
		query = {
			link: search.get('link'),
			customer: search.get('customer'),
			network: search.get('network'),
			variant: search.get('variant') ? Number(search.get('variant')) - 1 : null,
			...query
		}
		return orderService
			.listOrders(page, limit, query)
			.then(resultOrders => {
				const { data: { results, ...paginationData } } = resultOrders
				setOrders(results)
				setPagination(paginationData)
			})
	}
	const updateLocalOrder = (orderObject) => {
		setOrder(order => ({ ...order, ...orderObject }))
	}

	const resetLocalOrder = () => setOrder(init)

	const createOrder = (orderObject) => {
		return orderService
			.createOrder(orderObject)
			.then(response => {
				resultHandler(response, result => {
					console.log(result)
					setOrder(result)
				})
			})
	}

	const getOrderById = (orderId) => {
		return orderService
			.getOrderById(orderId)
			.then(response => {
				resultHandler(response, result => setOrder(result))
			})
	}

	const getDirectOrder = () => {
		return orderService
			.listOrders({ direct: true })
			.then(response => {
				resultHandler(response, ([result]) => setOrder({ ...order, ...result }))
				return response.data
			})
	}

	const patchDirectOrder = (id, orderObject) => {
		return orderService
			.patchDirectOrder(id, orderObject)
			.then(response => {
				resultHandler(response, result => setOrder({ ...order, ...result }))
			})
	}

	const completeOrder = (id) => {
		return orderService
			.completeOrder(id)
			.then(resetLocalOrder)
	}

	return {
		listOrders,
		order,
		orders,
		updateLocalOrder,
		resetLocalOrder,
		createOrder,
		getOrderById,
		getDirectOrder,
		patchDirectOrder,
		completeOrder,
		pagination
	}
}

export default useOrder

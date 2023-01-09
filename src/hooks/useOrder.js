import { useState, useEffect } from "react"
import orderService from '../services/orders'
import { filterUndefined } from "../utilities";
import { breakStringToArray } from "../utilities/formaters.utility";
import { resultHandler } from "./helpers";
import useUser from './useUser';

/**
 * 
 * @param {( 'orders' | 'order' | 'direct' )} [service]
 * @param {object} [config]
 */
const useOrder = (service='orders', config) => {
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

	useEffect(async () => {
		if (service === 'order') {
			await getOrderById(config.orderId)
		} else if (service === 'orders') {
			await listOrders()
		}
		else if (service === 'direct') {
			await getDirectOrder()
			await getCustomers()
		}
	}, [])

	/**
	 * 
	 * @param {object} [query]
	 * @param {string} query.link
	 * @returns {Promise<Array>}
	 */
	const listOrders = (query) => {
		return orderService
			.listOrders(query)
			.then(response => {
				resultHandler(response, result => setOrders(result))
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
		completeOrder
	}
}

export default useOrder

import { useState, useEffect } from "react"
import orderService from '../services/orders'
import { filterUndefined } from "../utilities";
import { breakStringToArray } from "../utilities/formaters.utility";
import { resultHandler } from "./helpers";
import useUser from './useUser';

/**
 * 
 * @param {( 'orders' | 'order' )} [service]
 * @param {object} [config]
 */
const useOrder = (service, config) => {
    const { currentUser } = useUser()
    const { username } = currentUser()
    const init = {
        userId: username,
        network: 'facebook',
        link: '',
        reactions: 0,
        type: 0,
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
            reports: 0
        },
        executed: {
            reactions: 0,
            comments: [],
            shares: 0,
            publications: [],
            groups: [],
            reports: 0
        },
        deliveryAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    }

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState(init)

    useEffect(async () => {
        if(service === 'order') {
            await getOrderById(config.orderId)
        }else {
            await listOrders()
        }
    }, [])
    
    const listOrders = () => {
        return orderService
            .getOrders()
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
                resultHandler(response, result => setOrders(orders => [...orders, result]))
            })
    }

    const getOrderById = (orderId) => {
        return orderService
            .getOrderById(orderId)
            .then(response => {
                resultHandler(response, result => setOrder(result))
            })
    }

    return {
        listOrders,
        order,
        orders,
        updateLocalOrder,
        resetLocalOrder,
        createOrder,
        getOrderById
    }
}

export default useOrder

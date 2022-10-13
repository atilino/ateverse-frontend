import { useState, useEffect } from "react"
import orderService from '../services/orders'
import { filterUndefined } from "../utilities";
import { breakStringToArray } from "../utilities/formaters.utility";
import { resultHandler } from "./helpers";
import useUser from './useUser';

const useOrder = () => {
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
        options: {}
    }

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState(init)

    useEffect(() => {
        orderService
            .getOrders()
            .then(response => {
                resultHandler(response, result => setOrders(result))
            })
    }, [])

    const updateLocalOrder = (orderObject) => {
        setOrder(order => ({...order, ...orderObject }))
    }

    const resetLocalOrder = () => setOrder(init)

    const createOrder = (orderObject) => {
        if(typeof orderObject.commentsText === 'string') {
            orderObject.commentsText = breakStringToArray(orderObject.commentsText)
            orderObject.comments = orderObject.commentsText.length
        }
        if(typeof orderObject.publications === 'string') {
            orderObject.publications = breakStringToArray(orderObject.publications)
        }

        return orderService
            .createOrder(orderObject)
            .then(response => {
                resultHandler(response, result => setOrders(orders => [...orders, result]))
            })
    }

    return {
        order,
        orders,
        updateLocalOrder,
        resetLocalOrder,
        createOrder,
    }
}

export default useOrder
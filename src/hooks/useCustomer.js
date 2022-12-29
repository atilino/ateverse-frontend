import { useState, useEffect } from 'react'
import customersService from '../services/customers'
import { resultHandler } from './helpers'

/** @typedef {import('../models/customer.model').Customer} Customer */

const useCustomer = () => {

  /** @type {[Customer[], function]} */
  const [customers, setCustomers] = useState([])

  /** @type {[Customer, function]} */
  const [customer, setCustomer] = useState({ name: '' })


  useEffect(() => {
    listCustomers()
  }, [])

  /**
   * @returns {Promise<Customer[]>}
   */
  const listCustomers = async () => {
    const response = await customersService.listCustomers()
    return resultHandler(response, result => setCustomers(result))
  }

  /**
   * @param {string} id
   * @param {object} customerObject
   */
  const updateCustomer = async (id, customerObject) => {
    await customersService.updateCustomerById(id, customerObject)
    const updatedCustomer = customers.map(item => {
      if (item._id === id)
        return { ...item, ...customerObject }
      return item
    })
    setCustomers(updatedCustomer)
    setCustomer({ ...customer, customerObject })
  }

  /**
   * @param {string} id
   */
  const getCustomer = async (id) => {
    const response = await customersService.getCustomerById(id)
    return resultHandler(response, result => setCustomer(result))
  }


  /**
   * @param {string} name
   */
  const createCustomer = async ({ name }) => {
    if (typeof name !== 'string') {
      throw new Error('Nombre invalido')
    }
    const response = await customersService.createCustomer({ name })
    return resultHandler(response, result => {
      setCustomer(result)
      setCustomers([...customers, result])
    })
  }

  const deleteCustomer = async (id) => {
    await customersService.deleteCustomerById(id)
    const updatedCustomers = customers.filter(item => item._id !== id)
    setCustomers(updatedCustomers)
  }

  const findCustomer = (id) => {
    return setCustomer(customers.filter(item => item._id === id)[0])
  }

  return {
    customer,
    customers,
    getCustomer,
    updateCustomer,
    createCustomer,
    deleteCustomer,
    findCustomer
  }
}

export default useCustomer

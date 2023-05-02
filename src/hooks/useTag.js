import { useState, useEffect } from 'react'
import tagsService from '../services/tags'
import { resultHandler } from './helpers'

/** @typedef {import('../models/tag.model').TagCategory} TagCategory */

const useTag = () => {

  /** @type {[TagCategory[], function]} */
  const [categories, setCategories] = useState([])

  useEffect(() => {
    listCategories()
  }, [])

  /**
   * @returns {Promise<TagCategory[]>}
   */
  const listCategories = async () => {
    const response = await tagsService.listCategories()
    return resultHandler(response, result => setCategories(result))
  }

  return {
    categories,
    listCategories,
  }
}

export default useTag;
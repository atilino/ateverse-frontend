import { useState, useEffect } from 'react'
import tagsService from '../services/tags'
import { resultHandler } from './helpers'

/** @typedef {import('../models/tag.model').TagCategory} TagCategory */

/**
 * @param {( 'tagCategories' | 'tags')} service
 * @param {object} config
 * @param {string} config.categoryId
 */
const useTag = (service='tagCategories', config) => {

  /** @type {[TagCategory[], function]} */
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState({})
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState({})

  useEffect(() => {
    const tagsQuery = {}
    if (config?.categoryId) {
      tagsQuery.categoryId = config.categoryId
    }
    if (service === 'tagCategories') {
      listCategories()
    } else if (service === 'tags') {
      listTags(tagsQuery)
    }
  }, [])

  /**
   * 
   * @param {object} query
   * @param {string} query.categoryId
   * @param {string} query.name
   * @returns {Promise<object[]>}
   */
  const listTags = async (query) => {
    const tags = await tagsService.listTags(query)
    return resultHandler(tags, result => setTags(result))
  }

  const createTag = async (tag) => {
    const response = await tagsService.createTag(tag)
    return resultHandler(response, result => setTags([...tags, result]))
  }

  const updateTag = async (id, tag) => {
    const response = await tagsService.updateTag(id, tag)
    return resultHandler(response, result => {
      const index = tags.findIndex(item => item._id === result._id)
      const newTags = [...tags]
      newTags[index] = result
      setTags(newTags)
    })
  }

  const deleteTag = async (id) => {
    const response = await tagsService.deleteTag(id)
    return resultHandler(response, result => setTags(tags.filter(item => item._id !== id)))
  }

  const findTag = (id) => {
    return setTag(tags.filter(item => item._id === id)[0])
  }

  /**
   * @returns {Promise<TagCategory[]>}
   */
  const listCategories = async () => {
    const response = await tagsService.listCategories()
    return resultHandler(response, result => setCategories(result))
  }

  const createCategory = async (category) => {
    const response = await tagsService.createCategory(category)
    return resultHandler(response, result => setCategories([...categories, result]))
  }

  const updateCategory = async (categoryId, category) => {
    const response = await tagsService.updateCategory(categoryId, category)
    return resultHandler(response, result => {
      const index = categories.findIndex(item => item._id === result._id)
      const newCategories = [...categories]
      newCategories[index] = result
      setCategories(newCategories)
    })
  }

  const deleteCategory = async (id) => {
    const response = await tagsService.deleteCategory(id)
    return resultHandler(response, result => setCategories(categories.filter(item => item._id !== id)))
  }

  const findCategory = (id) => {
    return setCategory(categories.filter(item => item._id === id)[0])
  }

  return {
    tag,
    tags,
    findTag,
    listTags,
    createTag,
    updateTag,
    deleteTag,
    category,
    categories,
    listCategories,
    findCategory,
    createCategory,
    updateCategory,
    deleteCategory
  }
}

export default useTag;
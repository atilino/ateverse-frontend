import { useState, useEffect } from 'react'
import tagsService from '../services/tags'
import { resultHandler } from './helpers'

/** @typedef {import('../models/tag.model').TagCategory} TagCategory */

/**
 * @param {( 'tagCategories' | 'tags' | 'tagCategoriesGroup' | 'tagsGroup')} service
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
    if (service === 'tagCategoriesGroup') {
      listCategoriesGroup()
    } else if (service === 'tagsGroup') {
      listTagsGroup(tagsQuery)
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

  //GROUPS
  /**
   * 
   * @param {object} query
   * @param {string} query.categoryId
   * @param {string} query.name
   * @returns {Promise<object[]>}
   */
  const listTagsGroup = async (query) => {
    const tags = await tagsService.listTagsGroup(query)
    return resultHandler(tags, result => setTags(result.filter(item => item.categoryId !== null)))
  }

  const createTagGroup = async (tag) => {
    const response = await tagsService.createTagGroup(tag)
    return resultHandler(response, result => setTags([...tags, result]))
  }

  const updateTagGroup = async (id, tag) => {
    const response = await tagsService.updateTagGroup(id, tag)
    return resultHandler(response, result => {
      const index = tags.findIndex(item => item._id === result._id)
      const newTags = [...tags]
      newTags[index] = result
      setTags(newTags)
    })
  }

  const deleteTagGroup = async (id) => {
    const response = await tagsService.deleteTagGroup(id)
    return resultHandler(response, result => setTags(tags.filter(item => item._id !== id)))
  }

  /**
   * @returns {Promise<TagCategory[]>}
   */
  const listCategoriesGroup = async () => {
    const response = await tagsService.listCategoriesGroup()
    return resultHandler(response, result => setCategories(result))
  }

  const createCategoryGroup = async (category) => {
    const response = await tagsService.createCategoryGroup(category)
    return resultHandler(response, result => setCategories([...categories, result]))
  }

  const updateCategoryGroup = async (categoryId, category) => {
    const response = await tagsService.updateCategoryGroup(categoryId, category)
    return resultHandler(response, result => {
      const index = categories.findIndex(item => item._id === result._id)
      const newCategories = [...categories]
      newCategories[index] = result
      setCategories(newCategories)
    })
  }

  const deleteCategoryGroup = async (id) => {
    const response = await tagsService.deleteCategoryGroup(id)
    return resultHandler(response, result => setCategories(categories.filter(item => item._id !== id)))
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
    deleteCategory,
    //GROUPS
    listTagsGroup,
    createTagGroup,
    updateTagGroup,
    deleteTagGroup,
    listCategoriesGroup,
    createCategoryGroup,
    updateCategoryGroup,
    deleteCategoryGroup,
  }
}

export default useTag;
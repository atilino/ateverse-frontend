import axios from 'axios'
import config from '../config'
import resolver from './resolver'
import { currentUser } from '../libs/userInfo'

const headerConfig = {
    headers: {}
}
const listCategories = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/tags/categories', headerConfig))
}

const createCategory = async (category) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/tags/categories', category, headerConfig))
}

const updateCategory = async (categoryId, category) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + '/tags/categories/' + categoryId, category, headerConfig))
}

const deleteCategory = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + '/tags/categories/' + id, headerConfig))
}

const listTags = async (query={}) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    let params = ''
    if (query.categoryId) params += '?categoryId=' + query.categoryId
    if (query.name) params += '?name=' + query.name
    return await resolver(axios.get(config.BACKEND_URL + '/tags' + params, headerConfig))
}

const createTag = async (tag) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/tags', tag, headerConfig))
}

const updateTag = async (id, tag) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + '/tags/' + id, tag, headerConfig))
}

const deleteTag = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + '/tags/' + id, headerConfig))
}

const listCategoriesGroup = async () => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.get(config.BACKEND_URL + '/tags/categories/group', headerConfig))
}

const createCategoryGroup = async (category) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/tags/categories/group', category, headerConfig))
}

const updateCategoryGroup = async (categoryId, category) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + '/tags/categories/group/' + categoryId, category, headerConfig))
}

const deleteCategoryGroup = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + '/tags/categories/group/' + id, headerConfig))
}

const listTagsGroup = async (query={}) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    let params = ''
    if (query.categoryId) params += '?categoryId=' + query.categoryId
    if (query.name) params += '?name=' + query.name
    return await resolver(axios.get(config.BACKEND_URL + '/tags/group' + params, headerConfig))
}

const createTagGroup = async (tag) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.post(config.BACKEND_URL + '/tags/group', tag, headerConfig))
}

const updateTagGroup = async (id, tag) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.put(config.BACKEND_URL + '/tags/group/' + id, tag, headerConfig))
}

const deleteTagGroup = async (id) => {
    const { token } = currentUser()
    headerConfig.headers['x-access-token'] = token
    return await resolver(axios.delete(config.BACKEND_URL + '/tags/group/' + id, headerConfig))
}

export default {
    listCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    listTags,
    createTag,
    updateTag,
    deleteTag,
    listCategoriesGroup,
    createCategoryGroup,
    updateCategoryGroup,
    deleteCategoryGroup,
    listTagsGroup,
    createTagGroup,
    updateTagGroup,
    deleteTagGroup,
}
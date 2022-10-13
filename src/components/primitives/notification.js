import { notification } from "antd"

const loadingError = (error) => {
    return notification.error({ message: 'Error al cargar datos', description: error})
}
const deleteError = (error) => {
    return notification.error({ message: 'Error al eliminar elemento', description: error})
}
const updateError = (error) => {
    return notification.error({ message: 'Error al actualizar elemento', description: error})
}

const createError = (error) => {
    return notification.error({ message: 'Error al crear elemento', description: error})
}

const updateSuccess = () => {
    return notification.success({ message: 'Actualizado con exito'})
}

const createSuccess = () => {
    return notification.success({ message: 'Creado con exito'})
}

const success = (message) => {
    return notification.success({ message: message})
}

const loginError = () => {
    return notification.error({ message: "Usuario y/o contraseña invalidos"})
}

const error = (message, error) =>{
    return notification.error({ message: message, description: error })
}
export default { loadingError, deleteError, success, updateError, updateSuccess, createError, createSuccess, loginError, error }
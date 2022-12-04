//@ts-check
'use strict'

/**
 * @param {string} error
 * @returns {string}
 */
export const getError = (error) => {
  const errorMessage = {
    'Image not found': 'Imagen no encontrada',
    'Unkown': 'Se produjo un error desconocido'
  }
  return errorMessage[error]
}
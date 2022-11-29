/**
 * @param {string} string 
 * @returns {string}
 */
const capitalize = (string) => {
  return string
    .split('')
    .map((char, i) => i === 0? char.toUpperCase() : char)
    .join('')
}

/**
 * @param {string} string 
 * @returns {string}
 */
const dotBreak = (string) => {
  return string.substring(0, 81) + '...'
}

export default {
  capitalize,
  dotBreak
}
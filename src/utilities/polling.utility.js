/**
 * @param {number} interval Seconds
 * @param {Promise<Function>} callback
 * @param {any} args
 */
export default (interval, callback) => {
  function start(...args) {
    return setTimeout(async () => {
      await callback(...args)
    }, interval * 1000)
  }
  return {
    start
  }
}
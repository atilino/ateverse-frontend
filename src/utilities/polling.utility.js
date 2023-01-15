/**
 * @param {number} interval Seconds
 * @param {Promise<Function>} callback
 */
export default (interval, callback) => {
  let intervalId = null
  let started = false

  function start() {
    if(intervalId !== null) stop()
    intervalId = setTimeout(async () => {
      await callback()
    }, interval * 1000)
  }

  function stop() {
    clearTimeout(intervalId)
    interval = null
  }
  return {
    start,
    stop
  }
}
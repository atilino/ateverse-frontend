/**
 * 
 * @param {number} interval Seconds
 * @param {*} callback
 */
export default (interval, callback) => {
  let intervalId

  function start() {
    intervalId = setInterval(async () => {
      await callback()
    }, interval * 1000)
  }

  function stop() {
    clearInterval(intervalId)
  }
  return {
    start,
    stop
  }
}
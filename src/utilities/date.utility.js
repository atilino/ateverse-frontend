/**
 * 
 * @param {( string | Date | number)} date - Date to apply offset
 * @param {number} offset - Offset time in ms
 * @returns {Date}
 */
const offset = (date, offset) => {
  const d = new Date(date)
  return new Date(d.setMilliseconds(d.getMilliseconds() + offset))
}

const YESTERDAY = 24
const yesterday = () => {
  return new Date(offset(Date.now(), -hoursToMillis(YESTERDAY)))
}

const secondsToMillis = (seconds) => seconds * 1000

const minutesToMillis = (minutes) => secondsToMillis(minutes * 60)

const hoursToMillis = (hours) => minutesToMillis(hours * 60)

const formatHHMMSS = (date) => {
  const d = new Date(date)
  const hours = formatTime(d.getHours())
  const minutes = formatTime(d.getMinutes())
  const seconds = formatTime(d.getSeconds())
  
  if (hours < 12) {
    const formated = `${hours}:${minutes}:${seconds}`
    return formated + ' AM'
  }else {
    const formated = `${formatTime(hours - 12)}:${minutes}:${seconds}`
    return formated + ' PM'
  }
}

const formatTime = (time) => time < 10 ? '0' + time : String(time)


export default {
  offset,
  yesterday,
  secondsToMillis,
  minutesToMillis,
  hoursToMillis,
  formatHHMMSS
}
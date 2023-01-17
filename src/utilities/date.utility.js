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

const yesterday = () => {
  return new Date(offset(today(), -hoursToMillis(24)))
}

const secondsToMillis = (seconds) => seconds * 1000

const minutesToMillis = (minutes) => secondsToMillis(minutes * 60)

const hoursToMillis = (hours) => minutesToMillis(hours * 60)

const formatHHMMSS = (date) => {
  const d = new Date(date)
  const hours = formatTime(d.getHours())
  const minutes = formatTime(d.getMinutes())
  const seconds = formatTime(d.getSeconds())

  if (Number(hours) < 12) {
    const formated = `${hours}:${minutes}:${seconds}`
    return formated + ' AM'
  } else if (Number(hours) === 12) {
    const formated = `${hours}:${minutes}:${seconds}`
    return formated + ' PM'
  } else {
    const formated = `${formatTime(hours - 12)}:${minutes}:${seconds}`
    return formated + ' PM'
  }
}

const formatHHMM = (date) => {
  const d = new Date(date)
  const hours = formatTime(d.getHours())
  const minutes = formatTime(d.getMinutes())

  if (Number(hours) < 12) {
    const formated = `${hours}:${minutes}`
    return formated + ' AM'
  } else if (Number(hours) === 12) {
    const formated = `${hours}:${minutes}`
    return formated + ' PM'
  } else {
    const formated = `${formatTime(hours - 12)}:${minutes}`
    return formated + ' PM'
  }
}

const formatDDMMYYYY = (date) => {
  const convertedDate = new Date(date).toLocaleDateString()
  return convertedDate.split('/').map(segment => {
    if (segment < 10) {
      return '0' + segment
    }
    return segment
  }).join('/')
}

const formatTime = (time) => time < 10 ? '0' + time : String(time)

/**
 * @param {( number | Date | string)} date
 * @return {boolean}
 */
const isTomorrow = (date) => {
  const d = new Date(date)
  const today = new Date()
  return d.getDate() === today.getDate() + 1
}

/**
 * @param {( number | Date | string)} date
 * @return {boolean}
 */
const isToday = (date) => {
  const d = new Date(date)
  const today = new Date()
  return d.getDate() === today.getDate()
}

/**
 * @param {( number | Date | string)} date
 * @return {boolean}
 */
 const isYesterday = (date) => {
  const d = new Date(date)
  const today = new Date()
  return d.getDate() === today.getDate() -1
}

const formatDDMMYYYYHHMM = (date) => {
  return `${formatDDMMYYYY(date)} ${formatHHMM(date)} `
}

const today = () => {
  const date = new Date()
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

export default {
  offset,
  yesterday,
  today,
  secondsToMillis,
  minutesToMillis,
  hoursToMillis,
  formatHHMMSS,
  formatHHMM,
  formatDDMMYYYY,
  formatDDMMYYYYHHMM,
  isTomorrow,
  isToday,
  isYesterday,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  HOUR: 60 * 60 * 1000,
  MINUTE: 60 * 1000,
}
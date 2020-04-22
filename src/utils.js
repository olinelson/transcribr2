import moment from 'moment'

import { isBrowser } from './services/auth'

export const formatTimeStamp = string => {
  const seconds = parseInt(string.replace('s', ''))

  return moment
    .utc(moment.duration(seconds, 'seconds').asMilliseconds())
    .format('H:m:s')
}

export const sortClipsChronologically = (a, b) => {
  return b.dateCreated - a.dateCreated
}

export function findIndexOfWord (obj, arr) {
  let i = 0
  for (const o of arr) {
    if (o._id === obj._id) return i
    i++
  }
  return -1
}

export const getBrowserName = () => {
  let name = 'Unknown'
  if (isBrowser() && navigator.userAgent.indexOf('MSIE') != -1) {
    name = 'MSIE'
  } else if (navigator.userAgent.indexOf('Firefox') != -1) {
    name = 'Firefox'
  } else if (navigator.userAgent.indexOf('Opera') != -1) {
    name = 'Opera'
  } else if (navigator.userAgent.indexOf('Chrome') != -1) {
    name = 'Chrome'
  } else if (navigator.userAgent.indexOf('Safari') != -1) {
    name = 'Safari'
  } else if (navigator.userAgent.indexOf('Edge') != -1) {
    name = 'Edge'
  }
  return name
}

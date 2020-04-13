import moment from 'moment'

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

import moment from "moment"
import React from "react"

import { isBrowser } from "./services/auth"

export const formatTimeStamp = string => {
  let seconds = parseInt(string.replace("s", ""))

  return moment
    .utc(moment.duration(seconds, "seconds").asMilliseconds())
    .format("H:m:s")
}

export const sortClipsChronologically = (a, b) => {
  return parseInt(a.dateCreated) - parseInt(b.dateCreated)
}

export const useStateWithLocalStorageJSON = (localStorageKey, defaultState) => {
  const [value, setValue] = React.useState(
    isBrowser()
      ? JSON.parse(window.localStorage.getItem(localStorageKey)) || defaultState
      : defaultState
  )

  React.useEffect(() => {
    if (isBrowser()) {
      try {
        window.localStorage.setItem(localStorageKey, JSON.stringify(value))
      } catch (error) {
        console.error(error)
      }
    }
  }, [value])
  return [value, setValue]
}

export function findIndexOfWord(obj, arr) {
  let i = 0
  for (let o of arr) {
    if (o._id === obj._id) return i
    i++
  }
  return -1
}

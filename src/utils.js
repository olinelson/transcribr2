import moment from "moment"
import React from "react"

export const formatTimeStamp = string => {
  let seconds = parseInt(string.replace("s", ""))

  return moment
    .utc(moment.duration(seconds, "seconds").asMilliseconds())
    .format("H:m:s")
}

export const sortClipsChronologically = (a, b) => {
  let comparison = 0
  if (a.dateCreated - b.dateCreated) {
    comparison = 1
  } else if (a.dateCreated < b.dateCreated) {
    comparison = -1
  }
  return comparison
}

export const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ""
  )
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value)
  }, [value])
  return [value, setValue]
}
export const useStateWithLocalStorageJSON = (localStorageKey, defaultState) => {
  const [value, setValue] = React.useState(
    JSON.parse(localStorage.getItem(localStorageKey)) || defaultState
  )
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

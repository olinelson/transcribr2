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

export const useStateWithLocalStorageJSON = (
  localStorageKey,
  defaultState,
  window
) => {
  const [value, setValue] = React.useState(
    JSON.parse(window.localStorage.getItem(localStorageKey)) || {}
  )
  React.useEffect(() => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(value))
  }, [value])
  return [value, setValue]
}

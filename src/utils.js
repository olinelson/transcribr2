import moment from "moment"

export const formatTimeStamp = string => {
  let seconds = parseInt(string.replace("s", ""))
  let mo = moment.duration(seconds, "seconds")
  let hrs = Math.round(mo.asHours())
  let mins = Math.round(mo.asMinutes())
  let secs = Math.round(mo.asSeconds())

  return `${hrs}:${mins}:${secs}`
}

export const sortClipsChronologically = (a, b) => {
  let comparison = 0
  if (a.dateCreated > b.dateCreated) {
    comparison = 1
  } else if (a.dateCreated < b.dateCreated) {
    comparison = -1
  }
  return comparison
}

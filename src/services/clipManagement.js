import { API_URL } from "../config"
import { navigate } from "gatsby"
import { getUser } from "./auth"
import { openNotificationWithIcon } from "../components/Notifications"

export const deleteClip = async clipId => {
  console.log("deleting clip", clipId)
  try {
    let res = await fetch(API_URL + "/clips/" + clipId, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    console.log(res)
    if (!res.ok) throw new Error("Something went wrong")
    res = await res.json() // parses JSON response into native JavaScript objects
    // navigate("/app/profile")
    openNotificationWithIcon("warning", `Successfully deleted "${res.name}"`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

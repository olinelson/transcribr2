import { API_URL } from "../config"
import { getUser } from "./auth"

export const getUserProfile = async setUserProfile => {
  try {
    let res = await fetch(API_URL + "/users/me", {
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

    res = await res.json() // parses JSON response into native JavaScript objects
    return setUserProfile(res)
  } catch (error) {
    console.log(error)
    return false
  }
}

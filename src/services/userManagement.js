import { API_URL } from "../config"
import { getToken } from "./auth"
import { navigate } from "gatsby"
import { openNotificationWithIcon } from "../components/Notifications"

export const getUserProfileAndSet = async (appState, setAppState) => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    if (!res.ok) throw new Error("Can't find user")

    res = await res.json() // parses JSON response into native JavaScript objects
    const user = res.user
    const clips = res.clips
    // if (oldUserProfile.email !== res.user.email) {
    //   openNotificationWithIcon("success", "Email updated!")
    // }

    return setAppState({ ...appState, clips, user })
  } catch (error) {
    // window.localStorage.clear()
    // navigate("/app/login")
    console.log(error)
    return false
  }
}

export const getUserProfile = async () => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateUser = async user => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(user),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

export const changeEmail = async unconfirmedEmail => {
  try {
    let res = await fetch(API_URL + "/users/change_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({ unconfirmedEmail }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    if (!res.ok) throw new Error("something went wrong")

    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const deleteUser = async () => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.log(error)
    return false
  }
}

// changes
//
// minor

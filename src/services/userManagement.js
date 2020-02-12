import { API_URL } from "../config"
import { getUser } from "./auth"
import { navigate } from "gatsby"

export const getUserProfileAndSet = async setUserProfile => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    if (!res.ok) throw new Error("Can't find user")

    res = await res.json() // parses JSON response into native JavaScript objects
    return setUserProfile(res)
  } catch (error) {
    window.localStorage.clear()
    navigate("/app/login")
    console.log(error)
    return false
  }
}

export const getUserProfile = async setUserProfile => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
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
        Authorization: getUser(),
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
export const deleteUser = async () => {
  try {
    let res = await fetch(API_URL + "/users/me", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
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

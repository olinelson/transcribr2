import { API_URL } from "../config"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : null

const setUserAndToken = res => {
  window.localStorage.setItem("token", "Bearer " + res.token)
  // window.localStorage.setItem("user", JSON.stringify(res.user))
}

export const handleLogin = async ({ email, password }) => {
  try {
    let res = await fetch(API_URL + "/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    await setUserAndToken(res)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const handleSignup = async ({ name, email, password }) => {
  try {
    let res = await fetch(API_URL + "/users", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
    })
    if (!res.ok) return false
    res = await res.json() // parses JSON response into native JavaScript objects

    await setUserAndToken(res)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const isLoggedIn = () => {
  const token = getUser()

  return !!token
}

export const logout = callback => {
  window.localStorage.clear()
}

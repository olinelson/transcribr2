import { API_URL } from "../config"

export const isBrowser = () => typeof window !== "undefined"

export const getToken = () =>
  isBrowser() && window.localStorage.getItem("token")
    ? window.localStorage.getItem("token")
    : null
export const getUser = () => {
  if (isBrowser() && window.localStorage.getItem("user")) {
    const user = JSON.parse(window.localStorage.getItem("user"))
    console.log(user)
    return user
  }
  return null
}

const setUserAndToken = res => {
  window.localStorage.setItem("token", "Bearer " + res.token)
  const user = res.user
  user.clips = res.clips
  window.localStorage.setItem("user", JSON.stringify(res.user))
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
export const handleForgotPassword = async ({ email }) => {
  try {
    let res = await fetch(API_URL + "/users/forgot", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ email }), // body data type must match "Content-Type" header
    })
    if (!res.ok) return false
    // res = await res.json() // parses JSON response into native JavaScript objects

    // await setUserAndToken(res)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}
export const handleResetPassword = async ({ password, token }) => {
  try {
    let res = await fetch(API_URL + "/users/reset_password", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ token, password }), // body data type must match "Content-Type" header
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
  const token = getToken()

  return !!token
}

export const logout = callback => {
  window.localStorage.clear()
}

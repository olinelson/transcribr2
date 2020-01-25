import { API_URL } from "../config"

export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("authToken")
    ? window.localStorage.getItem("authToken")
    : null

const setAuthToken = token =>
  window.localStorage.setItem("authToken", "Bearer " + token)

export const handleLogin = async ({ email, password }) => {
  try {
    let res = await fetch(API_URL + "/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
      body: JSON.stringify({ email, password }), // body data type must match "Content-Type" header
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    console.log(res)
    await setAuthToken(res.token)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const isLoggedIn = () => {
  const token = getUser()
  console.log("is logged in?", !!token)

  return !!token
}

export const logout = callback => {
  window.localStorage.clear()
  callback()
}

// ++++++++++++++++++++++++++++++++++++++++

// const setUser = user =>
//   window.localStorage.setItem("gatsbyUser", JSON.stringify(user))

// export const handleLogin = ({ username, password }) => {
//   if (username === `john` && password === `pass`) {
//     return setUser({
//       username: `john`,
//       name: `Johnny`,
//       email: `johnny@example.org`,
//     })
//   }

//   return false
// }

// export const isLoggedIn = () => {
//   const user = getUser()

//   return !!user.username
// }

// export const logout = callback => {
//   setUser({})
//   callback()
// }

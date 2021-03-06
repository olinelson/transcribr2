import { API_URL } from '../config'
import { navigate } from 'gatsby'
import { openNotificationWithIcon } from '../components/Notifications'

export const isBrowser = () => typeof window !== 'undefined'

export const getToken = () =>
  isBrowser() && window.localStorage.getItem('token')
    ? window.localStorage.getItem('token')
    : null

export const getUser = () => {
  if (isBrowser() && window.localStorage.getItem('appState')) {
    const appState = JSON.parse(window.localStorage.getItem('appState'))

    return appState.user
  }
  return null
}

const setUserAndToken = res => {
  window.localStorage.setItem('token', 'Bearer ' + res.token)

  // window.localStorage.setItem(
  //   'appState',
  //   JSON.stringify({ user: res.user, clips: res.clips })
  // )
}

export const handleLogin = async ({ email, password }) => {
  try {
    let res = await fetch(API_URL + '/users/login', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ email, password }) // body data type must match "Content-Type" header
    })
    switch (res.status) {
      case 200:
        res = await res.json()
        await setUserAndToken(res)
        return true

      default:
        openNotificationWithIcon('error', 'Sorry, wrong email or password')
        return false
    }
  } catch (error) {
    console.error(error)
    openNotificationWithIcon('error', 'Sorry, can\'t reach the server')
    return false
  }
}
export const handleSignup = async ({ name, email, password }) => {
  try {
    let res = await fetch(API_URL + '/users', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ name, email, password }) // body data type must match "Content-Type" header
    })
    switch (res.status) {
      case 201:
        res = await res.json()
        await setUserAndToken(res)
        return true

      case 406:
        openNotificationWithIcon('error', 'Sorry, that email is already in use')
        return false
      default:
        openNotificationWithIcon('error', 'Sorry, something went wrong')
        return false
    }
  } catch (error) {
    console.error(error)
    openNotificationWithIcon('error', 'Sorry, can\'t reach the server')
    return false
  }
}
export const handleForgotPassword = async ({ email }) => {
  try {
    const res = await fetch(API_URL + '/users/forgot', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ email }) // body data type must match "Content-Type" header
    })
    if (!res.ok) return false
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export const handleResetPassword = async ({ password, token }) => {
  try {
    let res = await fetch(API_URL + '/users/reset_password', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify({ token, password }) // body data type must match "Content-Type" header
    })
    if (!res.ok) return false
    res = await res.json() // parses JSON response into native JavaScript objects

    await setUserAndToken(res)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const isLoggedIn = () => {
  const token = getToken()

  return !!token
}

export const logout = callback => {
  window.localStorage.clear()

  if ('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.controller.postMessage('clearCache')
    } catch (error) {
      console.error(error)
    }
  }

  navigate('/login')
}

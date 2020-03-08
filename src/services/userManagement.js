import { API_URL } from '../config'
import { getToken } from './auth'
import { openNotificationWithIcon } from '../components/Notifications'
import { navigate } from 'gatsby'

export const getUserProfileAndSet = async (appState, setAppState) => {
  try {
    let res = await fetch(API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('Can\'t find user')

    res = await res.json() // parses JSON response into native JavaScript objects
    const user = res.user
    const clips = res.clips

    const oldEmail = appState.user.email
    const newEmail = res.user.email
    if (oldEmail.length && oldEmail !== newEmail) {
      openNotificationWithIcon('success', 'Email updated!')
    }

    return setAppState({
      ...appState,
      clips,
      user,
      // uploadDrawerOpen: false,
      // searchClipDrawerOpen: false,
      // editUserDrawerOpen: false,
      // editClipDrawerOpen: false,
      // editWordDrawerOpen: false,
      // editEmailDrawerOpen: false,
      youtubeUploading: false,
      uploadYoutubeDrawerOpen: false
    })
  } catch (error) {
    console.error(error)
    window.localStorage.clear()
    navigate('/login')
    return false
  }
}

export const getUserProfile = async () => {
  try {
    let res = await fetch(API_URL + '/users/me', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateUser = async user => {
  try {
    let res = await fetch(API_URL + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify(user),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.error(error)
    return false
  }
}

export const changeEmail = async unconfirmedEmail => {
  try {
    const res = await fetch(API_URL + '/users/change_email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({ unconfirmedEmail }),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('something went wrong')

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const deleteUser = async () => {
  try {
    let res = await fetch(API_URL + '/users/me', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects
    return res
  } catch (error) {
    console.error(error)
    return false
  }
}

export const attachPaymentMethodToCustomer = async paymentMethod => {
  try {
    const res = await fetch(API_URL + '/users/me/attach_payment_method', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify(paymentMethod),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('something went wrong')

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export const getUserPaymentMethods = async () => {
  try {
    const res = await fetch(API_URL + '/users/me/payment_methods', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('something went wrong')
    const paymentMethods = await res.json()

    return paymentMethods
  } catch (error) {
    console.error(error)
    return false
  }
}
export const deletePaymentMethod = async (paymentMethodId) => {
  try {
    const res = await fetch(API_URL + `/users/me/payment_methods/${paymentMethodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('something went wrong')

    return true
  } catch (error) {
    console.error(error)
    return false
  }
}
export const getUsage = async () => {
  try {
    const res = await fetch(API_URL + '/users/me/usage', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('something went wrong')
    const usage = await res.json()
    return usage.data
  } catch (error) {
    console.error(error)
    return false
  }
}

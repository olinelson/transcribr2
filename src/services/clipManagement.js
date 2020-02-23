import { API_URL } from '../config'
import { getToken } from './auth'
import { openNotificationWithIcon } from '../components/Notifications'

export const deleteClip = async clipId => {
  try {
    let res = await fetch(API_URL + '/clips/' + clipId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    if (!res.ok) throw new Error('Something went wrong')
    res = await res.json() // parses JSON response into native JavaScript objects
    openNotificationWithIcon('warning', `Successfully deleted "${res.name}"`)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const updateClip = async (clip, appState, setAppState, setClip) => {
  setClip({ ...clip, clipSaving: true })

  try {
    let res = await fetch(API_URL + '/clips/' + clip._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({ name: clip.name, citation: clip.citation }),
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects

    openNotificationWithIcon('success', 'Changes saved')
    const filteredClips = appState.clips.filter(c => c._id !== clip._id)
    setClip({ ...clip, clipSaving: false })
    setAppState({ ...appState, clips: [...filteredClips, res] })
  } catch (error) {
    console.error(error)
    setClip({ ...clip, saving: false, editClipDrawerOpen: false })
  }
}

export const getClip = async (_id, clip, setClip) => {
  try {
    let res = await fetch(API_URL + '/clips/' + _id, {
      mode: 'cors', // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer' // no-referrer, *client
    })
    res = await res.json()
    setClip({
      currentPageIndex: 0,
      currentPageSize: 200,
      ...res,
      loading: false
    })

    return res
  } catch (error) {
    console.error(error)
  }
}

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

export const getClip = async (_id, clip, setClip, signal) => {
  try {
    let res = await fetch(API_URL + '/clips/' + _id, {
      signal,
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
export const convertClip = async (clip, minutes, setClip) => {
  setClip({ ...clip, transcribeModalOpen: false })
  try {
    let res = await fetch(
      `${API_URL}/convert/clips/${clip._id}?lang=${clip.language}&duration=${minutes}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
      }
    )
    switch (res.status) {
      case 201:
        res = await res.json()

        openNotificationWithIcon('success', 'Transcription Started!')
        setClip(res.clip)
        break

      case 402:
        openNotificationWithIcon('warning', 'Not enough free minutes remaining. Add your card details to continue!')
        setClip({
          ...clip,
          transcriptionLoading: false,
          transcribeModalOpen: false
        })
        break

      default:
        openNotificationWithIcon(
          'error',
          'Something went wrong, please try again.'
        )
        setClip({
          ...clip,
          transcriptionLoading: false,
          transcribeModalOpen: false
        })
    }
  } catch (error) {
    openNotificationWithIcon(
      'error',
      'Something went wrong, please try again.'
    )
    console.error(error)
    setClip({
      ...clip,
      transcriptionLoading: false,
      transcribeModalOpen: false
    })
  }
}

export const uploadYoutube = async ({ appState, setAppState, url, setLoading }) => {
  try {
    setAppState({ ...appState, youtubeUploading: true, uploadYoutubeDrawerOpen: false })
    const res = await fetch(API_URL + '/youtube', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getToken()
      },
      body: JSON.stringify({
        url
      })
    })
    if (!res.ok) throw new Error(res.error)
    openNotificationWithIcon('success', 'Youtube download started!')
  } catch (error) {
    openNotificationWithIcon('error', 'Coudn\'t create clip, please try again')
    setAppState({ ...appState, uploadYoutubeDrawerOpen: true, youtubeUploading: false })
  }
}

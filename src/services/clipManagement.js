import { API_URL } from "../config"
import { getToken } from "./auth"
import { openNotificationWithIcon } from "../components/Notifications"
import { splitWordsIntoPages } from "../services/wordManagement"

export const deleteClip = async clipId => {
  try {
    let res = await fetch(API_URL + "/clips/" + clipId, {
      method: "DELETE",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    if (!res.ok) throw new Error("Something went wrong")
    res = await res.json() // parses JSON response into native JavaScript objects
    // navigate("/app/profile")
    openNotificationWithIcon("warning", `Successfully deleted "${res.name}"`)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const updateClip = async (clip, appState, setAppState, setClip) => {
  setClip({ ...clip, clipSaving: true })

  try {
    let res = await fetch(API_URL + "/clips/" + clip._id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify({ name: clip.name, citation: clip.citation }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects

    openNotificationWithIcon("success", `Changes saved`)
    let filteredClips = appState.clips.filter(c => c._id !== clip._id)
    setClip({ ...clip, clipSaving: false })
    setAppState({ ...appState, clips: [...filteredClips, res] })
  } catch (error) {
    console.log(error)
    setClip({ ...clip, saving: false, editClipDrawerOpen: false })
  }
}

export const getClip = async (_id, clip, setClip) => {
  try {
    let res = await fetch(API_URL + "/clips/" + _id, {
      mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    // if (!res.ok) throw new Error("Something went wrong")
    res = await res.json()
    setClip({
      currentPageIndex: 0,
      currentPageSize: 200,
      ...res,
      loading: false,
    })
    console.log(res) // parses JSON response into native JavaScript objects
    return res
    // const wordPages = splitWordsIntoPages(res.words, 200)
    // setClip({
    //   ...res,
    //   saving: false,
    //   editing: false,
    //   currentPageIndex: 0,
    //   selectedWord: undefined,
    //   inserting: null,
    //   wordPageSize: 200,
    //   wordPages: splitWordsIntoPages(res.words, 200),
    //   words: res.words,
    //   editing: false,
    //   loading: false,
    //   citing: false,
    // })
  } catch (error) {
    console.log(error)
  }
}

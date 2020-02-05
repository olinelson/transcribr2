import { API_URL } from "../config"
import { openNotificationWithIcon } from "../components/Notifications"
import { getUser } from "../services/auth"

export const handleEditWord = async (
  e,
  wordData,
  setWordData,
  clip,
  updateClipInProfile
) => {
  e.preventDefault()
  let newWordValue = e.target.newWordValue.value
  let clipId = clip._id
  let wordId = wordData.selectedWord._id

  setWordData({
    ...wordData,
    loading: true,
  })
  try {
    let res = await fetch(API_URL + "/words", {
      method: "PATCH",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, wordId, newWordValue }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects

    updateClipInProfile(res)
    openNotificationWithIcon("success", `Changes saved`)
  } catch (error) {
    console.log(error)
    setWordData({
      ...wordData,
      loading: false,
    })
  }
}

export const insertWord = async (
  e,
  wordData,
  setWordData,
  clip,
  updateClipInProfile,
  newWord,
  index
) => {
  // e.preventDefault()
  let clipId = clip._id

  setWordData({
    ...wordData,
    loading: true,
  })
  try {
    let res = await fetch(API_URL + "/words", {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, index, newWord }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects
    updateClipInProfile(res.clip)
    openNotificationWithIcon("success", `Word Created`)
  } catch (error) {
    console.log(error)
    setWordData({
      ...wordData,
      loading: false,
    })
  }
}

export const deleteWord = async (
  e,
  wordData,
  setWordData,
  clip,
  updateClipInProfile,
  index
) => {
  let clipId = clip._id
  setWordData({
    ...wordData,
    loading: true,
  })
  try {
    let res = await fetch(API_URL + "/words", {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, index }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects
    console.log(res)
    updateClipInProfile(res)
    openNotificationWithIcon("success", `Word Created`)
  } catch (error) {
    console.log(error)
    setWordData({
      ...wordData,
      loading: false,
    })
  }
}

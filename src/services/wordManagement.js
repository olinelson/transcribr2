import { API_URL } from "../config"
import { openNotificationWithIcon } from "../components/Notifications"
import { getUser } from "../services/auth"

export const editWord = async ({ wordData, newWordValue, clip, setClip }) => {
  // e.preventDefault()
  // let newWordValue = e.target.newWordValue.value
  let clipId = clip._id
  let wordId = wordData.selectedWord._id

  // setWordData({
  //   ...wordData,
  //   loading: true,
  // })
  try {
    let res = await fetch(API_URL + "/words", {
      method: "PATCH",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, wordId, newWordValue }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })

    res = await res.json() // parses JSON response into native JavaScript objects

    let newWords = [...clip.words]
    let index = newWords.indexOf(wordData.selectedWord)
    newWords.splice(index, 1, res)

    setClip({
      ...clip,
      words: newWords,
    })
    openNotificationWithIcon("success", `Changes saved`)
  } catch (error) {
    console.log(error)
    openNotificationWithIcon("error", `Something went wrong :(`)
    setClip({ ...clip })
  }
}

export const insertWord = async ({ index, setClip, clip, newWord }) => {
  let clipId = clip._id
  try {
    let res = await fetch(API_URL + "/words", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, index, newWord }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects
    let newWords = [...clip.words]
    newWords.splice(index, 0, res)

    setClip({
      ...clip,
      words: newWords,
      editing: false,
      inserting: null,
      loading: false,
    })
    openNotificationWithIcon("success", `Word Created`)
  } catch (error) {
    console.log(error)
    setClip({ ...clip })
  }
}

export const deleteWord = async ({
  clip,
  setClip,
  updateClipInProfile,
  index,
}) => {
  let clipId = clip._id
  try {
    let res = await fetch(API_URL + "/words", {
      method: "DELETE",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ clipId, index }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    res = await res.json() // parses JSON response into native JavaScript objects

    let newWords = [...clip.words]
    newWords.splice(index, 1)

    updateClipInProfile({ ...clip, words: newWords })
    setClip({ ...clip, words: newWords })
    openNotificationWithIcon("success", `Word Deleted`)
  } catch (error) {
    console.log(error)
    setClip({ ...clip })
  }
}

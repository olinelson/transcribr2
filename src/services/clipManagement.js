import { API_URL } from "../config"
import { getUser } from "./auth"
import { openNotificationWithIcon } from "../components/Notifications"

export const deleteClip = async clipId => {
  try {
    let res = await fetch(API_URL + "/clips/" + clipId, {
      method: "DELETE",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
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

export const updateClip = async (
  clip,
  setClipSaving,
  setEditDrawOpen,
  updateClipInProfile
) => {
  setClipSaving(true)
  try {
    let res = await fetch(API_URL + "/clips/" + clip._id, {
      method: "PATCH",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        Authorization: getUser(),
      },
      body: JSON.stringify({ name: clip.name }),
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *client
    })
    // if (!res.ok) throw new Error("Something went wrong")
    res = await res.json() // parses JSON response into native JavaScript objects

    setEditDrawOpen(false)
    openNotificationWithIcon("success", `Changes saved`)
    updateClipInProfile(res)
  } catch (error) {
    console.log(error)
  }
  setClipSaving(false)
}

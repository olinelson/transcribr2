import React, { useState, useEffect } from "react"
import WithLocation from "./WithLocation"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

function Clip(props) {
  const clipId = props.search.id || undefined

  const [clip, setClip] = useState(null)

  console.log(clip)

  const getClip = async () => {
    try {
      let res = await fetch(API_URL + "/clips/" + clipId, {
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

      return setClip(res)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const convertClip = async () => {
    try {
      let res = await fetch(API_URL + "/convert/clips/" + clipId, {
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
      console.log(res)
      //   return setClip(res)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  useEffect(() => {
    getClip()
  }, [])

  const showClipAudio = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <audio
        controls
        src={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
      ></audio>
    )
  }

  console.log(props)
  return (
    <div>
      <h1> showing clip {props.search.id}</h1>
      {clip ? <h1>{clip.name}</h1> : null}
      {showClipAudio()}
      <button onClick={() => convertClip()}> Convert </button>
    </div>
  )
}

export default WithLocation(Clip)

import React, { useState, useEffect, useRef } from "react"
import WithLocation from "./WithLocation"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

import { Redirect, navigate } from "gatsby"

import ReactPlayer from "react-player"
import { openNotificationWithIcon } from "./Notifications"

function Clip(props) {
  const clipId = props.search.id || undefined

  const [clip, setClip] = useState(null)
  const player = useRef(null)

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
  const deleteClip = async () => {
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
      console.log(res)
      if (!res.ok) throw new Error("Something went wrong")
      res = await res.json() // parses JSON response into native JavaScript objects
      navigate("/app/profile")
      openNotificationWithIcon("warning", `Successfully deleted "${res.name}"`)
      return
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
  const transcribeClip = async () => {
    try {
      let res = await fetch(API_URL + "/transcribe/clips/" + clipId, {
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
      <ReactPlayer
        ref={player}
        url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
        playing
        controls
      />
      // <audio
      //   controls
      //   src={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
      // ></audio>
    )
  }

  console.log("player ref hello", player)

  const getWords = () => {
    if (!clip || !clip.results) return []

    let alternatives = clip.results.map(r => {
      return r.alternatives[0]
    })

    let words = alternatives.map(a => a.words)

    return words.flat()
  }

  console.log("words", getWords())

  console.log(props)
  return (
    <div>
      <h1> showing clip {props.search.id}</h1>
      {clip ? <h1>{clip.name}</h1> : null}
      {showClipAudio()}
      <button onClick={() => convertClip()}> Convert </button>
      <button onClick={() => transcribeClip()}> Transcribe </button>
      <button onClick={() => deleteClip()}> Delete </button>

      {/* <button onClick={() => player.current.seekTo(2)}>
        {" "}
        go to 2 seconds{" "}
      </button> */}

      {getWords().map(w => (
        <span key={w._id}>
          <button
            onClick={() =>
              player.current.seekTo(parseInt(w.startTime.replace("s", "")))
            }
          >
            {" "}
            {w.word}{" "}
          </button>
        </span>
      ))}
    </div>
  )
}

export default WithLocation(Clip)

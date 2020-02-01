import React, { useState, useEffect, useRef } from "react"
import WithLocation from "./WithLocation"
import { getUser } from "../services/auth"
import { API_URL } from "../config"

import { navigate } from "gatsby"

import { deleteClip } from "../services/clipManagement"

import { Popover, Icon, Tag, Switch, Button, Popconfirm } from "antd"

import ReactPlayer from "react-player"

function Clip(props) {
  const [clip, setClip] = useState(props.clip)
  const [sticky, setSticky] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [transcribing, setTranscribing] = useState(false)
  const player = useRef(null)

  // useEffect(() => {
  //   const getClip = async () => {
  //     try {
  //       let res = await fetch(API_URL + "/clips/" + clipId, {
  //         mode: "cors", // no-cors, *cors, same-origin
  //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //         credentials: "same-origin", // include, *same-origin, omit
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: getUser(),
  //         },
  //         redirect: "follow", // manual, *follow, error
  //         referrerPolicy: "no-referrer", // no-referrer, *client
  //       })
  //       if (!res.ok) throw new Error("Something went wrong")
  //       res = await res.json() // parses JSON response into native JavaScript objects

  //       return setClip(res)
  //     } catch (error) {
  //       console.log(error)
  //       return false
  //     }
  //   }
  //   getClip()
  // }, [clipId])

  const deleteClipHandler = async clipId => {
    setDeleting(true)
    let success = await deleteClip(clipId)
    if (success) {
      props.removeClipFromSideBar()
      props.setView({ route: "/user" })
      // navigate("/app/profile")
    } else {
      setDeleting(false)
    }
  }

  const convertClip = async () => {
    setTranscribing(true)
    try {
      let res = await fetch(API_URL + "/convert/clips/" + clip.clipId, {
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

  const showClipAudio = () => {
    if (!clip || !clip.rawFileName) return null

    return (
      <ReactPlayer
        ref={player}
        url={`https://storage.googleapis.com/${clip.owner}/${clip.rawFileName}`}
        playing
        controls
        width="100%"
        height="auto"
        style={{
          position: sticky ? "sticky" : "static",
          top: 0,
          // right: "1rem",
          maxWidth: "50rem",
          margin: "auto",
          zIndex: 3,
        }}
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
    <>
      {showClipAudio()}
      <div style={{ maxWidth: "50rem", margin: "auto" }}>
        {clip ? <h1>{clip.name}</h1> : null}
        {/* <button onClick={() => convertClip()}> Convert </button> */}
        <Popconfirm
          title="Transcribe this clip?"
          onConfirm={() => convertClip()}
          // onCancel={cancel}

          okText="Yes"
          cancelText="No"
        >
          <Button loading={transcribing} type="primary">
            <Icon type="file-word" />
            Transcribe
          </Button>
        </Popconfirm>
        {/* <button onClick={() => deleteClip()}> Delete </button> */}
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => deleteClipHandler(clip._id)}
          // onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <Button type="danger" loading={deleting}>
            <Icon type="delete" />
            Delete
          </Button>
        </Popconfirm>
        ,
        <Switch
          onChange={() => setSticky(!sticky)}
          checkedChildren="Sticky"
          unCheckedChildren="Fixed"
        />
        {/* <button onClick={() => player.current.seekTo(2)}>
        {" "}
        go to 2 seconds{" "}
      </button> */}
        <p>
          {getWords().map(w => (
            <Popover
              key={w._id}
              content={
                <div>
                  <Tag>{w.startTime}</Tag>
                  <Icon
                    type="login"
                    onClick={() =>
                      player.current.seekTo(
                        parseInt(w.startTime.replace("s", ""))
                      )
                    }
                  />
                </div>
              }
            >
              <span> {" " + w.word + " "}</span>
            </Popover>
            // <span key={w._id}>
            //   <span
            // onClick={() =>
            //   player.current.seekTo(parseInt(w.startTime.replace("s", "")))
            // }
            //   >
            //     {" "}
            //     {w.word}{" "}
            //   </span>
            // </span>
          ))}
        </p>
      </div>
    </>
  )
}

export default Clip

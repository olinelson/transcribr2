import React, { useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"

function AddClip(props) {
  const [audioFile, setAudioFile] = useState(null)
  const [name, setName] = useState("")

  const createClip = async e => {
    e.preventDefault()

    // return
    try {
      let data = new FormData()
      data.append("audioFile", audioFile)
      data.append("name", name)

      let res = await fetch(API_URL + "/clips", {
        method: "POST",
        mode: "cors", // no-cors, *cors, same-origin
        // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          Authorization: getUser(),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
        body: data,
      })
      if (!res.ok) throw new Error(res.error)
      res = await res.json()

      const clip = res // parses JSON response into native JavaScript objects
      props.addClip(clip)
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return (
    <form onSubmit={e => createClip(e)}>
      <input
        type="file"
        name="audioFile"
        onChange={e => setAudioFile(e.target.files[0])}
      />
      <input type="text" name="name" onChange={e => setName(e.target.value)} />
      <button type="submit"> Create </button>
    </form>
  )
}

export default AddClip

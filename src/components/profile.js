import React, { useEffect, useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"
import AddClip from "./AddClip"
import { Link } from "gatsby"

function Profile() {
  const [userProfile, setUserProfile] = useState({})

  const getUserProfile = async () => {
    try {
      let res = await fetch(API_URL + "/users/me", {
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

      res = await res.json() // parses JSON response into native JavaScript objects
      console.log(res)
      return setUserProfile(res)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const addClip = clip => {
    console.log("addingClip", clip)
    setUserProfile({ ...userProfile, clips: [...clips, clip] })
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const { user, clips } = userProfile || null

  const showUserDetails = () => {
    if (!user) return null
    return (
      <>
        <h4>{user.email}</h4>
      </>
    )
  }

  const showUserClips = () => {
    if (!clips || !clips.length) return <p>no clips yet...</p>
    return (
      <>
        {clips.map(c => (
          <Link key={c._id} to={`/app/clip?id=${c._id}`}>
            {c.name}
          </Link>
        ))}
      </>
    )
  }

  return (
    <>
      {showUserDetails()}
      {showUserClips()}
      <AddClip addClip={clip => addClip(clip)} />
    </>
  )
}

export default Profile

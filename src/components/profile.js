import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import WithLocation from "./WithLocation"
import UserDetails from "./UserDetails"

import UploadClip from "./UploadClip"

import { Drawer } from "antd"

import { getUserProfileAndSet } from "../services/userManagement"
import Clip from "./Clip"

import queryString from "query-string"
import SideBar from "./SideBar"
import ProfileSkeleton from "./ProfileSkeleton"
import { ProfileContainer } from "./MyStyledComponents"
import { openNotificationWithIcon } from "./Notifications"
import { getUser } from "../services/auth"
import openSocket from "socket.io-client"
import { API_URL } from "../config"

// import { joinUserChannel, leaveUserChannel } from "../services/socket"

function Profile(props) {
  const [uploadDrawOpen, setUploadDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userProfile, setUserProfile] = useState({ clips: [] })

  const PageLocation = props.location.search
    ? queryString.parse(props.location.search)
    : null

  // const bearerToken = getUser()

  const mounted = useRef()

  // function joinUserChannel(token, cb) {
  //   socket.on("notification", notification => cb(notification))
  //   socket.emit("joinUserChannel", token)
  // }
  // function leaveUserChannel(token, cb) {
  //   // socket.on("notification", notification => cb(notification))
  //   socket.emit("leaveUserChannel", token)
  // }
  const bearerToken = getUser()

  let socket

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true

      socket = openSocket(API_URL)

      function joinUserChannel(token, cb) {
        socket.on("notification", notification => cb(notification))
        socket.emit("joinUserChannel", token)
      }

      joinUserChannel(getUser(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(setUserProfile)
    }

    return function leaveUserChannel(token, cb) {
      console.log("leaving")
      // socket.on("notification", notification => cb(notification))
      socket.emit("leaveUserChannel", getUser())
    }
  }, [socket])

  const notificationHandler = notification => {
    openNotificationWithIcon("success", notification.message)
  }

  const addClip = clip => {
    setUserProfile({ ...userProfile, clips: [...userProfile.clips, clip] })
  }

  const updateClipInProfile = clip => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clip._id)
    setUserProfile({ ...userProfile, clips: [...filteredClips, clip] })
  }

  const removeClipFromSideBar = async clipId => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clipId)
    setUserProfile({ ...userProfile, clips: filteredClips })
  }

  const viewRouter = () => {
    if (!PageLocation || !PageLocation.view)
      return <UserDetails user={userProfile.user} />

    switch (PageLocation.view) {
      case "clip":
        let clip = userProfile.clips.find(c => c._id === PageLocation.id)
        if (!clip) return <h1>Not found</h1>
        return (
          <Clip
            removeClipFromSideBar={() => removeClipFromSideBar(clip._id)}
            key={clip._id}
            clip={clip}
            updateClipInProfile={e => updateClipInProfile(e)}
          />
        )
      default:
        navigate("/404")
    }
  }

  return (
    <ProfileContainer>
      {!userProfile.user ? (
        <ProfileSkeleton />
      ) : (
        <>
          <SideBar
            setUploadDrawerOpen={setUploadDrawerOpen}
            clips={userProfile.clips}
            uploading={uploading}
            location={props.location}
          />
          <div style={{ gridArea: "main" }}>{viewRouter()}</div>
          <Drawer
            title="Upload Clip"
            placement="right"
            closable={true}
            onClose={() => setUploadDrawerOpen(false)}
            visible={uploadDrawOpen}
            width="auto"
          >
            <UploadClip setUploading={e => setUploading(e)} addClip={addClip} />
          </Drawer>
        </>
      )}
    </ProfileContainer>
  )
}

export default WithLocation(Profile)

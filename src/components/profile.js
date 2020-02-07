import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import WithLocation from "./WithLocation"
import UserDetails from "./UserDetails"

import UploadClip from "./UploadClip"

import { Drawer, Menu, Affix } from "antd"

import { joinUserChannel } from "../services/socket"

import {
  getUserProfile,
  getUserProfileAndSet,
} from "../services/userManagement"
import Clip from "./Clip"

import queryString from "query-string"
import SideBar from "./SideBar"
import ProfileSkeleton from "./ProfileSkeleton"
import { ProfileContainer } from "./MyStyledComponents"
import { openNotificationWithIcon } from "./Notifications"
import { getUser } from "../services/auth"

function Profile(props) {
  const [uploadDrawOpen, setUploadDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userProfile, setUserProfile] = useState({ clips: [] })
  // const [clips, setClips] = useState([])
  console.log(userProfile.clips)

  const PageLocation = props.location.search
    ? queryString.parse(props.location.search)
    : null

  const bearerToken = getUser()

  useEffect(() => {
    getUserProfileAndSet(setUserProfile)

    joinUserChannel(bearerToken, notification =>
      notificationHandler(notification)
    )
  }, [])

  const notificationHandler = notification => {
    if (notification.name === "transcriptionComplete") {
      console.log("trans complete", notification)
      openNotificationWithIcon("success", notification.message)
      getUserProfileAndSet(setUserProfile)
      // updateClipInProfile(notification.data.clip)

      // if (location)
    }
    if (notification.name === "joinedUser") {
      openNotificationWithIcon("success", notification.message)
    }
  }

  const addClip = clip => {
    setUserProfile({ ...userProfile, clips: [...userProfile.clips, clip] })
  }

  const updateClipInProfile = clip => {
    console.log("user profile", userProfile)
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clip._id)
    // setClips(filteredClips)
    console.log(filteredClips)
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

  const closeUploadDrawHandler = () => {
    setUploadDrawerOpen(false)
  }

  return (
    <ProfileContainer>
      {!userProfile.user ? (
        <ProfileSkeleton />
      ) : (
        <>
          {/* <Affix offsetTop={16}> */}
          <SideBar
            style={{ gridArea: "sidebar" }}
            setUploadDrawerOpen={setUploadDrawerOpen}
            clips={userProfile.clips}
            uploading={uploading}
            location={props.location}
          />
          {/* </Affix> */}
          <div style={{ gridArea: "main" }}>{viewRouter()}</div>
          <Drawer
            title="Upload Clip"
            placement="right"
            closable={true}
            onClose={() => closeUploadDrawHandler()}
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
import React, { useEffect, useState, useRef } from "react"
import { navigate } from "gatsby"
import WithLocation from "./WithLocation"
import UserDetails from "./UserDetails"
import Layout from "./layout"
import UploadClip from "./UploadClip"

import { Drawer, Menu } from "antd"

import { getUserProfileAndSet } from "../services/userManagement"
import Clip from "./Clip"
import {
  sortClipsChronologically,
  useStateWithLocalStorageJSON,
} from "../utils"
import queryString from "query-string"
import SideBar from "./SideBar"
import ProfileSkeleton from "./ProfileSkeleton"
import { openNotificationWithIcon } from "./Notifications"
import { getToken } from "../services/auth"
import openSocket from "socket.io-client"
import { API_URL } from "../config"

function Profile(props) {
  const PageLocation = props.location.search
    ? queryString.parse(props.location.search)
    : null

  const [uploadDrawOpen, setUploadDrawerOpen] = useState(false)
  const [clipDrawerOpen, setClipDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [userProfile, setUserProfile] = useStateWithLocalStorageJSON(
    "user",
    {},
    window
  )

  const mounted = useRef()

  const bearerToken = getToken()

  const socket = openSocket(API_URL)

  useEffect(() => {
    function joinUserChannel(bearerToken, cb) {
      socket.on("notification", notification => cb(notification))
      socket.emit("joinUserChannel", bearerToken)
    }

    // first load
    if (!mounted.current) {
      mounted.current = true
      joinUserChannel(getToken(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(setUserProfile)
    }
    // cleanup
    return function leaveUserChannel() {
      socket.emit("leaveUserChannel", bearerToken)
    }
  }, [])

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
      return (
        <UserDetails
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          user={userProfile}
        />
      )

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
      case "upload":
        return (
          <UploadClip
            style={{
              gridArea: "main",
            }}
            setUploading={e => setUploading(e)}
            addClip={addClip}
          />
        )
      default:
        navigate("/404")
    }
  }

  return (
    <Layout
      uploadDrawOpen={uploadDrawOpen}
      setUploadDrawerOpen={setUploadDrawerOpen}
      uploading={uploading}
      userProfile={userProfile}
    >
      {!userProfile ? (
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

          <Drawer
            width={"auto"}
            placement="right"
            title="Clips"
            height="auto"
            onClose={() => setClipDrawerOpen(false)}
            visible={clipDrawerOpen}
          >
            <Menu
              style={{
                maxWidth: "85vw",
                maxHeight: "70vh",
                borderRight: "none",
                // display: "flex",
                overflow: "scroll",
                webkitOverflowScrolling: "touch",
                flexDirection: "column",
              }}
            >
              {userProfile.clips.sort(sortClipsChronologically).map(c => (
                <Menu.Item
                  onClick={() => {
                    navigate(`app/profile?view=clip&id=${c._id}`)
                    setClipDrawerOpen(false)
                  }}
                  key={c._id}
                >
                  <span>{c.name}</span>
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </>
      )}
    </Layout>
  )
}

export default WithLocation(Profile)

import React, { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"
import { Router } from "@reach/router"
import { navigate } from "gatsby"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/Login"
import Clip from "../components/Clip"
import Clips from "../components/Clips"
import SignUpForm from "../components/SignUpForm"
import ForgotPassowordForm from "../components/ForgotPasswordForm"
import ResetPasswordForm from "../components/ResetPasswordForm"
import ChangeEmailForm from "../components/ChangeEmailForm"
import { openNotificationWithIcon } from "../components/Notifications"
import { getUserProfileAndSet } from "../services/userManagement"
import { getToken } from "../services/auth"
import openSocket from "socket.io-client"
import { API_URL } from "../config"
import WithLocation from "../components/WithLocation"
import { isLoggedIn } from "../services/auth"
import { Drawer, Menu } from "antd"
import UploadClip from "../components/UploadClip"
import {
  sortClipsChronologically,
  useStateWithLocalStorageJSON,
} from "../utils"
import SideBar from "../components/SideBar"
import UserDetails from "../components/UserDetails"

// I think I should push more logic here...
function App(props) {
  const [userProfile, setUserProfile] = useStateWithLocalStorageJSON(
    "user",
    {},
    window
  )
  const [uploadDrawerOpen, setUploadDrawerOpen] = useState(false)
  const [clipDrawerOpen, setClipDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)

  const mounted = useRef()

  const bearerToken = getToken()

  const socket = openSocket(API_URL)

  useEffect(() => {
    function joinUserChannel(bearerToken, cb) {
      if (isLoggedIn()) {
        socket.on("notification", notification => cb(notification))
        socket.emit("joinUserChannel", bearerToken)
      }
    }

    // first load
    if (!mounted.current) {
      mounted.current = true
      joinUserChannel(getToken(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(userProfile, setUserProfile)
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

  const removeClipFromSideBar = async clipId => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clipId)
    setUserProfile({ ...userProfile, clips: filteredClips })
  }

  const updateClipInProfile = clip => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clip._id)
    setUserProfile({ ...userProfile, clips: [...filteredClips, clip] })
  }

  return (
    <Layout
      {...props}
      location={props.location}
      setUploadDrawerOpen={setUploadDrawerOpen}
      uploadDrawerOpen={uploadDrawerOpen}
      userProfile={userProfile}
      setUserProfile={setUserProfile}
    >
      <div style={{ gridArea: "sidebar" }}>
        <Router primary={false}>
          <PrivateRoute
            component={SideBar}
            path="/app/*"
            setUploadDrawerOpen={setUploadDrawerOpen}
            userProfile={userProfile}
            uploading={uploading}
            location={props.location}
          />
        </Router>
      </div>

      <div style={{ gridArea: "main" }}>
        <Router>
          <PrivateRoute
            component={UserDetails}
            path="/app"
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            user={userProfile}
          />
          <PrivateRoute
            path="/app/clips/:clipId"
            component={Clip}
            removeClipFromSideBar={e => removeClipFromSideBar(e)}
            updateClipInProfile={e => updateClipInProfile(e)}
          />
          <PrivateRoute
            path="/app/upload"
            component={UploadClip}
            setUploading={e => setUploading(e)}
            addClip={addClip}
          />

          <PrivateRoute
            path="/app/clips"
            component={Clips}
            userProfile={userProfile}
          />

          <Login path="/app/login" />
          <SignUpForm path="/app/signup" />
          <ForgotPassowordForm path="/app/forgot" />
          <ResetPasswordForm path="/app/reset_password" />
          <ChangeEmailForm path="/app/change_email" />
        </Router>
      </div>

      <Drawer
        title="Upload Clip"
        placement="right"
        closable={true}
        onClose={() => setUploadDrawerOpen(false)}
        visible={uploadDrawerOpen}
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
            overflow: "scroll",
            webkitOverflowScrolling: "touch",
            flexDirection: "column",
          }}
        >
          {userProfile.clips
            ? userProfile.clips.sort(sortClipsChronologically).map(c => (
                <Menu.Item
                  onClick={() => {
                    navigate(`app/profile?view=clip&id=${c._id}`)
                    setClipDrawerOpen(false)
                  }}
                  key={c._id}
                >
                  <span>{c.name}</span>
                </Menu.Item>
              ))
            : null}
        </Menu>
      </Drawer>
    </Layout>
  )
}

export default WithLocation(App)

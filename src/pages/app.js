import React, { useEffect, useRef } from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/Login"
import Clip from "../components/Clip"
import SignUpForm from "../components/SignUpForm"
import ForgotPassowordForm from "../components/ForgotPasswordForm"
import ResetPasswordForm from "../components/ResetPasswordForm"
import ChangeEmailForm from "../components/ChangeEmailForm"
import { openNotificationWithIcon } from "../components/Notifications"
import { getUserProfileAndSet } from "../services/userManagement"
import { getToken } from "../services/auth"
import openSocket from "socket.io-client"
import { API_URL } from "../config"
import {
  sortClipsChronologically,
  useStateWithLocalStorageJSON,
} from "../utils"

// I think I should push more logic here...
function App() {
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

  return (
    <Router>
      <PrivateRoute
        path="/app"
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        component={Profile}
      />
      <PrivateRoute path="/app/clip" component={Clip} />

      <Login path="/app/login" />
      <SignUpForm path="/app/signup" />
      <ForgotPassowordForm path="/app/forgot" />
      <ResetPasswordForm path="/app/reset_password" />
      <ChangeEmailForm path="/app/change_email" />
    </Router>
  )
}

export default App

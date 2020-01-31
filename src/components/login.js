import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

import NormalLoginForm from "./NormalLoginForm"

import { openNotificationWithIcon } from "./Notifications"

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" })

  const handleUpdate = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const loggedInSuccessfully = await handleLogin(userData)
    if (loggedInSuccessfully) {
      openNotificationWithIcon("success", "Logged In!")
      navigate(`/app/profile`)
    }
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }
  })

  return (
    <>
      <h1>Log in</h1>
      <NormalLoginForm />
    </>
  )
}

export default Login

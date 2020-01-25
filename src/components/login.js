import React, { useState, useEffect } from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"

function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" })

  const handleUpdate = event => {
    setUserData({ ...userData, [event.target.name]: event.target.value })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await handleLogin(userData)
    navigate(`/app/profile`)
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(`/app/profile`)
    }
  })

  return (
    <>
      <h1>Log in</h1>
      <form
        method="post"
        onSubmit={event => {
          handleSubmit(event)
        }}
      >
        <label>
          Email
          <input type="text" name="email" onChange={e => handleUpdate(e)} />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            onChange={e => handleUpdate(e)}
          />
        </label>
        <input type="submit" value="Log In" />
      </form>
    </>
  )
}

export default Login

import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import { join } from "../services/socket"
import { getUser } from "../services/auth"
import { openNotificationWithIcon } from "../components/Notifications"

function SocketTest() {
  const [message, setMessage] = useState("nothing")
  const bearerToken = getUser()

  // useEffect(() => {
  //   join(bearerToken, message => openNotificationWithIcon("success", message))
  // })

  return (
    <Layout>
      <h1>Socket test</h1>
      {/* <h1>{message}</h1> */}
    </Layout>
  )
}

export default SocketTest

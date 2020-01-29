import React from "react"
import { Link, navigate } from "gatsby"
import { getUser, isLoggedIn, logout } from "../services/auth"
import { Layout, NavBar, Breadcrumb, Menu, Button, notification } from "antd"

import { openNotificationWithIcon } from "./Notifications"

export default () => {
  const path = [window.location.pathname]
  console.log(path)

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
      selectedKeys={path}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/app/profile">
        <Link to="/app/profile">Profile</Link>
      </Menu.Item>
      {isLoggedIn() ? (
        <a
          href="/"
          onClick={event => {
            event.preventDefault()
            logout()
            if (!isLoggedIn()) {
              openNotificationWithIcon("success", "Successfully logged out.")
              navigate(`/app/login`)
            }
          }}
        >
          Logout
        </a>
      ) : null}
    </Menu>
    // <div
    //   style={{
    //     display: "flex",
    //     flex: "1",
    //     justifyContent: "space-between",
    //     borderBottom: "1px solid #d1c1e0",
    //   }}
    // >
    //   <span>{content.message}</span>
    //   <nav>
    //     <Link to="/">Home</Link>

    //     <Link to="/app/profile">Profile</Link>
    //     {` `}
    //
    //   </nav>
    // </div>
  )
}

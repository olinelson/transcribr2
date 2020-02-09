import React from "react"
import { Link, navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { openNotificationWithIcon } from "./Notifications"

function Navbar(props) {
  const path = props.location.pathname

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: "64px" }}
      selectedKeys={[path]}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/app/profile">
        <Link to="/app/profile">Profile</Link>
      </Menu.Item>
      {isLoggedIn() ? (
        <Menu.Item
          href="/"
          onClick={() => {
            logout()
            if (!isLoggedIn()) {
              openNotificationWithIcon("success", "Successfully logged out.")
              navigate(`/app/login`)
            }
          }}
        >
          {" "}
          Logout
        </Menu.Item>
      ) : null}
    </Menu>
  )
}

export default WithLocation(Navbar)

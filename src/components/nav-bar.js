import React from "react"
import { Link, navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { openNotificationWithIcon } from "./Notifications"

function Navbar(props) {
  const path = props.location.pathname

  // if (path === "/app/profile") return null

  return (
    <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>

      {isLoggedIn() ? (
        <Menu.Item key="/app/profile">
          <Link to="/app/profile">Profile</Link>
        </Menu.Item>
      ) : null}

      {isLoggedIn() ? (
        <Menu.Item
          onClick={() => {
            logout()
            openNotificationWithIcon("success", "Successfully logged out.")
            navigate(`/app/login`)
          }}
        >
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item
          key="/app/login"
          href="/"
          onClick={() => navigate("/app/login")}
        >
          Login
        </Menu.Item>
      )}
    </Menu>
  )
}

export default WithLocation(Navbar)

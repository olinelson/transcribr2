import React from "react"
import { Link, navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { openNotificationWithIcon } from "./Notifications"

function Navbar(props) {
  const path = props.location.pathname

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px" }}
        selectedKeys={[path]}
      >
        <Menu.Item key="/">
          <Link to="/">Home</Link>
        </Menu.Item>
      </Menu>

      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: "64px", textAlign: "right" }}
        selectedKeys={[path]}
      >
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
    </div>
  )
}

export default WithLocation(Navbar)

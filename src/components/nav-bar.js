import React from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { Icon } from "antd"

import { FixedMenuDiv } from "./MyStyledComponents"

import { openNotificationWithIcon } from "./Notifications"

function Navbar(props) {
  const path = props.location.pathname

  // if (path.includes("app")) return null

  return (
    <FixedMenuDiv>
      <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
        <Menu.Item onClick={() => navigate("/")} key="/">
          <Icon type="home" />
          {/* <span>Home</span> */}
        </Menu.Item>

        {isLoggedIn() ? (
          <Menu.Item
            onClick={() => navigate("/app/profile")}
            key="/app/profile"
          >
            <Icon type="user" />
            {/* <span>Profile</span> */}
          </Menu.Item>
        ) : null}

        {isLoggedIn() ? (
          <Menu.Item
            style={{ position: "absolute", right: "0" }}
            onClick={() => {
              logout()
              openNotificationWithIcon("success", "Successfully logged out.")
              navigate(`/app/login`)
            }}
          >
            <Icon type="logout" />
            {/* Logout */}
          </Menu.Item>
        ) : (
          <Menu.Item
            style={{ position: "absolute", right: "0" }}
            key="/app/login"
            href="/"
            onClick={() => navigate("/app/login")}
          >
            <Icon type="login" />
            {/* Login */}
          </Menu.Item>
        )}
      </Menu>
    </FixedMenuDiv>
  )
}

export default WithLocation(Navbar)

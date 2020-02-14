import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { Icon, Drawer, Affix } from "antd"

import { StyledMenu, FixedMenuDiv, MobileOnlyMenu } from "./MyStyledComponents"

import { openNotificationWithIcon } from "./Notifications"

import { sortClipsChronologically } from "../utils"

const { SubMenu } = Menu
function ProfileMenu(props) {
  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      console.log("handle resize")
      setViewWidth(window.innerWidth)
      // setViewStyle(getViewStyleFromWidth())
    }

    window.addEventListener("resize", handleResize)
  }, [])

  const {
    clips,
    uploading,
    setUploadDrawerOpen,
    location,
    setClipDrawerOpen,
  } = props
  const path = props.location.pathname
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

        {viewWidth < 600 ? (
          <Menu.Item onClick={() => setClipDrawerOpen(true)}>
            <Icon type="audio" />
          </Menu.Item>
        ) : null}

        {viewWidth < 600 ? (
          <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
            {uploading ? (
              <Icon type={"loading"} spin />
            ) : (
              <Icon type="upload" />
            )}
            {/* <span>Add Clip</span> */}
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

        {/* small screen */}
      </Menu>
    </FixedMenuDiv>
  )
}

export default ProfileMenu

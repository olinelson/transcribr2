import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { getToken, getUser } from "../services/auth"
import { sortClipsChronologically } from "../utils"

import { useStateWithLocalStorageJSON } from "../utils"

import { Icon, Drawer } from "antd"

import { FixedMenuDiv } from "./MyStyledComponents"

import { openNotificationWithIcon } from "./Notifications"
import {
  getUserProfile,
  getUserProfileAndSet,
} from "../services/userManagement"
import ClipDrawer from "./ClipDrawer"

function Navbar(props) {
  const path = props.location.pathname
  const [user, setUser] = useStateWithLocalStorageJSON("user", {})
  const [clipDrawerOpen, setClipDrawerOpen] = useState(false)

  console.log(user)

  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      console.log("handle resize")
      setViewWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    // setUser(getUser())
  })

  // if (path.includes("app")) return null

  return (
    <>
      <FixedMenuDiv>
        <Menu theme="dark" mode="horizontal" selectedKeys={[path]}>
          <Menu.Item onClick={() => navigate("/")} key="/">
            <Icon type="home" />
            {/* <span>Home</span> */}
          </Menu.Item>

          <Menu.Item onClick={() => navigate("/about")} key="/about">
            <Icon type="info-circle" />
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

          {isLoggedIn() && viewWidth < 600 ? (
            <Menu.Item onClick={() => setClipDrawerOpen(true)}>
              <Icon type="audio" />
            </Menu.Item>
          ) : null}

          {/* {viewWidth < 600 ? (
          <Menu.Item
          onClick={() => setUploadDrawerOpen(true)}
          >
            {uploading ? (
              <Icon type={"loading"} spin />
            ) : (
              <Icon type="upload" />
            )}
            <span>Add Clip</span>
          </Menu.Item>
        ) : null} */}

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

      <ClipDrawer
        clipDrawerOpen={clipDrawerOpen}
        setClipDrawerOpen={setClipDrawerOpen}
      />
      {/* <Drawer
        width={"auto"}
        placement="right"
        title="Clips"
        height="auto"
        onClose={() => setClipDrawerOpen(false)}
        visible={clipDrawerOpen}
      >
        <Menu
          style={{
            maxWidth: "85vw",
            maxHeight: "70vh",
            borderRight: "none",
            // display: "flex",
            overflow: "scroll",
            webkitOverflowScrolling: "touch",
            flexDirection: "column",
          }}
        >
          {user.clips
            ? user.clips.sort(sortClipsChronologically).map(c => (
                <Menu.Item
                  onClick={() => {
                    navigate(`app/profile?view=clip&id=${c._id}`)
                    setClipDrawerOpen(false)
                  }}
                  key={c._id}
                >
                  <span>{c.name}</span>
                </Menu.Item>
              ))
            : null}
        </Menu>
      </Drawer> */}
    </>
  )
}

export default WithLocation(Navbar)

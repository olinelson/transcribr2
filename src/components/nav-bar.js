import React, { useState, useEffect, useRef } from "react"
import { navigate } from "gatsby"
import { isLoggedIn, logout } from "../services/auth"
import { Menu } from "./MyStyledComponents"
import WithLocation from "./WithLocation"

import { isBrowser } from "../services/auth"

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
import UploadClip from "./UploadClip"
import styled from "styled-components"

function Navbar(props) {
  const { uploadDrawOpen, setUploadDrawerOpen, uploading } = props

  const user = [props.userProfile]

  const path = props.location.pathname
  const [clipDrawerOpen, setClipDrawerOpen] = useState(false)

  const [viewWidth, setViewWidth] = useState(
    isBrowser() ? window.innerWidth : 0
  )

  useEffect(() => {
    function handleResize() {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
  }, [])

  // if (path.includes("app")) return null

  const DynamicMenu = styled(Menu)`
    display: flex;
    justify-content: space-between;
    li i {
      margin: 1rem auto !important;
      font-size: 1.5rem !important;
    }

    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: auto auto auto 1fr;
      justify-content: center;
      justify-items: center;
      ::before {
        display: none;
      }
      li i {
        margin: auto !important;
        font-size: 1rem !important;
      }
    }
  `

  return (
    <>
      <FixedMenuDiv>
        <DynamicMenu theme="dark" mode="horizontal" selectedKeys={[path]}>
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

          {isLoggedIn() && viewWidth < 600 ? (
            <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
              <Icon type="upload" />
            </Menu.Item>
          ) : null}

          {isLoggedIn() ? (
            <Menu.Item
              style={{ justifySelf: "end" }}
              onClick={() => {
                logout()
                openNotificationWithIcon("success", "Successfully logged out.")
                navigate(`/`)
              }}
            >
              <Icon type="logout" />
              {/* Logout */}
            </Menu.Item>
          ) : (
            <Menu.Item
              style={{ justifySelf: "end" }}
              key="/app/login"
              href="/"
              onClick={() => navigate("/app/login")}
            >
              <Icon type="login" />
              {/* Login */}
            </Menu.Item>
          )}
        </DynamicMenu>
      </FixedMenuDiv>

      <ClipDrawer
        clipDrawerOpen={clipDrawerOpen}
        setClipDrawerOpen={setClipDrawerOpen}
      />
    </>
  )
}

export default WithLocation(Navbar)

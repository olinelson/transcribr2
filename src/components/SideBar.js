import React, { useState, useEffect } from "react"

import { Menu, Icon, Drawer, Dropdown, Divider } from "antd"
import queryString from "query-string"
import { navigate } from "gatsby"

import { StyledMenu } from "./MyStyledComponents"
import { sortClipsChronologically } from "../utils"

const { SubMenu } = Menu
function SideBar({ clips, uploading, setUploadDrawerOpen, location }) {
  const PageLocation = location.search
    ? queryString.parse(location.search)
    : null

  const getViewStyleFromWidth = num => {
    if (num > 700) return "desktop"
    if (num > 600) return "tablet"
    return "phone"
  }

  const [viewStyle, setViewStyle] = useState(
    getViewStyleFromWidth(window.innerWidth)
  )
  const [clipDrawerShown, setClipDrawShown] = useState(false)
  const [extraOptionsShown, setExtraOptionsShown] = useState(false)

  useEffect(() => {
    function handleResize() {
      console.log("handle resize")
      setViewStyle(getViewStyleFromWidth(window.innerWidth))
    }

    window.addEventListener("resize", handleResize)
  }, [])

  if (viewStyle === "desktop" || viewStyle === "tablet")
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gridArea: "sidebar",
          marginTop: "4rem",
          maxWidth: "30vw",
        }}
      >
        <Menu
          style={{ width: "100%", height: "auto" }}
          mode="inline"
          selectable={false}
          inlineCollapsed={viewStyle === "tablet" ? true : false}
        >
          <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
            {uploading ? (
              <Icon type={"loading"} spin />
            ) : (
              <Icon type="upload" />
            )}
            <span>Add Clip</span>
          </Menu.Item>
        </Menu>
        <Menu
          inlineCollapsed={viewStyle === "tablet" ? true : false}
          style={{ width: "100%", height: "100%" }}
          mode="inline"
          // defaultOpenKeys={["clip"]}
          selectedKeys={
            PageLocation ? [PageLocation.view, PageLocation.id] : ["user"]
          }
        >
          <Menu.Item key="user" onClick={() => navigate("app/profile")}>
            <Icon type="user" />
            <span>User Profile</span>
          </Menu.Item>

          <SubMenu
            key="clip"
            title={
              <span>
                <Icon type="audio" />
                <span>Clips</span>
              </span>
            }
          >
            {clips.sort(sortClipsChronologically).map(c => (
              <Menu.Item
                onClick={() => navigate(`app/profile?view=clip&id=${c._id}`)}
                key={c._id}
              >
                <span>{c.name}</span>
              </Menu.Item>
            ))}
          </SubMenu>
        </Menu>
      </div>
    )

  return (
    <>
      <StyledMenu
        theme="dark"
        inlineCollapsed={viewStyle === "tablet" ? true : false}
        style={{
          position: "fixed",
          bottom: "0",
          width: "100vw",
          zIndex: 6,
        }}
        mode="horizontal"
        selectedKeys={
          PageLocation ? [PageLocation.view, PageLocation.id] : ["user"]
        }
      >
        <Menu.Item onClick={() => navigate("/")}>
          <Icon type="home" />
        </Menu.Item>
        <Menu.Item key="user" onClick={() => navigate("app/profile")}>
          <Icon type="user" />
        </Menu.Item>

        <Menu.Item onClick={() => setClipDrawShown(true)}>
          <Icon type="audio" />
        </Menu.Item>

        <Menu.Item
          style={{ position: "absolute", right: "0" }}
          onClick={() => setExtraOptionsShown(true)}
        >
          <Icon type="up" />
        </Menu.Item>
      </StyledMenu>
      <Drawer
        placement="bottom"
        title="Clips"
        height="auto"
        onClose={() => setClipDrawShown(false)}
        visible={clipDrawerShown}
      >
        <Menu>
          {clips.sort(sortClipsChronologically).map(c => (
            <Menu.Item
              onClick={() => {
                navigate(`app/profile?view=clip&id=${c._id}`)
                setClipDrawShown(false)
              }}
              key={c._id}
            >
              <span>{c.name}</span>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>

      <Drawer
        placement="bottom"
        height="auto"
        onClose={() => setExtraOptionsShown(false)}
        visible={extraOptionsShown}
        onClick={() => setExtraOptionsShown(false)}
      >
        <Menu selectable={false} mode="vertical">
          <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
            {uploading ? (
              <Icon type={"loading"} spin />
            ) : (
              <Icon type="upload" />
            )}
            <span>Add Clip</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              window.localStorage.clear()
              navigate("/")
            }}
          >
            <Icon type="logout" />
            Logout
          </Menu.Item>
        </Menu>
      </Drawer>
    </>
  )
}

export default SideBar

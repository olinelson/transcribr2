import React, { useState, useEffect } from "react"

import { Menu, Icon, Dropdown, Popconfirm } from "antd"
import queryString from "query-string"
import { navigate } from "gatsby"

import { sortClipsChronologically } from "../utils"

const { SubMenu } = Menu
function SideBar({ clips, uploading, setUploadDrawerOpen, location }) {
  const PageLocation = location.search
    ? queryString.parse(location.search)
    : null

  const [inlineCollapsed, setInlineCollapsed] = useState(
    window.innerWidth < 700 ? true : false
  )

  const getViewStyleFromWidth = num => {
    if (num > 700) return "desktop"
    if (num > 600) return "tablet"
    return "phone"
  }

  const [viewStyle, setViewStyle] = useState(
    getViewStyleFromWidth(window.innerWidth)
  )

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
    <Menu
      theme="dark"
      inlineCollapsed={viewStyle === "tablet" ? true : false}
      mode="inline"
      style={{
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        top: "0",
        width: "100vw",
      }}
      mode="horizontal"
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

      <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
        {uploading ? <Icon type={"loading"} spin /> : <Icon type="upload" />}
        <span>Add Clip</span>
      </Menu.Item>

      <Menu.Item onClick={() => navigate("/")}>
        <Icon type="home" />
        Home
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

      {/* <SubMenu key="more" title={<Icon type="more" />}>
        <Menu.Item onClick={() => navigate("/")}>
          <Icon type="home" />
          Home
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
      </SubMenu> */}
    </Menu>
  )
}

export default SideBar

import React, { useState, useEffect } from "react"

import { Menu, Icon } from "antd"
import queryString from "query-string"
import { navigate } from "gatsby"

import { sortClipsChronologically } from "../utils"
import Sider from "antd/lib/layout/Sider"

const { SubMenu } = Menu
function SideBar({ clips, uploading, setUploadDrawerOpen, location }) {
  const PageLocation = location.search
    ? queryString.parse(location.search)
    : null

  const [inlineCollapsed, setInlineCollapsed] = useState(
    window.innerWidth < 700 ? true : false
  )

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 700 && inlineCollapsed !== true)
        setInlineCollapsed(true)
      if (window.innerWidth > 700 && inlineCollapsed !== false)
        setInlineCollapsed(false)
    }

    window.addEventListener("resize", handleResize)
  }, [])

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Menu
        style={{ width: "100%", height: "auto" }}
        mode="inline"
        selectable={false}
        inlineCollapsed={inlineCollapsed}
      >
        <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
          {uploading ? <Icon type={"loading"} spin /> : <Icon type="upload" />}
          <span>Add Clip</span>
        </Menu.Item>
      </Menu>
      <Menu
        inlineCollapsed={inlineCollapsed}
        style={{ width: "100%", height: "100%" }}
        mode="inline"
        defaultOpenKeys={["clip"]}
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
}

export default SideBar

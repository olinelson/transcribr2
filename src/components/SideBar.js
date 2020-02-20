import React, { useState, useEffect } from "react"

import { Menu, Icon } from "antd"
import queryString from "query-string"
import { navigate } from "gatsby"

import { StyledSideBar } from "./MyStyledComponents"
import { sortClipsChronologically } from "../utils"
import { isLoggedIn } from "../services/auth"

const { SubMenu } = Menu
function SideBar({ userProfile, uploading, setUploadDrawerOpen }) {
  const clips = userProfile.clips || []
  // const PageLocation = location.search
  //   ? queryString.parse(location.search)
  //   : null

  console.log(clips)

  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize() {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener("resize", handleResize)
  }, [])

  if (!isLoggedIn()) return null

  return (
    <StyledSideBar offsetTop={46}>
      <Menu
        mode="inline"
        selectable={false}
        inlineCollapsed={viewWidth < 800 ? true : false}
      >
        <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
          {uploading ? <Icon type={"loading"} spin /> : <Icon type="upload" />}
          <span>Add Clip</span>
        </Menu.Item>
      </Menu>
      <Menu
        inlineCollapsed={viewWidth < 800 ? true : false}
        mode="inline"
        style={{ height: "100%" }}
        // defaultOpenKeys={["clip"]}
        // selectedKeys={
        //   PageLocation ? [PageLocation.view, PageLocation.id] : ["user"]
        // }
      >
        <Menu.Item key="user" onClick={() => navigate("/app")}>
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
          {clips
            .sort((a, b) => a.dateCreated - b.dateCreated)
            .map(c => (
              <Menu.Item
                onClick={() => navigate(`app/clips/${c._id}`)}
                key={c._id}
              >
                <span>{c.name}</span>
              </Menu.Item>
            ))}
        </SubMenu>
      </Menu>
    </StyledSideBar>
  )
}

export default SideBar

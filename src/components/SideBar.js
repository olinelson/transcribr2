import React from "react"

import { Menu, Icon } from "antd"
import queryString from "query-string"
import { navigate } from "gatsby"

import { sortClipsChronologically } from "../utils"

const { SubMenu } = Menu
function SideBar({ clips, uploading, setUploadDrawerOpen, location }) {
  const PageLocation = location.search
    ? queryString.parse(location.search)
    : null

  return (
    <div
      style={{
        height: "100%",
        maxHeight: "90vh",
      }}
    >
      <Menu
        style={{ width: 256, height: "auto" }}
        mode="inline"
        selectable={false}
      >
        <Menu.Item onClick={() => setUploadDrawerOpen(true)}>
          {uploading ? <Icon type={"loading"} spin /> : <Icon type="upload" />}
          Add Clip
        </Menu.Item>
      </Menu>
      <Menu
        style={{ width: 256, height: "100%" }}
        mode="inline"
        defaultOpenKeys={["clip"]}
        selectedKeys={
          PageLocation ? [PageLocation.view, PageLocation.id] : ["user"]
        }
      >
        <Menu.Item key="user" onClick={() => navigate("app/profile")}>
          <Icon type="user" />
          User Profile
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
              {c.name}
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>{" "}
      {/* </Affix> */}
    </div>
  )
}

export default SideBar

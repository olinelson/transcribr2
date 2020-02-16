import React from "react"
import { Drawer, Menu } from "antd"
import { useStateWithLocalStorageJSON } from "../utils"
import { navigate } from "gatsby"
import { sortClipsChronologically } from "../utils"
import { getUser, isLoggedIn } from "../services/auth"

export default function ClipDrawer(props) {
  if (!isLoggedIn()) return null

  return (
    <Drawer
      destroyOnClose
      width={"auto"}
      placement="right"
      title="Clips"
      height="auto"
      onClose={() => props.setClipDrawerOpen(false)}
      visible={props.clipDrawerOpen}
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
        {getUser()
          .clips.sort(sortClipsChronologically)
          .map(c => (
            <Menu.Item
              onClick={() => {
                navigate(`app/profile?view=clip&id=${c._id}`)
                props.setClipDrawerOpen(false)
              }}
              key={c._id}
            >
              <span>{c.name}</span>
            </Menu.Item>
          ))}
      </Menu>
    </Drawer>
  )
}

import React from "react"
import { Drawer, Menu } from "antd"
import { navigate } from "gatsby"
import { sortClipsChronologically } from "../utils"
import { getUser, isLoggedIn } from "../services/auth"

export default function Clips(props) {
  // if (!isLoggedIn()) return null

  // const user = getUser()

  const clips = props.userProfile.clips

  return (
    <Menu
      style={{
        maxWidth: "85vw",
        // maxHeight: "70vh",
        borderRight: "none",
        // display: "flex",
        overflow: "scroll",
        WebkitOverflowScrolling: "touch",
        flexDirection: "column",
      }}
    >
      {clips.length ? (
        clips.sort(sortClipsChronologically).map(c => (
          <Menu.Item
            onClick={() => {
              navigate(`app/profile?view=clip&id=${c._id}`)
              props.setClipDrawerOpen(false)
            }}
            key={c._id}
          >
            <span>{c.name}</span>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item disabled>
          <span>no clips yet...</span>
        </Menu.Item>
      )}
    </Menu>
  )
}

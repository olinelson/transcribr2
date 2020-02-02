import React, { useEffect, useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"
import { Link, navigate } from "gatsby"

import WithLocation from "./WithLocation"

import { deleteClip } from "../services/clipManagement"

import UploadClip from "./UploadClip"

import { Avatar, Divider, Card, Icon } from "./MyStyledComponents"
import { Popconfirm, Modal, Button, Menu, Drawer } from "antd"
import Clip from "./Clip"

const { SubMenu } = Menu

function Profile(props) {
  const [view, setView] = useState({ route: "/user" })
  const [uploadDrawOpen, setUploadDrawOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false)

  const getUserProfile = async () => {
    try {
      let res = await fetch(API_URL + "/users/me", {
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          Authorization: getUser(),
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *client
      })

      res = await res.json() // parses JSON response into native JavaScript objects
      return setUserProfile(res)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const addClip = clip => {
    setUserProfile({ ...userProfile, clips: [...clips, clip] })
  }

  const updateClip = clip => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clip._id)
    setUserProfile({ ...userProfile, clips: [...filteredClips, clip] })
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const sortClipsChronologically = (a, b) => {
    let comparison = 0
    if (a.dateCreated > b.dateCreated) {
      comparison = 1
    } else if (a.dateCreated < b.dateCreated) {
      comparison = -1
    }
    return comparison
  }

  const { user, clips } = userProfile || null

  const showUserDetails = () => {
    if (!user) return null
    return (
      <>
        <div
          style={{
            display: "grid",
            placeItems: "center left",
            justifyContent: "left",
            gridAutoFlow: "column",
            gridGap: "1rem",
          }}
        >
          <Avatar size={64} icon="user" />
          <h4> {user.email}</h4>
        </div>

        <Divider />
      </>
    )
  }

  const removeClipFromSideBar = async clipId => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clipId)
    setUserProfile({ ...userProfile, clips: filteredClips })
  }

  const viewRouter = () => {
    switch (view.route) {
      case "/user":
        return <h1>User Profile</h1>
      case "/upload":
        return <UploadClip addClip={addClip} />
      case "/clip":
        let clip = userProfile.clips.find(c => c._id === view.id)
        if (!clip) return <h1>Not found</h1>
        return (
          <Clip
            removeClipFromSideBar={() => removeClipFromSideBar(clip._id)}
            setView={e => setView(e)}
            key={clip._id}
            clip={clip}
            updateClip={e => updateClip(e)}
          />
        )
      default:
        navigate("/404")
    }
  }

  if (!userProfile || !userProfile.clips) return <h1>loading</h1>

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr" }}>
      <Menu
        style={{ width: 256, height: "100%" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        // theme={this.state.theme}
      >
        <Menu.Item key="1" onClick={() => setView({ route: "/user" })}>
          <Icon type="user" />
          User Profile
        </Menu.Item>
        <Menu.Item key="2" onClick={() => setView({ route: "/upload" })}>
          <Icon type="upload" />
          Add Clip
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="audio" />
              <span>Clips</span>
            </span>
          }
        >
          {clips.sort(sortClipsChronologically).map(c => (
            <Menu.Item
              onClick={() => setView({ route: "/clip", id: c._id })}
              key={c._id}
            >
              {c.name}
            </Menu.Item>
          ))}
          {/* <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item> */}
        </SubMenu>
      </Menu>
      <div>{viewRouter()}</div>
    </div>
  )
}

export default WithLocation(Profile)

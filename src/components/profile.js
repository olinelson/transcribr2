import React, { useEffect, useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"
import { navigate } from "gatsby"
import WithLocation from "./WithLocation"
import UserDetails from "./UserDetails"

import UploadClip from "./UploadClip"

import { Icon } from "./MyStyledComponents"
import { Menu, Drawer } from "antd"
import Clip from "./Clip"

import queryString from "query-string"
const { SubMenu } = Menu

function Profile(props) {
  const [uploadDrawOpen, setUploadDrawOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userProfile, setUserProfile] = useState({})

  const PageLocation = props.location.search
    ? queryString.parse(props.location.search)
    : null

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

  const { clips } = userProfile || null

  const removeClipFromSideBar = async clipId => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clipId)
    setUserProfile({ ...userProfile, clips: filteredClips })
  }

  const viewRouter = () => {
    if (!PageLocation || !PageLocation.view)
      return <UserDetails user={userProfile.user} />

    switch (PageLocation.view) {
      case "clip":
        let clip = userProfile.clips.find(c => c._id === PageLocation.id)
        if (!clip) return <h1>Not found</h1>
        return (
          <Clip
            removeClipFromSideBar={() => removeClipFromSideBar(clip._id)}
            // setView={e => setView(e)}
            key={clip._id}
            clip={clip}
            updateClip={e => updateClip(e)}
          />
        )
      default:
        navigate("/404")
    }
  }

  const closeUploadDrawHandler = () => {
    setUploadDrawOpen(false)
  }

  if (!userProfile || !userProfile.clips) return <h1>loading</h1>

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        gridTemplateRows: "auto, 1fr",
      }}
    >
      <div>
        <Menu style={{ width: 256 }} mode="inline" selectable={false}>
          <Menu.Item onClick={() => setUploadDrawOpen(true)}>
            {uploading ? (
              <Icon type={"loading"} spin />
            ) : (
              <Icon type="upload" />
            )}
            Add Clip
          </Menu.Item>
        </Menu>
        <Menu
          style={{ width: 256, height: "auto" }}
          mode="inline"
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
            {/* <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item> */}
          </SubMenu>
        </Menu>
      </div>
      <div>{viewRouter()}</div>

      <Drawer
        title="Upload Clip"
        placement="right"
        closable={true}
        onClose={() => closeUploadDrawHandler()}
        visible={uploadDrawOpen}
        width="auto"
      >
        <UploadClip setUploading={e => setUploading(e)} addClip={addClip} />
      </Drawer>
    </div>
  )
}

export default WithLocation(Profile)

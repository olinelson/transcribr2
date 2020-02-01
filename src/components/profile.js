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
  const [view, setView] = useState({ name: "profile", id: null })
  const [uploadDrawOpen, setUploadDrawOpen] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editing] = useState(false)

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
      console.log(res)

      res = await res.json() // parses JSON response into native JavaScript objects
      console.log(res)
      return setUserProfile(res)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  const addClip = clip => {
    console.log("addingClip", clip)
    setUserProfile({ ...userProfile, clips: [...clips, clip] })
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  const clipId = props.search.id || undefined

  console.log(clipId)

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
  const deleteClipHandler = async clipId => {
    let success = await deleteClip(clipId)
    if (success) {
      let filteredClips = userProfile.clips.filter(c => c._id !== clipId)

      setUserProfile({ ...userProfile, clips: filteredClips })
    }
  }

  const editClipHandler = async clipId => {
    console.log("editing clip", clipId)
  }

  console.log(clips)

  const showUserClips = () => {
    if (!clips || !clips.length) return <p>no clips yet...</p>
    return (
      <div className="grid-container--fit">
        {clips.map(c => (
          <Card
            key={c._id}
            hoverable
            title={c.name}
            extra={<Link to={`/app/profile?id=${c._id}`}>Open</Link>}
            actions={[
              <div>
                <Icon type="edit" onClick={() => setEditModalOpen(true)} />
                <Modal
                  title="Edit"
                  visible={editModalOpen}
                  onOk={() => editClipHandler(c._id)}
                  confirmLoading={editing}
                  onCancel={() => setEditModalOpen(false)}
                >
                  <p>This is editing the modal</p>
                </Modal>
              </div>,
              <Popconfirm
                title="Are you sure delete this clip?"
                onConfirm={() => deleteClipHandler(c._id)}
                // onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Icon type="delete" />
              </Popconfirm>,
            ]}
          >
            <Card.Meta>
              <Icon type="audio" />
              <Icon type="file-word" />
            </Card.Meta>

            {/* <Link key={c._id} to={`/app/clip?id=${c._id}`}>
              {c.name}
            </Link> */}
            <div>
              <Icon type="audio" />
              <Icon type="file-word" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  // if (props.search.id && userProfile.clips) {
  //   console.log("showing clip")
  //   let clip =
  //     userProfile.clips.find(c => c._id === props.search.id) || undefined

  //   if (!clip) return navigate("/404")

  //   return <Clip clip={clip} />
  //   // if (!clip) navigate("/404")
  // } else {
  //   console.log("showing all clips")
  // }

  // return (
  //   <>
  //     <Button onClick={() => navigate("/app/profile?id=12345")}>test</Button>
  //     {showUserDetails()}
  //     {showUserClips()}
  //     <UploadClip addClip={clip => addClip(clip)}></UploadClip>
  //     {/* <AddClip addClip={clip => addClip(clip)} /> */}
  //   </>
  // )

  const viewRouter = () => {
    if (view.name === "profile") return <h1>Profile</h1>
    else if (view.name === "clip") {
      // let clip = userProfile.clips.find(c => c._id === view.id)
      // if (!clip) return <h1>Not found</h1>
      return <Clip clip={view.clip} />
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
        <Menu.Item key="1">
          <Icon type="user" />
          User Profile
        </Menu.Item>
        <Menu.Item key="2">
          <Button type="primary" onClick={() => setUploadDrawOpen(true)}>
            Open
          </Button>
          <Drawer
            title="Upload Clip"
            placement="right"
            closable={true}
            onClose={() => setUploadDrawOpen(false)}
            visible={uploadDrawOpen}
          >
            <UploadClip />
          </Drawer>
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
          {clips.map(c => (
            <Menu.Item
              onClick={() => setView({ name: "clip", clip: c })}
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

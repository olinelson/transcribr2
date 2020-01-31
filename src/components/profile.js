import React, { useEffect, useState } from "react"
import { API_URL } from "../config"
import { getUser } from "../services/auth"
import { navigate, Link } from "gatsby"

import { deleteClip } from "../services/clipManagement"

import UploadClip from "./UploadClip"

import { Avatar, Divider, Card, Icon } from "./MyStyledComponents"
import { Popconfirm, Modal, Button, ModalText } from "antd"
function Profile() {
  const [userProfile, setUserProfile] = useState({})
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editing, setEditing] = useState(false)

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
            hoverable
            title={c.name}
            // onClick={() => navigate(`/app/clip?id=${c._id}`)}
            extra={<Link to={`/app/clip?id=${c._id}`}>Open</Link>}
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
                  <p>{ModalText}</p>
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

  return (
    <>
      {showUserDetails()}
      {showUserClips()}
      <UploadClip addClip={clip => addClip(clip)}></UploadClip>
      {/* <AddClip addClip={clip => addClip(clip)} /> */}
    </>
  )
}

export default Profile

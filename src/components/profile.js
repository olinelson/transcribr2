import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import WithLocation from "./WithLocation"
import UserDetails from "./UserDetails"

import UploadClip from "./UploadClip"

import { Drawer, Menu } from "antd"

import { getUserProfile } from "../services/userManagement"
import Clip from "./Clip"

import queryString from "query-string"
import SideBar from "./SideBar"
import ProfileSkeleton from "./ProfileSkeleton"

function Profile(props) {
  const [uploadDrawOpen, setUploadDrawerOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [userProfile, setUserProfile] = useState({})
  const { clips = [] } = userProfile
  const PageLocation = props.location.search
    ? queryString.parse(props.location.search)
    : null

  useEffect(() => {
    getUserProfile(setUserProfile)
  }, [])

  const addClip = clip => {
    setUserProfile({ ...userProfile, clips: [...clips, clip] })
  }

  const updateClipInProfile = clip => {
    let filteredClips = { ...userProfile }.clips.filter(c => c._id !== clip._id)
    setUserProfile({ ...userProfile, clips: [...filteredClips, clip] })
  }

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
            key={clip._id}
            clip={clip}
            updateClipInProfile={e => updateClipInProfile(e)}
          />
        )
      default:
        navigate("/404")
    }
  }

  const closeUploadDrawHandler = () => {
    setUploadDrawerOpen(false)
  }

  console.log(userProfile)

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr 1fr",
        gridTemplateRows: "auto, 1fr",
        gridGap: "1rem",
      }}
    >
      {!userProfile.user ? (
        <ProfileSkeleton />
      ) : (
        <>
          <SideBar
            setUploadDrawerOpen={setUploadDrawerOpen}
            clips={clips || []}
            uploading={uploading}
            location={props.location}
          />
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
        </>
      )}
    </div>
  )
}

export default WithLocation(Profile)

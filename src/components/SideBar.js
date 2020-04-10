import React, { useState, useEffect } from 'react'

import {
  AudioOutlined,
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
  YoutubeOutlined
} from '@ant-design/icons'

import { Menu, Input } from 'antd'
import { navigate } from 'gatsby'

import { StyledSideBar } from './MyStyledComponents'

const { Search } = Input

const { SubMenu } = Menu
function SideBar ({ appState, setAppState }) {
  const { clips, uploading, youtubeUploading } = appState
  const [clipFilterText, setClipFilterText] = useState('')

  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize () {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  const sortOrFilterClips = (clips) => {
    if (clipFilterText.length && clipFilterText.length > 0) {
      return clips.filter(c => c.name.toLowerCase().includes(clipFilterText.toLowerCase()))
    } else {
      return clips.sort((a, b) => b.dateCreated - a.dateCreated)
    }
  }

  if (viewWidth <= 600) return null

  if (viewWidth < 800) {
    return (
      <StyledSideBar offsetTop={46}>
        <Menu
          style={{ height: '100%' }}
          mode='inline'
          selectable={false}
          selectedKeys={window ? [window.location.pathname] : ['/app']}
          // inlineCollapsed={viewWidth < 800}
        >
          <Menu.Item
            onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadDrawerOpen: true }))}
          >
            {uploading ? <LoadingOutlined spin /> : <UploadOutlined />}
            <span>Add Clip</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadYoutubeDrawerOpen: true }))}
          >
            {youtubeUploading ? <LoadingOutlined spin /> : <YoutubeOutlined />}
            <span>Add Youtube</span>
          </Menu.Item>

          <Menu.Item key='/app' onClick={() => navigate('/app')}>
            <UserOutlined />
            <span>User Profile</span>
          </Menu.Item>
          <Menu.Item key='/app/clips' onClick={() => navigate('/app/clips')}>
            <AudioOutlined />
            <span>Clips</span>
          </Menu.Item>
        </Menu>
      </StyledSideBar>
    )
  }

  return (
    <StyledSideBar offsetTop={46}>
      <Menu
        mode='inline'
        selectable={false}
        // inlineCollapsed={viewWidth < 800}
      >
        <Menu.Item
          onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadDrawerOpen: true }))}
        >
          {uploading ? <LoadingOutlined spin /> : <UploadOutlined />}
          <span>Add Clip</span>
        </Menu.Item>
        <Menu.Item
          onClick={() => setAppState(oldAppState => ({ ...oldAppState, uploadYoutubeDrawerOpen: true }))}
        >
          {youtubeUploading ? <LoadingOutlined spin /> : <YoutubeOutlined />}
          <span>Add Youtube</span>
        </Menu.Item>
      </Menu>

      <Menu
        // inlineCollapsed={viewWidth < 800}
        mode='inline'
        style={{ height: '100%' }}
        // defaultOpenKeys={["clip"]}
        selectedKeys={window ? [window.location.pathname] : ['/app']}
      >
        <Menu.Item key='/app' onClick={() => navigate('/app')}>
          <UserOutlined />
          <span>User Profile</span>
        </Menu.Item>

        <SubMenu
          key='clip'
          title={
            <span>
              <AudioOutlined />
              <span>Clips</span>
            </span>
          }
        >
          <Menu.Item>
            <Search
              placeholder='Search clips'
              onChange={e => setClipFilterText(e.target.value)}
              value={clipFilterText}
              style={{ border: 'none', padding: 0 }}
              allowClear
            />
          </Menu.Item>
          {
            sortOrFilterClips(clips)
            // .sort((a, b) => b.dateCreated - a.dateCreated)
              .map(c => (
                <Menu.Item
                  onClick={() => navigate(`app/clips/${c._id}`)}
                  key={`/app/clips/${c._id}`}
                >
                  <span>{c.name}</span>
                </Menu.Item>
              ))
          }
        </SubMenu>

      </Menu>
    </StyledSideBar>
  )
}

export default SideBar

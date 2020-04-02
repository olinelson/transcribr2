import React, { useState, useEffect } from 'react'

import {
  AudioOutlined,
  LoadingOutlined,
  UploadOutlined,
  UserOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

import { Menu } from 'antd';
import { navigate } from 'gatsby'

import { StyledSideBar } from './MyStyledComponents'

const { SubMenu } = Menu
function SideBar ({ appState, setAppState }) {
  const { clips, uploading, youtubeUploading } = appState

  const [viewWidth, setViewWidth] = useState(window.innerWidth)

  useEffect(() => {
    function handleResize () {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  if (viewWidth <= 600) return null

  if (viewWidth < 800) {
    return (
      <StyledSideBar offsetTop={46}>
        <Menu
          style={{ height: '100%' }}
          mode='inline'
          selectable={false}
          inlineCollapsed={viewWidth < 800}
        >
          <Menu.Item
            onClick={() => setAppState({ ...appState, uploadDrawerOpen: true })}
          >
            {uploading ? <LoadingOutlined spin /> : <UploadOutlined />}
            <span>Add Clip</span>
          </Menu.Item>
          <Menu.Item
            onClick={() => setAppState({ ...appState, uploadYoutubeDrawerOpen: true })}
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
    );
  }

  return (
    <StyledSideBar offsetTop={46}>
      <Menu
        mode='inline'
        selectable={false}
        inlineCollapsed={viewWidth < 800}
      >
        <Menu.Item
          onClick={() => setAppState({ ...appState, uploadDrawerOpen: true })}
        >
          {uploading ? <LoadingOutlined spin /> : <UploadOutlined />}
          <span>Add Clip</span>
        </Menu.Item>
        <Menu.Item
          onClick={() => setAppState({ ...appState, uploadYoutubeDrawerOpen: true })}
        >
          {youtubeUploading ? <LoadingOutlined spin /> : <YoutubeOutlined />}
          <span>Add Youtube</span>
        </Menu.Item>
      </Menu>

      <Menu
        inlineCollapsed={viewWidth < 800}
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
          {clips
            .sort((a, b) => b.dateCreated - a.dateCreated)
            .map(c => (
              <Menu.Item
                onClick={() => navigate(`app/clips/${c._id}`)}
                key={`/app/clips/${c._id}`}
              >
                <span>{c.name}</span>
              </Menu.Item>
            ))}
        </SubMenu>

      </Menu>
    </StyledSideBar>
  );
}

export default SideBar

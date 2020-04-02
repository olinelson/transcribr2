import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Menu, Skeleton } from 'antd';
import { FixedMenuDiv, StyledSideBar } from './MyStyledComponents'

const { SubMenu } = Menu

export function ProfileSkeleton () {
  return <>
    <StyledSideBar>
      <Menu
        inlineCollapsed={window.innerWidth < 800}
        mode='inline'
        selectable={false}
      >
        <Menu.Item disabled>
          <LoadingOutlined active />
          <span>Add Clip</span>
        </Menu.Item>
      </Menu>

      <Menu
        inlineCollapsed={window.innerWidth < 800}
        mode='inline'
        style={{ height: '100%' }}
      >
        <Menu.Item key='user' disabled>
          <LoadingOutlined active />
          <span>User Profile</span>
        </Menu.Item>

        <SubMenu
          disabled
          key='clip'
          title={
            <span>
              <LoadingOutlined active />
              <span>Clips</span>
            </span>
          }
        />
      </Menu>
    </StyledSideBar>

    <div style={{ gridArea: 'main', margin: ' 0 1rem' }}>
      <Skeleton active />
    </div>
  </>;
}

export default ProfileSkeleton

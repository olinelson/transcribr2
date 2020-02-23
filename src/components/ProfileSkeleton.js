import React from 'react'
import { Menu, Skeleton, Icon } from 'antd'
import { FixedMenuDiv, StyledSideBar } from './MyStyledComponents'

const { SubMenu } = Menu

export function ProfileSkeleton () {
  return (
    <>
      <StyledSideBar>
        <Menu
          inlineCollapsed={window.innerWidth < 800}
          mode='inline'
          selectable={false}
        >
          <Menu.Item disabled>
            <Icon type='loading' active />
            <span>Add Clip</span>
          </Menu.Item>
        </Menu>

        <Menu
          inlineCollapsed={window.innerWidth < 800}
          mode='inline'
          style={{ height: '100%' }}
        >
          <Menu.Item key='user' disabled>
            <Icon type='loading' active />
            <span>User Profile</span>
          </Menu.Item>

          <SubMenu
            disabled
            key='clip'
            title={
              <span>
                <Icon type='loading' active />
                <span>Clips</span>
              </span>
            }
          />
        </Menu>
      </StyledSideBar>

      <div style={{ gridArea: 'main', margin: ' 0 1rem' }}>
        <Skeleton active />
      </div>
    </>
  )
}

export default ProfileSkeleton

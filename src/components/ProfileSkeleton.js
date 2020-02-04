import React from "react"
import { Menu, Skeleton, Icon } from "antd"

const { SubMenu } = Menu

export function ProfileSkeleton() {
  return (
    <>
      <div>
        <Menu style={{ width: 256 }} mode="inline" selectable={false}>
          <Menu.Item disabled>
            <Icon type="upload" />
            Add Clip
          </Menu.Item>
        </Menu>
        <Menu style={{ width: 256, height: "auto" }} mode="inline">
          <Menu.Item disabled>
            <Icon type="loading" />
            User Profile
          </Menu.Item>

          <SubMenu
            disabled
            title={
              <span>
                <Icon type="loading" />
                <span>Clips</span>
              </span>
            }
          ></SubMenu>
        </Menu>
      </div>
      <Skeleton active />
    </>
  )
}

export default ProfileSkeleton

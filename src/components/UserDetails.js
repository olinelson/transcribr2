import React from "react"

import { Descriptions } from "antd"

export default function UserDetails({ user }) {
  return (
    <>
      <div style={{ height: "5rem" }} />
      <Descriptions title="User Info" layout="vertical">
        <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Bio">bio...</Descriptions.Item>
      </Descriptions>
    </>
  )
}

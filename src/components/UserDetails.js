import React, { useState } from "react"

import {
  Descriptions,
  Drawer,
  Icon,
  Form,
  Input,
  Button,
  Popconfirm,
} from "antd"
import { updateUser, deleteUser } from "../services/userManagement"
import { openNotificationWithIcon } from "./Notifications"
import { navigate } from "gatsby"

export default function UserDetails(props) {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  const [user, setUser] = useState(props.user)
  const [loading, setLoading] = useState(false)

  const deleteUserHandler = async () => {
    const success = await deleteUser()
    if (success) {
      navigate("/")
      window.localStorage.clear()
      openNotificationWithIcon("warning", "User Profile Permanently Deleted.")
    } else {
      openNotificationWithIcon("error", "Something went wrong :(")
    }
  }

  return (
    <>
      <h1>
        User Profile{" "}
        <Icon
          onClick={() => setEditDrawerOpen(true)}
          style={{ fontSize: "1rem" }}
          type="edit"
        />
      </h1>
      <Descriptions layout="vertical">
        <Descriptions.Item label="UserName">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
      </Descriptions>

      <Drawer
        onClose={() => {
          setUser(props.user)
          setEditDrawerOpen(false)
        }}
        title="Edit Profile"
        visible={editDrawerOpen}
      >
        <Form
          layout="vertical"
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
          onSubmit={async e => {
            e.preventDefault()
            const success = await updateUser(user)
            if (success) {
              setEditDrawerOpen(false)
              openNotificationWithIcon("success", "User Profile Updated")
            } else {
              openNotificationWithIcon("error", "There was a problem :(")
            }
          }}
        >
          <Form.Item label="Name">
            <Input
              name="name"
              spellCheck="true"
              defaultValue={user.name}
              placeholder="Olaf"
            />
          </Form.Item>
          <Form.Item label="Email Address">
            <Input
              name="email"
              type="email"
              spellCheck="true"
              defaultValue={user.email}
              placeholder="olaf@transcribrapp.com"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Save
          </Button>
          <Popconfirm
            title="Are you sure you want to delete your account?"
            onConfirm={() => deleteUserHandler()}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete Account</Button>
          </Popconfirm>
        </Form>
      </Drawer>
    </>
  )
}

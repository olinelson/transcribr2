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
import { updateUser, deleteUser, changeEmail } from "../services/userManagement"
import { openNotificationWithIcon } from "./Notifications"
import { navigate } from "gatsby"

export default function UserDetails(props) {
  const { appState, setAppState } = props
  // const [editDrawerOpen, setEditDrawerOpen] = useState(false)
  // const [changeEmailDrawerOpen, setChangeEmailDrawerOpen] = useState(false)
  const [user, setUser] = useState(appState.user)
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
    <div style={{ padding: "0 1rem" }}>
      {/* <DividerForTabletUp /> */}
      <h1>
        User Profile{" "}
        <Icon
          onClick={() => setAppState({ ...appState, editUserDrawerOpen: true })}
          style={{ fontSize: "1rem" }}
          type="edit"
        />
      </h1>
      <Descriptions layout="vertical">
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Email">
          {user.email}{" "}
          <Icon
            onClick={() =>
              setAppState({ ...appState, editEmailDrawerOpen: true })
            }
            type="edit"
          />
        </Descriptions.Item>
      </Descriptions>

      <Drawer
        onClose={() => {
          // setUser(props.user)
          setAppState({ ...appState, editEmailDrawerOpen: false })
          // setChangeEmailDrawerOpen(false)
        }}
        title="Change Email"
        visible={appState.editEmailDrawerOpen}
      >
        <Form
          layout="vertical"
          onSubmit={async e => {
            e.preventDefault()
            setLoading(true)
            const unconfirmedEmail = e.target.unconfirmedEmail.value
            const success = await changeEmail(unconfirmedEmail)
            if (success) {
              setAppState({
                ...appState,
                user: {
                  ...appState.user,
                  unconfirmedEmail,
                  editEmailDrawOpen: false,
                },
              })
              // setUser({ ...props.user, unconfirmedEmail })
              openNotificationWithIcon("success", "Verification email sent.")
            } else {
              openNotificationWithIcon("error", "There was a problem :(")
            }
            setLoading(false)
          }}
        >
          <Form.Item label="Current Email">
            <p>{user.email}</p>
          </Form.Item>
          {user.unconfirmedEmail ? (
            <Form.Item label="Unconfirmed Email">
              <p>{user.unconfirmedEmail}</p>
              <small>Pending email confirmation</small>
            </Form.Item>
          ) : null}

          <Form.Item label="New Email Address">
            <Input
              name="unconfirmedEmail"
              type="email"
              spellCheck="true"
              placeholder="olaf@transcribrapp.com"
              contentEditable={false}
              defaultValue=""
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" loading={loading}>
            Verify
          </Button>
          <Popconfirm
            title="Are you sure you want to delete your account?"
            onConfirm={() => deleteUserHandler()}
            okText="Yes"
            cancelText="No"
          ></Popconfirm>
        </Form>
      </Drawer>

      <Drawer
        onClose={() => {
          setUser(appState.user)
          // setEditDrawerOpen(false)
          setAppState({ ...appState, editUserDrawerOpen: false })
        }}
        title="Edit Profile"
        visible={appState.editUserDrawerOpen}
      >
        <Form
          layout="vertical"
          onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
          onSubmit={async e => {
            e.preventDefault()
            setLoading(true)
            const success = await updateUser(user)
            if (success) {
              setAppState({ ...appState, user, editUserDrawerOpen: false })
              openNotificationWithIcon("success", "User Profile Updated")
            } else {
              openNotificationWithIcon("error", "There was a problem :(")
            }
            setLoading(false)
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
    </div>
  )
}

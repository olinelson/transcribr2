import React, { useState } from 'react'

import { EditOutlined, UserDeleteOutlined, LogoutOutlined } from '@ant-design/icons'
import '@ant-design/compatible/assets/index.css'

import { Descriptions, Drawer, Input, Button, Popconfirm, Divider, Form, Collapse } from 'antd'
import { updateUser, deleteUser, deleteAllSessions, changeEmail } from '../services/userManagement'
import { openNotificationWithIcon } from './Notifications'
import { navigate } from 'gatsby'

import PaymentMethodsList from './PaymentMethodsList'
import Usage from './Usage'
import { logout } from '../services/auth'

const { Panel } = Collapse

export default function UserDetails (props) {
  const { appState, setAppState } = props
  const user = appState.user

  const [loading, setLoading] = useState(false)

  const deleteUserHandler = async () => {
    const success = await deleteUser()
    if (success) {
      navigate('/')
      window.localStorage.clear()
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.controller.postMessage('clearCache')
      }
      openNotificationWithIcon('warning', 'User Profile Permanently Deleted.')
    } else {
      openNotificationWithIcon('error', 'Something went wrong :(')
    }
  }
  const deleteAllSessionsHandler = async () => {
    const success = await deleteAllSessions()
    if (success) {
      navigate('/')
      window.localStorage.clear()
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.controller.postMessage('clearCache')
      }

      openNotificationWithIcon('success', 'Log out everywhere complete!')
    } else {
      openNotificationWithIcon('error', 'Something went wrong :(')
    }
  }

  const onFinishEditUser = async (user) => {
    setLoading(true)
    const updatedUser = await updateUser(user)
    if (updateUser) {
      setAppState(oldAppState => ({ ...oldAppState, user: { ...oldAppState.user, ...updatedUser }, editUserDrawerOpen: false }))
      openNotificationWithIcon('success', 'User Profile Updated')
    } else {
      openNotificationWithIcon('error', 'There was a problem :(')
    }
    setLoading(false)
  }
  const onFinishChangeEmail = async ({ unconfirmedEmail }) => {
    setLoading(true)
    const success = await changeEmail(unconfirmedEmail)
    if (success) {
      setAppState(oldAppState => ({
        ...oldAppState,
        user: {
          ...appState.user,
          unconfirmedEmail,
          editEmailDrawOpen: false
        }
      }))
    }
    setLoading(false)
  }

  return (
    <div style={{ padding: '0 1rem', display: 'grid' }}>
      {/* <DividerForTabletUp /> */}
      <h1>
        User Profile

      </h1>
      <Descriptions>
        <Descriptions.Item label='Name'>{user.name}{' '}<EditOutlined
          onClick={() => setAppState(oldAppState => ({ ...oldAppState, editUserDrawerOpen: true }))}
          style={{ fontSize: '1rem' }}
                                                        />
        </Descriptions.Item>
        <Descriptions.Item label='Email'>
          {user.email}{' '}
          <EditOutlined
            onClick={() =>
              setAppState(oldAppState => ({ ...oldAppState, editEmailDrawerOpen: true }))}
          />
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Usage />

      <Divider />

      <Collapse>
        <Panel header='Payment Methods' key='1'>
          <PaymentMethodsList appState={appState} setAppState={setAppState} />
        </Panel>
        <Panel header='Support' key='2'>
          <p>Having issues? Let us know by sending us an email at <a href='mailto:oli-nelson@outlook.com'>oli-nelson@outlook.com</a></p>
        </Panel>
        <Panel header='Danger Zone' key='3'>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Popconfirm
              title='Are you sure you want to delete your account?'
              onConfirm={() => deleteUserHandler()}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<UserDeleteOutlined />} type='danger'>Delete Account</Button>
            </Popconfirm>

            <Popconfirm
              title='Are you sure you want to log out everywhere?'
              onConfirm={() => deleteAllSessionsHandler()}
              okText='Yes'
              cancelText='No'
            >
              <Button icon={<LogoutOutlined />} type='danger'>Log Out Everywhere</Button>
            </Popconfirm>
          </div>
        </Panel>

      </Collapse>

      <Divider />

      <Popconfirm

        title='Are you sure you want to log out?'
        onConfirm={() => logout()}
        okText='Yes'
        cancelText='No'
      >
        <Button style={{ justifySelf: 'center' }} type='primary'>Log out</Button>
      </Popconfirm>

      <Drawer
        onClose={() => {
          setAppState(oldAppState => ({ ...oldAppState, editEmailDrawerOpen: false }))
        }}
        title='Change Email'
        visible={appState.editEmailDrawerOpen}
      >
        <Form
          onFinish={onFinishChangeEmail}
          initialValues={user}
          layout='vertical'
        >
          <Form.Item label='Current Email'>
            <p>{user.email}</p>
          </Form.Item>
          {user.unconfirmedEmail ? (
            <Form.Item label='Unconfirmed Email'>
              <p>{user.unconfirmedEmail}</p>
              <small>Pending email confirmation</small>
            </Form.Item>
          ) : null}

          <Form.Item name='unconfirmedEmail' label='New Email Address'>

            <Input
              rules={[{ required: true, message: 'Please input your new email address!' }]}
              type='email'
              placeholder='olaf@transcribrapp.com'
              defaultValue=''
            />
          </Form.Item>

          <Button type='primary' htmlType='submit' loading={loading}>
            Verify
          </Button>
          {/* <Popconfirm
            title='Are you sure you want to delete your account?'
            onConfirm={() => deleteUserHandler()}
            okText='Yes'
            cancelText='No'
          /> */}
        </Form>
      </Drawer>

      <Drawer
        onClose={() => {
          // setUser(appState.user)
          // setEditDrawerOpen(false)
          setAppState(oldAppState => ({ ...oldAppState, editUserDrawerOpen: false }))
        }}
        title='Edit Profile'
        visible={appState.editUserDrawerOpen}
      >
        <Form
          layout='vertical'
          // onChange={e => setUser({ ...user, [e.target.name]: e.target.value })}
          onFinish={onFinishEditUser}
          initialValues={user}
          // onSubmit={async e => {
          //   e.preventDefault()
          //   setLoading(true)
          //   const success = await updateUser(user)
          //   if (success) {
          //     setAppState(oldAppState => ({ ...oldAppState, user, editUserDrawerOpen: false }))
          //     openNotificationWithIcon('success', 'User Profile Updated')
          //   } else {
          //     openNotificationWithIcon('error', 'There was a problem :(')
          //   }
          //   setLoading(false)
          // }}
        >
          <Form.Item
            name='name'
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input
              placeholder='Olaf'
            />
          </Form.Item>

          <Button type='primary' htmlType='submit' loading={loading}>
            Save
          </Button>

        </Form>
      </Drawer>
    </div>
  )
}

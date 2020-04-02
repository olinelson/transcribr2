import React, { useState } from 'react'

import Link from 'gatsby'

import { uploadYoutube } from '../services/clipManagement'
import { LinkOutlined, MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

import { Form, Input, Button, Select } from 'antd'

const { Option } = Select

function YoutubeForm ({ appState, setAppState }) {
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   uploadYoutube({ appState, url: e.target.url.value, setAppState })
  // }

  const onFinish = async ({ url }) => {
    uploadYoutube({ appState, url, setAppState })
  }

  return (
    <Form
      name='youtube-form'
      onFinish={onFinish}
    >

      <Form.Item
        name='url'
        rules={[{ required: true, message: 'Please input a youtube url!' }]}
      >
        <Input prefix={<LinkOutlined className='site-form-item-icon' />} placeholder='https://www.youtube.com/watch?v=376q9QUezJU' />
      </Form.Item>

      <Form.Item>
        <Button loading={appState.youtubeUploading} type='primary' htmlType='submit' className='login-form-button'>
          Add
        </Button>
      </Form.Item>
    </Form>

  )
}

export default YoutubeForm

import React from 'react'

import Link from 'gatsby'

import { uploadYoutube } from '../services/clipManagement'
import { LinkOutlined } from '@ant-design/icons'

import { Form, Input, Button } from 'antd'

function YoutubeForm ({ appState, setAppState }) {
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

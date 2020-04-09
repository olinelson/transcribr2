import React from 'react'

import { uploadYoutube } from '../services/clipManagement'
import { LinkOutlined } from '@ant-design/icons'

import { Form, Input, Button } from 'antd'

function YoutubeForm ({ appState, setAppState }) {

  const onFinish = async ({ url }) => {
    setAppState(oldAppState => ({ ...oldAppState, youtubeUploading: true, uploadYoutubeDrawerOpen: false }))
    const started = await uploadYoutube({ appState, url, setAppState })
    console.log(started)
    if (started){
      setAppState(oldAppState => ({ ...oldAppState, uploadYoutubeDrawerOpen: false, youtubeUploading: true }))
    }else{
      setAppState( oldAppState => ({ ...oldAppState, uploadYoutubeDrawerOpen: false, youtubeUploading: false }))
    }
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

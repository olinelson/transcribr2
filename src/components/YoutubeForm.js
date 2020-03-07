import React from 'react'
import { Form, Icon, Input, Button } from './MyStyledComponents'

import { uploadYoutube } from '../services/clipManagement'

export default function YoutubeForm ({ appState, setAppState }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    uploadYoutube({ appState, url: e.target.url.value, setAppState })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        <Input
          disabled={appState.youtubeUploading}
          name='url'
          type='url'
          prefix={<Icon type='link' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='https://www.youtube.com/watch?v=96n33WWgE9g'
        />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          loading={appState.youtubeUploading}
          disabled={appState.youtubeUploading}
        >
                    Upload
        </Button>
      </Form.Item>
    </Form>
  )
}

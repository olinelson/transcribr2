import React from 'react'
import { API_URL } from '../config'
import { getToken } from '../services/auth'
import { Upload, Icon } from './MyStyledComponents'
import { message, Form, Button, Input } from 'antd'
import { openNotificationWithIcon } from './Notifications'
import YoutubeForm from './YoutubeForm'

function UploadYoutube (props) {
  const { appState, setAppState } = props

  const uploadYoutubeHandler = async (e) => {
    e.preventDefault()
    const url = e.target.url.value

    setAppState({ ...appState, youtubeUploading: true })
    try {
      const res = await fetch(API_URL + '/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        },
        body: JSON.stringify({
          url
        })
      })
      const clip = await res.json() // parses JSON response into native JavaScript objects
      openNotificationWithIcon('success', `${clip.name} created!`)
      setAppState({ ...appState, clips: [...appState.clips, clip], youtubeUploading: false })
    } catch (error) {
      openNotificationWithIcon('error', 'Coudn\'t create clip, please try again')
      // setClip({ ...clip, saving: false, editClipDrawerOpen: false })
    }
  }

  return (
    <div
      style={{
        border: '1rem solid white',
        display: 'grid',
        width: '100%',
        height: '100%'
      }}
    >
      <YoutubeForm {...props} />

      {/* <Form onSubmit={(e) => uploadYoutubeHandler(e)}>
        <Form.Item>
          <Input type='url' name='url' />
        </Form.Item>
        <Form.Item>
          <Button type='primary'>Upload</Button>
        </Form.Item>

      </Form> */}

    </div>
  )
}

export default UploadYoutube

import React from 'react'
import { API_URL } from '../config'
import { getToken } from '../services/auth'
import { Upload, Icon } from './MyStyledComponents'
import { message } from 'antd'
import { openNotificationWithIcon } from './Notifications'
import sanitize from 'sanitize-filename'
const { Dragger } = Upload

function UploadClip (props) {
  const { appState, setAppState } = props

  const createClip = async (file) => {
    try {
      const res = await fetch(API_URL + '/clips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        },
        body: JSON.stringify({
          name: file.prettyName,
          rawFileName: file.name,
          fileType: file.type
        })
      })
      const clip = await res.json() // parses JSON response into native JavaScript objects
      openNotificationWithIcon('success', `${clip.name} created!`)
      setAppState({ ...appState, clips: [...appState.clips, clip] })
    } catch (error) {
      openNotificationWithIcon('error', 'Coudn\'t create clip, please try again')
      // setClip({ ...clip, saving: false, editClipDrawerOpen: false })
    }
  }

  const sanitizeFileName = (filename) => Date.now() + sanitize(filename.replace(/ /g, ''))

  const getSignedUrl = async (filename, fileType, fileSize) => {
    try {
      let res = await fetch(API_URL + '/clips/authorize_upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *client
        body: JSON.stringify({
          filename,
          fileType
        })
      })
      res = await res.json() // parses JSON response into native JavaScript objects
      return res.signedUrl
      // return `https://${appState.user._id}.storage.googleapis.com/${filename}?upload_id=${res.uploadId}`
    } catch (error) {
      console.error(error)
    }
  }

  const settings = {
    multiple: true,
    name: 'newFile',

    transformFile (file) {
      const prettyName = file.name

      const name = sanitizeFileName(file.name) // Concat with file extension.
      file.name.substring(file.name.lastIndexOf('.'))
      // Instantiate copy of file, giving it new name.
      file = new File([file], name, { type: file.type })
      file.prettyName = prettyName
      return file
    },
    customRequest: async (args) => {
      const { file, onProgress, onSuccess, onError } = args
      const action = await getSignedUrl(file.name, file.type, file.size)
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', action, true)

      xhr.onload = (e) => {
        const status = xhr.status
        if (status === 200) {
          onSuccess()
          createClip(file)
        } else {
          onError()
        }
      }
      xhr.upload.onprogress = (e) => {
        const { total, loaded } = e
        const percent = loaded / total * 100
        onProgress({ percent })
      }

      xhr.onerror = (e) => {
        onError()
      }
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.send(file)
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
      <Dragger {...settings} style={{ padding: '1rem' }}>
        <p className='ant-upload-drag-icon'>
          <Icon type='inbox' />
        </p>
        <p className='ant-upload-text'>
          Click or drag file to this area to upload
        </p>
        <p className='ant-upload-hint'>
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    </div>
  )
}

export default UploadClip

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
    console.log(file)
    try {
      let res = await fetch(API_URL + '/clips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: getToken()
        },
        body: JSON.stringify({
          name: file.name,
          rawFileName: sanitizeFileName(file.name),
          fileType: file.type
        })
      })
      res = await res.json() // parses JSON response into native JavaScript objects
      console.log(res)
      // openNotificationWithIcon('success', 'Changes saved')
      // const filteredClips = appState.clips.filter(c => c._id !== clip._id)
      // setClip({ ...clip, clipSaving: false })
      // setAppState({ ...appState, clips: [...appState.clips, res.clip] })
    } catch (error) {
      console.error(error)
      // setClip({ ...clip, saving: false, editClipDrawerOpen: false })
    }
  }

  const sanitizeFileName = (filename) => sanitize(filename.replace(/ /g, ''))

  const getSignedUrl = async (filename, fileType, fileSize) => {
    console.log(fileType)
    filename = sanitizeFileName(filename)

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

      return `https://${appState.user._id}.storage.googleapis.com/${filename}?upload_id=${res.uploadId}`
    } catch (error) {
      console.error(error)
    }
  }

  const settings = {
    multiple: true,

    customRequest: async (args) => {
      const { file, onProgress, onSuccess, onError } = args
      console.log('this is args', file)
      const action = await getSignedUrl(file.name, file.type, file.size)
      // console.log(signedUrl)
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', action, true)

      xhr.onload = (e) => {
        console.log('this is onload', e)
        const status = xhr.status
        if (status === 200) {
          onSuccess()
        } else {
          onError()
        }
      }
      xhr.upload.onprogress = (e) => {
        console.log('on progress', e)
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

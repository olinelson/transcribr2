import React from 'react'
import { API_URL } from '../config'
import { getToken } from '../services/auth'
import { Upload, Icon } from './MyStyledComponents'
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
    } catch (error) {
      console.error(error)
    }
  }

  const settings = {
    multiple: false,
    accept: `
    .aac,.ac3,.aif,.aifc,.aiff,.amr,.au,.caf,.flac,.m4a,.m4b,.mp3,.moga,.sf2,.voc,.wav,.weba,.wma
    .3g2,.3gp,.3gpp,.avi,.cavs,.dv,.dvr,.flv,.m2ts,.m4v,.mkv,.mod,.mov,.mp4,.mpeg,.mpg,.mts,.mxf,.ogg,.rm,.rmvb,.swf,.ts,.rob,.webm,.wmv,.mtv
    `,
    beforeUpload (file, fileList) {
      if (file.size > 400000000) {
        openNotificationWithIcon('error', 'File too large, must be 400mb or under.')
        return false
      }

      return true
    },
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

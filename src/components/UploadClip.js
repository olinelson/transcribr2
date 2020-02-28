import React from 'react'
import { API_URL } from '../config'
import { getToken } from '../services/auth'
import { Upload, Icon } from './MyStyledComponents'
import { message } from 'antd'
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
    // name: 'file',
    multiple: true,
    method: 'PUT',
    action: (file) => getSignedUrl(file.name, file.type, file.size),

    customRequest: async (args) => {
      const { file, onProgress, action } = args
      console.log('this is args', args)
      // const action = await getSignedUrl(file.name, file.type, file.size)
      // console.log(signedUrl)
      const xhr = new XMLHttpRequest()
      xhr.open('PUT', action, true)

      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.responseText)
        }
      }

      xhr.onload = () => {
        const status = xhr.status
        if (status === 200) {
          alert('File is uploaded')
        } else {
          alert('Something went wrong!')
        }
      }
      xhr.upload.onprogress = (e) => {
        console.log('on progress', e)
        const { total, loaded } = e
        const percent = loaded / total * 100
        onProgress({ percent })
      }

      xhr.onerror = (e) => {
        alert('Something went wrong', e)
      }
      xhr.setRequestHeader('Content-Type', file.type)
      xhr.send(file)
    },
    onChange (info) {
      console.log('this is on change', info)
      const { status } = info.file

      if (status !== 'uploading') {
        // props.setUploading(false)
        setAppState({ ...appState, uploading: true })
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
        // createClip(info.file)

        // console.log(sanitizeFileName(info.file.name))

        // props.addClip(info.file.response)
        // setAppState({
        //   ...appState,
        //   clips: [...appState.clips, info.file.response],
        //   uploading: false
        // })
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
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

import React from 'react'
import { API_URL } from '../config'
import { getToken } from '../services/auth'
import { Upload, Icon } from './MyStyledComponents'
import { message } from 'antd'
import sanitize from 'sanitize-filename'
const { Dragger } = Upload

export const getSignedUrl = async (filename, fileType) => {
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
    return res.url
  } catch (error) {
    console.error(error)
  }
}

function UploadClip (props) {
  const { appState, setAppState } = props

  const settings = {
    name: 'file',
    multiple: false,
    method: 'PUT',

    transformFile: async file => {
      // const sanitizedName = sanitize(Date.now() + file.name).replace(/ /g, '')

      const signedUrl = await getSignedUrl(file.name, file.type)
      // file.name = sanitizedName
      file.signedUrl = signedUrl
      // const cleanFile = new { ...file, name: sanitizedName, signedUrl }()
      return file
    },

    customRequest: async data => {
      const file = data.file
      console.log('uploading this file', file)
      const xhr = new XMLHttpRequest()

      xhr.open('PUT', file.signedUrl, true)

      xhr.onprogress = (e) => {
        console.log('on progress', e)
      }

      xhr.onload = (e) => {
        console.log('hello', e)

        const status = xhr.status
        if (status === 200) {
          message.success(`${file.name} file uploaded successfully.`)

          // props.addClip(info.file.response)
          setAppState({
            ...appState,
            // clips: [...appState.clips, info.file.response],
            uploading: false
          })
        } else {
          alert('Something went wrong!')
        }
      }

      xhr.onerror = () => {
        alert('Something went wrong')
      }

      xhr.setRequestHeader('Content-Type', file.type)
      // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
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

        // props.addClip(info.file.response)
        setAppState({
          ...appState,
          clips: [...appState.clips, info.file.response],
          uploading: false
        })
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

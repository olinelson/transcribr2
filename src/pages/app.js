import React, { useEffect, useRef } from 'react'
import Layout from '../components/layout'
import { Router } from '@reach/router'
import PrivateRoute from '../components/privateRoute'

import Clip from '../components/Clip'
import Clips from '../components/Clips'

import { openNotificationWithIcon } from '../components/Notifications'
import { getUserProfileAndSet } from '../services/userManagement'
import { getToken, isLoggedIn } from '../services/auth'
import openSocket from 'socket.io-client'
import { API_URL } from '../config'
import WithLocation from '../components/WithLocation'

import { Drawer } from 'antd'
import UploadClip from '../components/UploadClip'
import { useStateWithLocalStorageJSON } from '../utils'
import SideBar from '../components/SideBar'
import UserDetails from '../components/UserDetails'
import YoutubeForm from '../components/YoutubeForm'

function App (props) {
  const [appState, setAppState] = useStateWithLocalStorageJSON('appState', {
    user: {},
    clips: [],
    uploadDrawerOpen: false,
    searchClipDrawerOpen: false,
    editUserDrawerOpen: false,
    editClipDrawerOpen: false,
    editWordDrawerOpen: false,
    editEmailDrawerOpen: false
  })

  const mounted = useRef()

  const bearerToken = getToken()

  const socket = openSocket(API_URL)

  useEffect(() => {
    function joinUserChannel (bearerToken, cb) {
      if (isLoggedIn()) {
        socket.on('notification', notification => cb(notification))
        socket.emit('joinUserChannel', bearerToken)
      }
    }

    // first load
    if (!mounted.current) {
      mounted.current = true
      joinUserChannel(getToken(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(appState, setAppState)
    }
    // cleanup
    return function leaveUserChannel () {
      socket.emit('leaveUserChannel', bearerToken)
    }
  }, [])

  const notificationHandler = notification => {
    switch (notification.name) {
      case 'youtubeUploadFailed':
        openNotificationWithIcon('error', notification.message)
        setAppState({ ...appState, youtubeUploading: false })
        break
      case 'youtubeUploadComplete':
        // console.log({ notification })
        openNotificationWithIcon('success', notification.message)
        setAppState({ ...appState, clips: [...appState.clips, notification.data.clip], youtubeUploading: false })
        break

      default:
        openNotificationWithIcon('success', notification.message)
    }
  }

  return (
    <Layout
      {...props}
      location={props.location}
      appState={appState}
      setAppState={setAppState}
    >
      <div style={{ gridArea: 'sidebar', display: 'flex' }}>
        <Router primary={false}>
          <PrivateRoute
            component={SideBar}
            path='/app/*'
            appState={appState}
            setAppState={setAppState}
            location={props.location}
          />
        </Router>
      </div>

      <div style={{ gridArea: 'main' }}>
        <Router>
          <PrivateRoute
            component={UserDetails}
            path='/app'
            appState={appState}
            setAppState={setAppState}
          />
          <PrivateRoute
            path='/app/clips/:clipId'
            component={Clip}
            appState={appState}
            setAppState={setAppState}
          />
          <PrivateRoute
            path='/app/upload'
            component={UploadClip}
            appState={appState}
            setAppState={setAppState}
          />

          <PrivateRoute
            path='/app/clips'
            component={Clips}
            appState={appState}
            setAppState={setAppState}
          />
        </Router>
      </div>

      <Drawer
        title='Upload Clip'
        placement='right'
        closable
        onClose={() => setAppState({ ...appState, uploadDrawerOpen: false })}
        visible={appState.uploadDrawerOpen}
        width='auto'
      >
        <UploadClip appState={appState} setAppState={setAppState} />
      </Drawer>

      <Drawer
        title='Upload Youtube'
        placement='right'
        closable
        onClose={() => setAppState({ ...appState, uploadYoutubeDrawerOpen: false })}
        visible={appState.uploadYoutubeDrawerOpen}
        width='auto'

      >
        <YoutubeForm appState={appState} setAppState={setAppState} />
      </Drawer>
    </Layout>
  )
}

export default WithLocation(App)

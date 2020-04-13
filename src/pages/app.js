import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/layout'
import { Router } from '@reach/router'
import PrivateRoute from '../components/privateRoute'

import Clip from '../components/Clip'
import Clips from '../components/Clips'

import { openNotificationWithIcon } from '../components/Notifications'
import { getUserProfileAndSet } from '../services/userManagement'
import { getToken, isLoggedIn, isBrowser } from '../services/auth'
import openSocket from 'socket.io-client'
import { API_URL } from '../config'

import { Drawer, message } from 'antd'
import UploadClip from '../components/UploadClip'
import SideBar from '../components/SideBar'
import UserDetails from '../components/UserDetails'
import YoutubeForm from '../components/YoutubeForm'

function App (props) {
  const [appState, setAppState] = useState({
    user: {},
    clips: [],
    uploadDrawerOpen: false,
    uploadYoutubeDrawerOpen: false,
    searchClipDrawerOpen: false,
    editUserDrawerOpen: false,
    editClipDrawerOpen: false,
    editWordDrawerOpen: false,
    editEmailDrawerOpen: false,
    youtubeUploading: false,
    offline: false
  })

  const mounted = useRef()
  const bearerToken = getToken()
  let socket = openSocket(API_URL)
  let updatesChannel

  useEffect(() => {
    function notificationHandler (notification) {
      switch (notification.name) {
        case 'youtubeUploadFailed':
          openNotificationWithIcon('error', notification.message)
          setAppState(oldAppState => ({ ...oldAppState, youtubeUploading: false }))
          break
        case 'youtubeUploadComplete':
          openNotificationWithIcon('success', notification.message)
          getUserProfileAndSet(appState, setAppState)
          break
        default:
          openNotificationWithIcon('success', notification.message)
      }
    }

    function joinUserChannel (bearerToken, cb) {
      if (isLoggedIn()) {
        socket.on('notification', notification => cb(notification))
        socket.emit('joinUserChannel', bearerToken)
      }
    }

    function handleOffline () {
      message.warning('Working offline')
      socket.disconnect()
      setAppState(oldAppState => ({ ...oldAppState, offline: true }))
    }

    function handleOnline () {
      message.success('Back online!')
      socket = openSocket(API_URL)
      joinUserChannel(getToken(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(appState, setAppState)
    }

    function handleVisibilityChange () {
      if (document.visibilityState === 'visible') {
        socket.emit('joinUserChannel', bearerToken)
        getUserProfileAndSet(appState, setAppState)
      } else {
        socket.emit('leaveUserChannel', bearerToken)
      }
    }

    const updateStateFromCache = async (event) => {
      const { cacheName, updatedURL } = event.data.payload
      const cache = await caches.open(cacheName)
      const updatedResponse = await cache.match(updatedURL)

      if (updatedResponse && cacheName === 'user-details-cache') {
        const { user, clips } = await updatedResponse.json()

        openNotificationWithIcon('info', 'Updating')

        setAppState(oldAppState => ({
          ...oldAppState,
          clips,
          user
        }))
      }
    }

    if ('serviceWorker' in navigator && typeof (BroadcastChannel) !== 'undefined') {
      updatesChannel = new BroadcastChannel('user-details-cache-update')
    }

    // first load
    if (!mounted.current) {
      mounted.current = true
      joinUserChannel(getToken(), notification =>
        notificationHandler(notification)
      )
      getUserProfileAndSet(appState, setAppState)

      window.addEventListener('offline', handleOffline)
      window.addEventListener('online', handleOnline)

      document.addEventListener('visibilitychange', handleVisibilityChange)

      if (typeof (BroadcastChannel) !== 'undefined') {
        updatesChannel.addEventListener('message', updateStateFromCache)
      }
    }

    // cleanup
    return function cleanup () {
      socket.emit('leaveUserChannel', bearerToken)

      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('online', handleOnline)

      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (typeof (BroadcastChannel) !== 'undefined') {
        updatesChannel.removeEventListener('message', updateStateFromCache)
      }
    }
  }, [])

  return (
    <Layout appState={appState}>

      <div style={{ gridArea: 'sidebar', display: 'flex' }}>
        <Router basepath='/app' primary={false}>
          <PrivateRoute
            component={SideBar}
            path='/*'
            appState={appState}
            setAppState={setAppState}
            location={props.location}
          />
        </Router>
      </div>

      <div style={{ gridArea: 'main' }}>
        <Router basepath='/app'>
          <PrivateRoute
            component={UserDetails}
            path='/'
            appState={appState}
            setAppState={setAppState}
          />
          <PrivateRoute
            path='/clips/:clipId'
            component={Clip}
            appState={appState}
            setAppState={setAppState}
          />
          <PrivateRoute
            path='/upload'
            component={UploadClip}
            appState={appState}
            setAppState={setAppState}
          />

          <PrivateRoute
            path='/clips'
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
        onClose={() => setAppState(oldAppState => ({ ...oldAppState, uploadDrawerOpen: false }))}
        visible={appState.uploadDrawerOpen}
        width='auto'
      >
        <UploadClip appState={appState} setAppState={setAppState} />
      </Drawer>

      <Drawer
        title='Add Youtube'
        placement='right'
        closable
        onClose={() => setAppState(oldAppState => ({ ...appState, uploadYoutubeDrawerOpen: false }))}
        visible={appState.uploadYoutubeDrawerOpen}
        width='auto'

      >
        <YoutubeForm appState={appState} setAppState={setAppState} />
      </Drawer>

    </Layout>
  )
}

export default App

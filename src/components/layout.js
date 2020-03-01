import React from 'react'
import 'antd/dist/antd.css'
import NavBar from './nav-bar'
import { Helmet } from 'react-helmet'
import { Layout } from './MyStyledComponents'
import { Alert } from 'antd'
import { API_URL } from '../config'

const showEnvironmentAlert = () => {
  if (API_URL.includes('localhost')) {
    return (
      <Alert
        style={{ zIndex: 1000, position: 'fixed', bottom: '0', right: '0' }}
        message='Running on localhost'
        banner
      />
    )
  } else if (API_URL.includes('staging')) {
    return (
      <Alert
        style={{ zIndex: 1000, position: 'fixed', bottom: '0', right: '0' }}
        message='Running on heroku staging'
        banner
      />
    )
  } else return null
}

const layout = props => {
  const { children } = props
  return (
    <>
      <Helmet title='Transcribr' defer={false}>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1,width=device-width, viewport-fit=cover' />
      </Helmet>
      {showEnvironmentAlert()}
      <NavBar {...props} />
      <Layout>{children}</Layout>
    </>
  )
}

export default layout

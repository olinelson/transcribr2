import React, { useState, useEffect } from 'react'
import NavBar from './nav-bar'
import { Helmet } from 'react-helmet'
import { Layout as MyLayout } from './MyStyledComponents'
import { Alert } from 'antd'
import { API_URL } from '../config'
import { isBrowser } from '../services/auth'

function LayoutComponent (props) {
  const { children } = props
  const [isDarkTheme, setIsDarkTheme] = useState(!!(isBrowser() && window.matchMedia('(prefers-color-scheme: dark)').matches))

  useEffect(() => {
    const maybeSwitchTheme = (e) => { if (e.matches !== isDarkTheme) setIsDarkTheme(e.matches) }

    window.matchMedia('(prefers-color-scheme: dark)').addListener(e => maybeSwitchTheme(e))

    // cleanup
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeListener(e => maybeSwitchTheme(e))
    }
  }, [isDarkTheme])

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

  return (
    <>

      <Helmet title='Transcribr' defer={false}>
        <meta charSet='utf-8' />
        <meta name='viewport' content='initial-scale=1,width=device-width, viewport-fit=cover' />
        {/* favicon stuff */}
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#2d89ef' />
        <meta name='theme-color' content='#ffffff' />

        {isDarkTheme
          ? <link rel='stylesheet' type='text/css' href='/themes/antd.dark.css' />
          : <link rel='stylesheet' type='text/css' href='/themes/antd.light.css' />}
      </Helmet>
      {showEnvironmentAlert()}

      <NavBar {...props} />
      <MyLayout>{children}</MyLayout>
    </>
  )
}

export default LayoutComponent

import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { isLoggedIn, logout, isBrowser } from '../services/auth'
import { Menu, FixedMenuDiv, DynamicMenu } from './MyStyledComponents'
import WithLocation from './WithLocation'

import { Icon, Popconfirm, Alert } from 'antd'

import { openNotificationWithIcon } from './Notifications'

function Navbar (props) {
  const [viewWidth, setViewWidth] = useState(
    isBrowser() ? window.innerWidth : 0
  )

  useEffect(() => {
    function handleResize () {
      setViewWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <FixedMenuDiv offline={props.appState && props.appState.offline ? props.appState.offline : false}>
      <DynamicMenu
        theme='dark'
        mode='horizontal'
        selectedKeys={[props.location.pathname]}
      >
        <Menu.Item onClick={() => navigate('/')} key='/'>
          <Icon type='home' />
        </Menu.Item>

        <Menu.Item onClick={() => navigate('/about')} key='/about'>
          <Icon type='info-circle' />
        </Menu.Item>

        {isLoggedIn() ? (
          <Menu.Item onClick={() => navigate('/app')} key='/app'>
            <Icon type='user' />
            {/* <span>Profile</span> */}
          </Menu.Item>
        ) : null}

        {isLoggedIn() && viewWidth < 600 ? (
          <Menu.Item onClick={() => navigate('/app/clips')} key='/app/clips'>
            <Icon type='audio' />
          </Menu.Item>
        ) : null}

        {isLoggedIn() ? (
          <Menu.Item
            style={{ justifySelf: 'end' }}

          >
            <Popconfirm
              title='Are you sure you want to log out?'
              onConfirm={() => {
                logout()
                openNotificationWithIcon('success', 'Successfully logged out.')
                navigate('/')
              }}
              placement='bottomRight'
              okText='Yes'
              cancelText='No'
            >
              <Icon type='logout' />
            </Popconfirm>

            {/* Logout */}
          </Menu.Item>
        ) : (
          <Menu.Item
            style={{ justifySelf: 'end' }}
            key='/login'
            href='/'
            onClick={() => navigate('/login')}
          >
            <Icon type='login' />
            {/* Login */}
          </Menu.Item>
        )}
      </DynamicMenu>
    </FixedMenuDiv>
  )
}

export default WithLocation(Navbar)

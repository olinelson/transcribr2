import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import { isBrowser } from '../services/auth'
import { Menu, FixedMenuDiv, DynamicMenu } from './MyStyledComponents'
import WithLocation from './WithLocation'

import { AudioOutlined, HomeOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons'

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
          <HomeOutlined />
        </Menu.Item>

        <Menu.Item onClick={() => navigate('/about')} key='/about'>
          <InfoCircleOutlined />
        </Menu.Item>

        <Menu.Item onClick={() => navigate('/app')} key='/app'>
          <UserOutlined />
        </Menu.Item>

        {viewWidth < 600
          ? <Menu.Item onClick={() => navigate('/app/clips')} key='clips'>
            <AudioOutlined />
          </Menu.Item>
          : null}

      </DynamicMenu>
    </FixedMenuDiv>
  )
}

export default WithLocation(Navbar)

import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { Icon } from 'antd'

export default function IndexPage () {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowMessage(true)
    }, 5000)

    return function () {
      clearTimeout(delay)
    }
  })

  return (
    <Layout>
      <div style={{ fontSize: '5vw', position: 'absolute', top: '50%', width: '100vw', textAlign: 'center' }}>

        {showMessage ? <Icon type='question' /> : <Icon type='loading' />}

      </div>
    </Layout>
  )
}

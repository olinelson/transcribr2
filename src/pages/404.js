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

      {showMessage
        ? <Icon type='question' style={{ gridArea: 'main', alignSelf: 'center', fontSize: '2rem' }} />

        : <Icon type='loading' style={{ gridArea: 'main', alignSelf: 'center', fontSize: '2rem' }} />}

    </Layout>
  )
}

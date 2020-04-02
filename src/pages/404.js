import React, { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { LoadingOutlined, QuestionOutlined } from '@ant-design/icons';

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
        ? <QuestionOutlined style={{ gridArea: 'main', alignSelf: 'center', fontSize: '2rem' }} />

        : <LoadingOutlined style={{ gridArea: 'main', alignSelf: 'center', fontSize: '2rem' }} />}

    </Layout>
  );
}

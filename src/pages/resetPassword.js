import React from 'react'
import ResetPasswordForm from '../components/ResetPasswordForm'
import Layout from '../components/layout'
import { isLoggedIn } from '../services/auth'
import { navigate } from 'gatsby'

export default function forgot () {
  if (isLoggedIn()) {
    navigate('/app')
    return null
  }

  return (
    <Layout>
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyItems: 'center',
          height: '100%',
          gridColumn: '1/-1',
          gridRow: '2'
        }}
      >
        <ResetPasswordForm />
      </div>
    </Layout>
  )
}

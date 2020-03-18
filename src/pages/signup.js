import React from 'react'
import SignUpForm from '../components/SignUpForm'
import Layout from '../components/layout'
import { isLoggedIn } from '../services/auth'
import { navigate } from 'gatsby'

export default function signup () {
  if (isLoggedIn()) {
    navigate('/app')
  }

  return (
    <Layout>
      <div
        style={{
          gridArea: 'main',
          display: 'grid',
          alignItems: 'center',
          justifyItems: 'center'
        }}
      >
        <SignUpForm />
      </div>
    </Layout>
  )
}

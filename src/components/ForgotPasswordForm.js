import React, { useState } from 'react'
import { handleForgotPassword } from '../services/auth'
import { openNotificationWithIcon } from './Notifications'
import { navigate, Link } from 'gatsby'
import { Form, Input, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'

function ForgotPasswordForm () {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const sent = await handleForgotPassword(values)
    if (sent) {
      openNotificationWithIcon('success', 'Password Reset Email Sent!')
      navigate('/')
    } else {
      openNotificationWithIcon('error', 'Sorry, something went wrong')
    }
  }

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >

      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your Email Address!' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type='primary' htmlType='submit' className='login-form-button'>
          Send Reset Email
        </Button>
        <Link to='/login'>Log In</Link> Or <Link to='/signup'>Sign Up</Link>
      </Form.Item>
    </Form>
  )
}

export default ForgotPasswordForm

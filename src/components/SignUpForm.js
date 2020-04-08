import React, { useState } from 'react'
import { Checkbox } from './MyStyledComponents'
import { handleSignup } from '../services/auth'
import { openNotificationWithIcon } from './Notifications'
import { navigate, Link } from 'gatsby'
import Layout from './layout'

import { Form, Input, Button, Select } from 'antd'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

const { Option } = Select

function LoginForm () {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const signedUp = await handleSignup(values)
    if (signedUp) {
      openNotificationWithIcon('success', 'Welcome to Transcribr!')
      navigate('/app')
    } else {
      openNotificationWithIcon(
        'error',
        'Sorry, email address already taken'
      )
    }
  }

  const onFinishFailed = errorInfo => {
    setLoading(false)
    console.log('Failed:', errorInfo)
  }

  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your name' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Name' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your Email Address!' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Password'
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Link to='/forgot'>
          Forgot password
        </Link>
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type='primary' htmlType='submit' className='login-form-button'>
         Sign Up
        </Button>
        Or <Link to='/login'>Log In</Link>
      </Form.Item>
    </Form>
  )
}

export default LoginForm

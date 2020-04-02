import React, { useState } from 'react'
import { Icon, Checkbox } from './MyStyledComponents'
import { handleLogin } from '../services/auth'
import { openNotificationWithIcon } from './Notifications'
import { navigate, Link } from 'gatsby'

import { Form, Input, Button, Select } from 'antd'
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

const { Option } = Select

function LoginForm () {
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const loggedInSuccessfully = await handleLogin(values)
    if (loggedInSuccessfully) {
      openNotificationWithIcon('success', 'Logged In!')
      navigate('/app')
    } else {
      openNotificationWithIcon('error', 'Sorry, wrong email or password...')
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
          Log in
        </Button>
        Or <Link to='/signup'>Sign Up Now!</Link>
      </Form.Item>
    </Form>
  )
}

export default LoginForm

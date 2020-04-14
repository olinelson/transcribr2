import React, { useState } from 'react'
import { Checkbox } from './MyStyledComponents'
import { handleSignup } from '../services/auth'
import { navigate, Link } from 'gatsby'

import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

function LoginForm () {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    setLoading(true)
    const signedUp = await handleSignup(values)
    if (signedUp) {
      navigate('/app')
    } else {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      style={{ minWidth: 'min(20rem,90vw)' }}
      name='normal_login'
      className='login-form'
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <h1>Sign Up</h1>
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Please input your name' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Name' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Please input your Email Address!' },
          { type: 'email', message: 'Please use a valid email address' }
        ]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Email' />
      </Form.Item>
      <Form.Item
        hasFeedback
        name='password'
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 6, message: 'Password must be at least 6 characters long' },
          { pattern: '^((?!password).)*$', message: 'Password must not contain the word "password"' }
        ]}
      >
        <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Password' />
      </Form.Item>

      <Form.Item
        name='confirm'
        // label='Confirm Password'
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!'
          },
          ({ getFieldValue }) => ({
            validator (rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }

              return Promise.reject('The two passwords that you entered do not match!')
            }
          })
        ]}
      >
        <Input.Password prefix={<LockOutlined className='site-form-item-icon' />} placeholder='Confirm password' />
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

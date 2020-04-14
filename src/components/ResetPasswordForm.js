import React, { useState } from 'react'
import { handleResetPassword } from '../services/auth'
import { openNotificationWithIcon } from './Notifications'
import { navigate } from 'gatsby'
import WithLocation from './WithLocation'
import queryString from 'query-string'
import { UserOutlined } from '@ant-design/icons'

import { Form, Input, Button } from 'antd'

function ResetPasswordForm (props) {
  const [form] = Form.useForm()

  const [loading, setLoading] = useState(false)

  const { token } = queryString.parse(props.location.search)

  const onFinish = async (values) => {
    setLoading(true)
    const sent = await handleResetPassword({
      ...values,
      token
    })

    if (sent) {
      openNotificationWithIcon('success', 'Password reset, logging you  in')
      navigate('/app')
    } else {
      openNotificationWithIcon('error', 'Sorry, something went wrong')
      setLoading(false)
    }
  }

  return (
    <Form
      style={{ minWidth: 'min(15rem,90vw)' }}
      form={form}
      onFinish={onFinish}
    >
      <h1>Reset Password</h1>
      <Form.Item
        hasFeedback
        name='password'
        rules={[
          { required: true, message: 'Please input your Password!' },
          { min: 6, message: 'Password must be at least 6 characters long' },
          { pattern: '^((?!password).)*$', message: 'Password must not contain the word "password"' }
        ]}
      >
        <Input.Password placeholder='new password' />
      </Form.Item>

      <Form.Item
        name='confirm'
        // label='Confirm Password'
        className='login-form'
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
        <Input.Password placeholder='confirm new password' />
      </Form.Item>

      <Form.Item>
        <Button loading={loading} type='primary' htmlType='submit' className='login-form-button'>
          Reset
        </Button>
      </Form.Item>
    </Form>
  )
}

export default WithLocation(ResetPasswordForm)

import React, { useState } from 'react'
import { Form, Input, Button } from './MyStyledComponents'
import { handleResetPassword } from '../services/auth'
import { openNotificationWithIcon } from './Notifications'
import { navigate } from 'gatsby'
import WithLocation from './WithLocation'
import queryString from 'query-string'
import { UserOutlined } from '@ant-design/icons'

function ResetPasswordForm (props) {
  const [loading, setLoading] = useState(false)

  const token = queryString.parse(props.location.search)

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
    }
  }

  return (
    <Form
      name='normal_login'
      onFinish={onFinish}
    >
      <Form.Item
        name='password'
        rules={[{ required: true, message: 'Please input your new password!' }]}
      >
        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='New Password' />
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

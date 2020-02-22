import React from "react"
import { Form, Icon, Input, Button } from "./MyStyledComponents"
import { handleForgotPassword } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"

class ForgotPassword extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })

    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const sent = await handleForgotPassword(values)
        if (sent) {
          openNotificationWithIcon("success", "Password Reset Email Sent!")
          navigate(`/`)
        } else {
          openNotificationWithIcon("error", "Sorry, something went wrong")
        }
      }
      this.setState({ loading: false })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <h1>Reset Password</h1>
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }],
          })(
            <Input
              type="email"
              prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={this.state.loading}
          >
            Email Link
          </Button>
          Or <Link to="/login">Log in</Link>
        </Form.Item>
      </Form>
    )
  }
}

const ForgotPasswordForm = Form.create({ name: "ForgotPassword " })(
  ForgotPassword
)

export default ForgotPasswordForm

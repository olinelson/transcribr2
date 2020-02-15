import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "./MyStyledComponents"
import { handleForgotPassword } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"
import Layout from "./layout"

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
      <Layout>
        <div
          style={{
            display: "grid",
            alignItems: "center",
            justifyItems: "center",
            height: "100%",
            gridColumn: "1/-1",
            gridRow: "2",
          }}
        >
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h1>Reset Password</h1>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your email!" },
                ],
              })(
                <Input
                  type="email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
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
              Or <Link to="/app/login">Log in</Link>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    )
  }
}

const ForgotPasswordForm = Form.create({ name: "ForgotPassword " })(
  ForgotPassword
)

export default ForgotPasswordForm

import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "./MyStyledComponents"
import { handleLogin } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"

class Login extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })

    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const loggedInSuccessfully = await handleLogin(values)
        if (loggedInSuccessfully) {
          openNotificationWithIcon("success", "Logged In!")
          navigate(`/app/profile`)
        } else {
          openNotificationWithIcon("error", "Sorry, wrong email or password...")
        }
      }
      this.setState({ loading: false })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div
        style={{
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
          height: "100%",
        }}
      >
        <Form onSubmit={this.handleSubmit} className="login-form">
          <h1>Login</h1>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }],
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
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" },
              ],
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="https://www.google.com">
              Forgot password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={this.state.loading}
            >
              Log in
            </Button>
            Or <Link to="/app/signup">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login)

export default WrappedNormalLoginForm

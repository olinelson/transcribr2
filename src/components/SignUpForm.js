import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "./MyStyledComponents"
import { handleSignup } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"
import Layout from "./layout"

class SignUp extends React.Component {
  state = {
    loading: false,
  }

  handleSubmit = e => {
    this.setState({ loading: true })

    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const signedUp = await handleSignup(values)
        if (signedUp) {
          openNotificationWithIcon("success", "Welcome to Transcribr!")
          navigate(`/app`)
        } else {
          openNotificationWithIcon(
            "error",
            "Sorry, email address already taken"
          )
        }
      }
      this.setState({ loading: false })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
    
          <Form onSubmit={this.handleSubmit} className="login-form">
            <h1>Sign Up</h1>
            <Form.Item>
              {getFieldDecorator("name", {
                rules: [{ required: true, message: "Please input your name!" }],
              })(
                <Input
                  type="name"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="name"
                />
              )}
            </Form.Item>
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
                Sign Up
              </Button>
              Or <Link to="/login">Log in</Link>
            </Form.Item>
          </Form>
      
    )
  }
}

const SignUpForm = Form.create({ name: "SignUp " })(SignUp)

export default SignUpForm

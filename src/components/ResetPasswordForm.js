import React from "react"
import { Form, Icon, Input, Button, Checkbox } from "./MyStyledComponents"
import { handleResetPassword } from "../services/auth"
import { openNotificationWithIcon } from "./Notifications"
import { navigate, Link } from "gatsby"
import Layout from "./layout"
import WithLocation from "./WithLocation"
import queryString from "query-string"

class ResetPassword extends React.Component {
  state = {
    loading: false,
    search: queryString.parse(this.props.location.search),
  }

  handleSubmit = e => {
    this.setState({ ...this.state, loading: true })

    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const sent = await handleResetPassword({
          ...values,
          token: this.state.search.token,
        })

        if (sent) {
          openNotificationWithIcon("success", "Password reset, logging you  in")
          navigate(`/app`)
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
                  placeholder="New Password"
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
                Reset
              </Button>
              Or <Link to="/login">Log in</Link>
            </Form.Item>
          </Form>
        </div>
      </Layout>
    )
  }
}

const ResetPasswordForm = Form.create({ name: "ResetPassword " })(ResetPassword)

export default WithLocation(ResetPasswordForm)

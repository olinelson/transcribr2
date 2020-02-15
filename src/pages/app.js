import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/Login"
import Clip from "../components/Clip"
import SignUpForm from "../components/SignUpForm"
import ForgotPassowordForm from "../components/ForgotPasswordForm"
import ResetPasswordForm from "../components/ResetPasswordForm"
import ChangeEmailForm from "../components/ChangeEmailForm"

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/app/clip" component={Clip} />
    <Login path="/app/login" />
    <SignUpForm path="/app/signup" />
    <ForgotPassowordForm path="/app/forgot" />
    <ResetPasswordForm path="/app/reset_password" />
    <ChangeEmailForm path="/app/change_email" />
  </Router>
)

export default App

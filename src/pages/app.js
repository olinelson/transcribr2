import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/NormalLoginForm"
import Clip from "../components/Clip"
import WrappedSignUp from "../components/SignUp"

const App = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/app/profile" component={Profile} />
      <PrivateRoute path="/app/clip" component={Clip} />
      <Login path="/app/login" />
      <WrappedSignUp path="/app/signup" />
    </Router>
  </Layout>
)

export default App

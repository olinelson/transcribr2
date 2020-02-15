import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/privateRoute"
import Profile from "../components/profile"
import Login from "../components/Login"
import Clip from "../components/Clip"
import SignUpForm from "../components/SignUpForm"

const App = () => (
  <Router>
    <PrivateRoute path="/app/profile" component={Profile} />
    <PrivateRoute path="/app/clip" component={Clip} />
    <Login path="/app/login" />
    <SignUpForm path="/app/signup" />
  </Router>
)

export default App

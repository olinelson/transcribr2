import React from "react"
import LoginForm from "../components/LoginForm"
import Layout from "../components/layout"
import { isLoggedIn } from "../services/auth"
import { navigate } from "gatsby"

export default function login() {
  if (isLoggedIn()) {
    navigate("/app")
  }

  return (
    <Layout>
      <div
        style={{
          gridColumn: "1/-1",
          gridRow: "2",
          display: "grid",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <LoginForm />
      </div>
    </Layout>
  )
}

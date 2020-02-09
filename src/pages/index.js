import React from "react"
import { Link } from "gatsby"
import { isLoggedIn } from "../services/auth"

import Layout from "../components/layout"

export default () => (
  <Layout>
    <div style={{ margin: "1rem" }}>
      <h1 style={{ fontSize: "5rem" }}>Transcribr</h1>
    </div>
  </Layout>
)

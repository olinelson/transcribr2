import React from "react"

import { useStaticQuery, graphql, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Button, Divider } from "antd"
import { isLoggedIn } from "../services/auth"
import NavBar from "../components/nav-bar"

export default function IndexPage() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/wordcloudBlue.png" }) {
        childImageSharp {
          # Specify a fluid image and fragment
          # The default maxWidth is 800 pixels
          fluid(fit: CONTAIN) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <div
        style={{
          gridColumn: "1/-1",
          gridRow: "2",
          display: "grid",
          alignSelf: "center",
          justifyContent: "center",
          justifyItems: "center",
          justifySelf: "center",
        }}
      >
        <Img
          style={{ width: "90vw", maxWidth: "40rem", height: "auto" }}
          fluid={data.file.childImageSharp.fluid}
          alt="Transcribr Logo"
        />
        <h1
          style={{
            color: "#1890FF",
            textAlign: "center",
            fontSize: "10vw",
            marginBottom: "none",
          }}
        >
          transcribr<span style={{ color: "orange" }}>.</span>
        </h1>

        {isLoggedIn() ? null : (
          <div>
            <Link style={{ color: "#1890FF" }} to={"/login"}>
              Login
            </Link>
            <Divider type="vertical" style={{ background: "orange" }} />
            <Link style={{ color: "#1890FF" }} to={"/signup"}>
              Signup
            </Link>
          </div>
        )}
      </div>
    </Layout>
  )
}

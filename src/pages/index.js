import React from "react"
import { Link } from "gatsby"
import { isLoggedIn } from "../services/auth"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

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
          minHeight: "50vh",
          justifySelf: "center",
          alignSelf: "center",
          maxWidth: "40rem",
          textAlign: "center",
        }}
      >
        <Img
          fluid={data.file.childImageSharp.fluid}
          alt="Gatsby Docs are awesome"
        />
        <h1 style={{ fontSize: "5rem", color: "#1890FF" }}>
          transcribr<span style={{ color: "orange" }}>.</span>
        </h1>
      </div>
    </Layout>
  )
}

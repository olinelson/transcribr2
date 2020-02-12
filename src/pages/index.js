import React from "react"

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
          display: "grid",
          justifySelf: "center",
          alignSelf: "center",
          justifyContent: "center",
          width: "100%",
          maxWidth: "40rem",
          textAlign: "center",
        }}
      >
        <Img fluid={data.file.childImageSharp.fluid} alt="Transcribr Logo" />
        <h1
          style={{
            color: "#1890FF",
            textAlign: "center",
            fontSize: "10vw",
          }}
        >
          transcribr<span style={{ color: "orange" }}>.</span>
        </h1>
      </div>
    </Layout>
  )
}

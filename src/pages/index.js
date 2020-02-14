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
      {/* <div
        style={{
          display: "grid",
          justifySelf: "center",
          // alignSelf: "center",
          // justifyContent: "center",
          // width: "100vw",
          maxWidth: "40rem",
          textAlign: "center",
          // gridArea: "sidebar / main",
          // gridColumn: "1 / -1",
        }}
      > */}
      <div
        style={{
          gridColumn: "1/-1",
          gridRow: "2",
          // height: "100%",
          display: "grid",
          alignSelf: "center",
          justifyContent: "center",
          justifyItems: "center",
          justifySelf: "center",
        }}
      >
        <Img
          style={{ width: "90vw", maxWidth: "40rem", height: "auto" }}
          // style={{ position: "static" }}
          fluid={data.file.childImageSharp.fluid}
          alt="Transcribr Logo"
        />
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

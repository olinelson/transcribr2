import React from "react"

import { useStaticQuery, graphql, Link } from "gatsby"
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
          404
        </h1>
        <p>Hmm... sorry the page you are looking for can't be found.</p>
        <Link to={"/"}>Take me home</Link>
      </div>
    </Layout>
  )
}

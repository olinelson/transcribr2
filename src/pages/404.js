import React, { useState, useEffect } from "react"

import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import { Icon, Divider } from "antd"

export default function IndexPage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    let delay = setTimeout(() => {
      setShowMessage(true)
    }, 5000)

    return function() {
      clearTimeout(delay)
    }
  })

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
          style={{ width: "90vw", maxWidth: "20rem", height: "auto" }}
          fluid={data.file.childImageSharp.fluid}
          alt="Transcribr Logo"
        />

        {showMessage ? (
          <>
            <p> Sorry the page your looking for can't be found...</p>

            <Link style={{ color: "#1890FF" }} to={"/"}>
              Go Home
            </Link>
          </>
        ) : (
          <Icon style={{ fontSize: "5vw", color: "orange" }} type="loading" />
        )}
      </div>
    </Layout>
  )
}

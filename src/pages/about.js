import React from "react"

import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

export default function About() {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { frontmatter: { title: { regex: "/about/" } } }
      ) {
        edges {
          node {
            id
            html
            frontmatter {
              title
            }
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
          padding: "1rem",
        }}
        dangerouslySetInnerHTML={{
          __html: data.allMarkdownRemark.edges[0].node.html,
        }}
      ></div>
    </Layout>
  )
}

import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"
import WithLocation from "./WithLocation"
import { Helmet } from "react-helmet"
import { Layout, Header, Footer, Content } from "./MyStyledComponents"

// const { Header, Footer, Content } = Layout

const layout = ({ children, location }) => {
  const path = location.pathname

  return (
    <>
      <Helmet title="Transcribr" defer={false}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Helmet>
      <Layout>
        {path.includes("/app") ? null : <NavBar />}

        {children}
      </Layout>
      {path.includes("app") ? null : (
        <Footer
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            height: "10rem",
            background: "#f0f2f5",
          }}
        >
          <small>Oli Nelson ©2020</small>
        </Footer>
      )}
    </>
  )
}

export default WithLocation(layout)

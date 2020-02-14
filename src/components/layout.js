import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"
import WithLocation from "./WithLocation"

import { Layout, Header, Footer, Content } from "./MyStyledComponents"

// const { Header, Footer, Content } = Layout

const layout = ({ children, location }) => {
  const path = location.pathname

  return (
    <>
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

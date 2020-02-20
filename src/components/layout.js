import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"
import WithLocation from "./WithLocation"
import { Helmet } from "react-helmet"
import { Layout, Footer } from "./MyStyledComponents"
import moment from "moment"

const layout = props => {
  const { children, location, userProfile, setUserProfile } = props
  return (
    <>
      <Helmet title="Transcribr" defer={false}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Helmet>
      <NavBar {...props} />
      <Layout>{children}</Layout>
      {/* {path !== "/" ? null : (
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
          <small>transcribr ©{moment().year()}</small>
        </Footer>
      )} */}
    </>
  )
}

export default layout

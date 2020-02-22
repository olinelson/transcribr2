import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"
import WithLocation from "./WithLocation"
import { Helmet } from "react-helmet"
import { Layout, Footer } from "./MyStyledComponents"
import moment from "moment"
import { Alert } from "antd"
import { API_URL } from "../config"

const showEnvironmentAlert = () => {
  if (API_URL.includes("localhost")) {
    return (
      <Alert style={{ zIndex: 1000 }} message="Running on localhost" banner />
    )
  } else if (API_URL.includes("staging")) {
    return (
      <Alert
        style={{ zIndex: 1000, position: "fixed", bottom: "0", right: "0" }}
        message="Running on heroku staging"
        banner
      />
    )
  } else return null
}

const layout = props => {
  const { children, location, userProfile, setUserProfile } = props
  return (
    <>
      <Helmet title="Transcribr" defer={false}>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
      </Helmet>
      {showEnvironmentAlert()}
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

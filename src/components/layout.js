import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"
import WithLocation from "./WithLocation"

import { Layout, Header, Footer, Content } from "./MyStyledComponents"

// const { Header, Footer, Content } = Layout

const layout = ({ children, location }) => {
  const path = location.pathname

  return (
    <Layout>
      <Header style={{ gridArea: "header" }}>
        <NavBar />
      </Header>

      <Content style={{ gridArea: "content" }}>
        {/* <div
        style={{
          background: "#fff",
          border: "1rem solid #F0F2F5",
          height: "100%",
          display: "grid",
        }}
      > */}
        {children}
        {/* </div> */}
      </Content>

      {path.includes("/app") ? null : (
        <Footer style={{ textAlign: "center", gridArea: "footer" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      )}
    </Layout>
  )
}

export default WithLocation(layout)

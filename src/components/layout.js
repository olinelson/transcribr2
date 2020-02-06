import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"

import { Layout, Header, Footer, Content } from "./MyStyledComponents"

// const { Header, Footer, Content } = Layout

const layout = ({ children }) => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <NavBar />
    </Header>
    <Content>
      <div
        style={{
          background: "#fff",
          padding: "1rem",
          minHeight: "80vh",
          display: "grid",
        }}
      >
        {children}
      </div>
    </Content>
    {/* <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer> */}
  </Layout>
)

export default layout

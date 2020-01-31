import React from "react"
import "antd/dist/antd.css"
import NavBar from "./nav-bar"

import { Layout } from "./MyStyledComponents"

const { Header, Footer, Content } = Layout

const _layout = ({ children }) => (
  // <Layout>
  //   <Header>
  //     <NavBar />
  //   </Header>
  //   <Content>{children}</Content>
  //   <Footer>Footer</Footer>
  // </Layout>

  <Layout className="layout">
    <Header>
      <div className="logo" />
      <NavBar />
    </Header>
    <Content style={{ padding: "1.5rem" }}>
      {/* <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
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
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  </Layout>
)

export default _layout

import React from "react";
import { Layout } from "antd";
// import Sidebar from './Sidebar';
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import AppDrawer from "./AppDrawer";
import Content from "./Content";

const AppLayout = ({ children, noSidebar = false, title, selectedKey }) => {
  return (
    <Layout
      style={{
        minHeight: 800,
        background: "linear-gradient(180deg,#0e131d,#060a10 30.65%)",
        height: "100%",
      }}
    >
      <Content fullWidth>
        <Navbar />
        <AppDrawer />
        <div style={{ minHeight: "70vh" }}>{children}</div>
        <AppFooter />
      </Content>
    </Layout>
  );
};

export default AppLayout;

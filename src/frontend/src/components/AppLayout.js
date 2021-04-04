import React from "react";
import { Layout } from "antd";
// import Sidebar from './Sidebar';
import Navbar from "./Navbar";
import AppFooter from "./AppFooter";
import AppDrawer from "./AppDrawer";
import Content from "./Content";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IYC59AnhtwcEx8tWZAbkKzt2A3K3aAEM22eXqphEhch2jINL7sQT6U8YNh148GdhWhHP9vFrYSwuPvJIOIvWcjQ00dkdSKlip');

const AppLayout = ({ children, noSidebar = false, title, selectedKey }) => {
  return (
    <Elements stripe={stripePromise}>
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
    </Elements>
  );
};

export default AppLayout;

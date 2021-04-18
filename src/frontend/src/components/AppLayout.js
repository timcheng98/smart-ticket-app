import React from "react";
import { Layout } from "antd";
import Navbar from "./Navbar";
import Content from "./Content";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51IYC59AnhtwcEx8tWZAbkKzt2A3K3aAEM22eXqphEhch2jINL7sQT6U8YNh148GdhWhHP9vFrYSwuPvJIOIvWcjQ00dkdSKlip');

const AppLayout = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      <Layout
        style={{
          minHeight: 800,
          background: "#fff",
          height: "100%",
        }}
      >
        <Content fullWidth>
          <Navbar />
          <div style={{ minHeight: "70vh" }}>{children}</div>
        </Content>
      </Layout>
    </Elements>
  );
};

export default AppLayout;

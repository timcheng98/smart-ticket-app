import React from 'react';
import { Layout, PageHeader } from 'antd';
// import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AppFooter from './AppFooter';
import AppDrawer from './AppDrawer';
import Content from './Content'

// const { Content } = Layout;

const AppLayout = ({
  children,
  noSidebar = false,
  title,
  selectedKey
}) => {
  return (
    <Layout style={{minHeight: 800, background: 'linear-gradient(180deg,#0e131d,#060a10 30.65%)', height: '100%'}}>
      <Content fullWidth>
        <Navbar />
        <AppDrawer />
        {children}
        <AppFooter />
      </Content>
    </Layout>
  )
}

const styles = {
  body: {
    // backgroundColor: 'linear-gradient(180deg,#0e131d,#060a10 30.65%)',
    // padding: 20,
    // marginBottom: 80,
    // paddingBottom: 80
    minHeight: 800
  }
}

export default AppLayout;

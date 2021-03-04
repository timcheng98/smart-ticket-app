import React, { useState } from 'react';
import {
  Layout, Row, Col, List, 
} from 'antd';
import Content from './Content';
import { Link } from 'react-router-dom';
import Logo from './Logo'

const { Footer } = Layout;

const linkData = [
  { name: 'Latest Events', url: '/events' },
  // { name: 'logistics_rules', url: '/logistics' },
  // { name: 'return_policy', url: '/returns' }
  // {name: '關於我們', url: '/contact'},
  // {name: '送貨需知', url: 'logistics'},
  // {name: '退貨需知', url: '/returns'},
  // {name: '隱私', url: '/privacy'},
  // {name: '條款及細則', url: '/terms'}
]

const serviceData = [
  { name: 'My Wallet', url: '/account' },
  // { name: 'order_guideline', url: '/order_guideline' },
]

const aboutUsData = [
  { name: 'About Us', url: '/about_us' },
  { name: 'Contact Us', url: '/contact' },
]
const AppFooter = (props) => {
  // const meta = useSelector((state) => state.app.client.meta);
  return (
    <>
      <Content fullWidth>
        <UpperFooter />
      </Content>
      <Content fullWidth>
        <LowerFooter />
      </Content>
    </>
  )
}

const UpperFooter = (props) => {
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  const shopInfo = () => {
    return (
      <div style={{ paddingBottom: 30 }}>
        <span className="hyperlink">
          <div style={{
            width: '80%', maxWidth: 150, paddingBottom: 20, height: 120
          }}
          >
            <Logo />
          </div>
        </span>
      </div>
    )
  }
  const AboutUs = () => {
    return (
      <div style={{ marginBottom: 30 }}>
        <p style={styles.text, { fontWeight: 'bold', color: '#7e96b8', fontSize: 14 }}>Our Company</p>
        <List
          size="small"
          split={false}
          itemLayout="horizontal"
          dataSource={aboutUsData}
          renderItem={(item) => {
            return (
              <List.Item
                style={{
                  ...styles.text, padding: '0 0 10px 0', fontSize: 14, cursor: 'pointer'
                }}
                key={item.category_id}
              >
                <Link to={item.url}>
                  <span className="hyperlink" style={{ color: '#7e96b8' }}>
                    {item.name}
                  </span>
                </Link>
              </List.Item>
            )
          }}
        />
      </div>
    )
  }

  const shopService = () => {
    return (
      <div style={{ marginBottom: 30 }}>
        <p style={styles.text, { fontWeight: 'bold', color: '#7e96b8', fontSize: 14 }}>Account Information</p>
        <List
          size="small"
          split={false}
          itemLayout="horizontal"
          dataSource={serviceData}
          renderItem={(item) => {
            // if (item.name === 'account') {
            //   if (user.user_id === 0) {
            //     return (
            //       <List.Item
            //         style={{
            //           ...styles.text, padding: '0 0 10px 0', fontSize: 14, cursor: 'pointer'
            //         }}
            //         key={item.category_id}
            //         onClick={() => setLoginModalVisible(true)}
            //       >
            //         <span  className="hyperlink" style={{color: '#7e96b8'}}>{item.name}</span>
            //       </List.Item>
            //     )
            //   }
            // }
            return (
              <List.Item
                style={{
                  ...styles.text, padding: '0 0 10px 0', fontSize: 14, cursor: 'pointer'
                }}
                key={item.category_id}
              >
                <Link to={item.url}>
                  <span className="hyperlink" style={{ color: '#7e96b8' }}>
                    {item.name}
                  </span>
                </Link>
              </List.Item>
            )
          }}
        />
      </div>
    )
  }

  const usedLink = () => {
    return (
      <div>
        <Link to="/terms">
          <p style={{ ...styles.text }}>
            <span className="hyperlink" style={{ color: '#7e96b8', fontWeight: 'bold', fontSize: 14 }}>
              Useful Link
            </span>
          </p>
        </Link>
        <List
          itemLayout="horizontal"
          dataSource={linkData}
          split={false}
          renderItem={(item) => (
            <List.Item style={{
              ...styles.text, padding: '0 0 10px 0', fontSize: 14, cursor: 'pointer'
            }}
            >
              <Link to={item.url}>
                <span className="hyperlink" style={{ color: '#7e96b8' }}>{item.name}</span>
              </Link>
            </List.Item>
          )}
        />
      </div>
    )
  }

  return (
    <Content>
      <Footer style={styles.upperFooter}>
        <Row justify="center">
          <Col xs={24} sm={24} md={5} lg={5} style={{ textAlign: 'left' }}>
            {shopInfo()}
          </Col>
          <Col xs={24} sm={24} md={5} lg={5} style={{ textAlign: 'left' }}>
            {AboutUs()}
          </Col>
          <Col xs={24} sm={24} md={5} lg={5} style={{ textAlign: 'left' }}>
            {shopService()}
          </Col>
          <Col xs={24} sm={24} md={5} lg={5} style={{ textAlign: 'left', paddingBottom: 20 }}>
            {usedLink()}
          </Col>
          <Col xs={24} sm={24} md={4} lg={4} style={{ textAlign: 'left', paddingBottom: 20 }}>
            {/* <img src="/img/alipay_hk.svg" style={{width: '100%', maxWidth: 30, marginRight: 30}} alt="alipay payment" />
            <img src="/img/payme.svg" style={{width: '100%', maxWidth: 30, marginRight: 30}} alt="payme payment" />
            <img src="/img/fps.svg" style={{width: '100%', maxWidth: 30}} alt="fps payment" /> */}
            {/* <MediaGroup mode="dark" whatsapp/> */}
          </Col>
        </Row>
      </Footer>
      {/* <Modal
        visible={loginModalVisible}
        style={{ maxWidth: 500 }}
        width="90%"
        bodyStyle={{padding: 0, paddingTop: 30}}
        footer={null}
        onCancel={() => setLoginModalVisible(false)}
      >
        <UserLoginRegistration />
      </Modal> */}
    </Content>
  )
}

const LowerFooter = (props) => {
  // const [t, i18n] = useTranslation(['footer']);

  return (
    <Content>
      <Footer style={styles.lowerFooter}>
        <Row justify="space-around">
          {/* Mobile */}
          <Col xs={24} sm={24} md={0} lg={0} style={{ textAlign: 'left', paddingBottom: 10 }}>
            <Link to="/terms">
              <span
                style={{
                  color: '#7e96b8', fontSize: 14, marginBottom: 0, marginRight: 20
                }}
                className="hyperlink"
              >
                Terms of Services
              </span>
            </Link>
            <Link to="/privacy">
              <span
                className="hyperlink"
                style={{ color: '#7e96b8', fontSize: 14, marginBottom: 0 }}
              >
                Privacy Policy
              </span>
            </Link>
          </Col>
          <Col xs={24} sm={24} md={0} lg={0} style={{ textAlign: 'left' }}>
            <p style={{ color: '#7e96b8', fontSize: 14, marginBottom: 0 }} >
              Smart Ticket &copy; 2021 Reserved All Rights
            </p>
          </Col>
          {/* Mobile */}

          {/* Desktop */}
          <Col xs={0} sm={0} md={12} lg={12} style={{ textAlign: 'left' }}>
            <p style={{ color: '#7e96b8', fontSize: 14, marginBottom: 0 }}>
              Smart Ticket &copy; 2021 Reserved All Rights
            </p>
          </Col>
          <Col xs={0} sm={0} md={12} lg={12} style={{ textAlign: 'right' }}>
            <Link to="/terms">
              <span
                style={{
                  color: '#7e96b8', fontSize: 14, marginBottom: 0, marginRight: 20
                }}
                className="hyperlink"
              >
                Terms of Services
              </span>
            </Link>
            <Link to="/privacy">
              <span
                className="hyperlink"
                style={{ color: '#7e96b8', fontSize: 14, marginBottom: 0 }}
              >
                Privacy Policy
              </span>
            </Link>
          </Col>
          {/* Desktop */}
        </Row>
      </Footer>
    </Content>
  )
}

const styles = {
  text: {
    // fontWeight: 'bold',
    fontSize: 14,
    color: '#f9f9f9'
  },
  upperFooter: {
    textAlign: 'center',
    margin: 0,
    padding: '50px 5% 30px 5%',
    paddingBottom: 0,
    backgroundColor: 'transparent'
    // backgroundColor: '#7e96b8',
  },
  lowerFooter: {
    textAlign: 'center',
    margin: 0,
    padding: '10px 5% 30px 5%',
    backgroundColor: 'transparent'
    // marginLeft: '5%',
    // marginRight: '5%',
    // backgroundColor: '#7e96b8',
  },
  icon: {
    color: '#FFFFFF',
    marginRight: 50,
    fontSize: 24,
    transform: 'translateY(20%)'
  }
}

export default AppFooter

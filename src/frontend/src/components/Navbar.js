import React, { useState, useEffect } from 'react';
import {
  Layout, Menu, Avatar, Row, Col
} from 'antd';
import { useDispatch } from 'react-redux';
import * as CommonAction from '../redux/actions/common'
import Logo from './Logo';
import _ from 'lodash';
import { Link } from 'react-router-dom';
// import * as Service from '../core/Service';
import { useSelector } from 'react-redux';
import {
  MenuOutlined
} from '@ant-design/icons'


const { Header } = Layout;

const Navbar = (props) => {
  const app = useSelector(state => state.app);
  // const [name, setName] = useState('');
  const dispatch = useDispatch();
  // useEffect(() => {
  //   if (!_.isEmpty(app.admin)) {
  //     setName(app.admin.first_name[0]?.toUpperCase());
  //   }

  //   if (!_.isEmpty(app.company_admin)) {
  //     setName(app.company_admin.first_name[0].toUpperCase());
  //   }
  // }, [app])
  return (
    <Header style={styles.container}>
      <Row justify="space-between" align="middle" style={styles.row}>

        {/* Mobile Version */}
        <Col xs={6} sm={6} md={0} lg={0} xl={0}>
            <MenuOutlined style={{...styles.icon, color: '#4b607e', fontSize: 20 }} onClick={() => {
              dispatch(CommonAction.setDrawerVisible(true));
            }} />
          </Col>
          <Col xs={6} sm={6} md={0} lg={0} xl={0}>
            <Row justify="center">
              <Col style={{
                // width: '100%', minWidth: 120, paddingTop: 10, paddingBottom: 10, height: 60
              }}
              >
                <Logo />
              </Col>
            </Row>
          </Col>
        <Col xs={6} sm={6} md={0} lg={0} xl={0}>
            {/* <Row justify="end" align="middle">
              <Col>
                <Link to="/shopping_cart" as="/shopping_cart">
                  <ShoppingCartOutlined style={{...styles.icon, marginRight: 0}} />
                </Link>
              </Col>
            </Row> */}
        </Col> 

        <Col xs={0} sm={0} md={6} lg={5} xl={4}>
          {/* <div style={{height: 40, maxHeight: 40}}> */}
            <Logo />
          {/* </div> */}
        </Col>
        <Col xs={0} sm={0} md={6} lg={5} xl={4}>
          <Row justify="space-between" style={{color: '#fff'}}>
            <Link to="/events">
              <Col style={{color: '#4b607e', fontWeight: '500', fontSize: 16}}>Events</Col>
            </Link>
            <Link to="/account">
              <Col style={{color: '#4b607e', fontWeight: '500', fontSize: 16}}>Account</Col>
            </Link>
            <Link to="/">
              <Col style={{color: '#4b607e', fontWeight: '500', fontSize: 16}}>Login</Col>
            </Link>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={12} lg={14} xl={16}>
          {/* <Menu
            theme="dark"
            mode="horizontal"
            style={styles.menu}
          > */}
            {/* <Menu.Item>
              <Avatar>{name}</Avatar>
            </Menu.Item> */}
            {/* <Menu.Item
              onClick={async () => {
                dispatch(CommonAction.setAuth(false))
                dispatch(CommonAction.setCompanyAdmin({}))
                dispatch(CommonAction.setAdmin({}))
                dispatch(CommonAction.setIsAdmin({admin_id: 0}))
                Service.logout();
                
              }}
            >
            <Link to="/admin/login">Logout</Link>
            </Menu.Item> */}
          {/* </Menu> */}
        </Col>
      </Row>
    </Header>
  )

}

const styles = {
  container: {
    backgroundColor: '#ffffff00',
    // boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
    // marginBottom: 4,
    height: 80
  },
  row: {
    height: '100%'
  },
  menu: {
    background: 'transparent' 
  }
}

export default Navbar;

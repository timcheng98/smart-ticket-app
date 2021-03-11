import React, { useState, useEffect } from 'react'
import {
  Divider, Layout, Menu, Select, Popconfirm, Row, Col, Input, Button, Drawer, Badge, Modal
} from 'antd';
import {
  ShoppingCartOutlined,
  HeartFilled,
  FacebookFilled,
  SearchOutlined,
  TwitterCircleFilled,
  InstagramFilled
} from '@ant-design/icons'
import _ from 'lodash';
// import debugLib from 'debug';
import { useSelector, useDispatch } from "react-redux";
import { setDrawerVisible } from '../redux/actions/common';
import { Link } from 'react-router-dom';
// import { Link, useTranslation, LanguageList, Router } from '../lib-client/i18n';
// import { openNotificationWithIcon, onFinishFailed } from '../components/form/ErrorMessage'
// import * as TNBaseComponentMethods from '../TNCore/TNBaseComponentMethods';
// import * as Service from '../lib-client/service';
// import UserLoginRegistration from '../pages/login_register'
// import MediaGroup from './MediaGroup';

const { Sider } = Layout;
const { Option } = Select;
const { Search } = Input;

const AppDrawer = (props) => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  let drawerVisible = useSelector((state) => state.app.drawerVisible);
  let app = useSelector((state) => state.app);
  // let user = useSelector((state) => state.app.user);
  // const [t, i18n] = useTranslation(['header', 'footer', 'common', 'homepage']);

  useEffect(() => {

    setVisible(drawerVisible)
  }, [drawerVisible])

  // const categories = useSelector((state) => state.app.client.header.categories)

  // const renderTextButton = () => {
  //   const categoryButtons = [];
  //   categories.map((item) => {
  //     return categoryButtons.push((
  //       <Menu.Item
  //         key={`${item.category_id}`}
  //         onClick={() => {
  //           dispatch(setDrawerVisible(false));
  //         }}
  //         style={{padding: 0, marginLeft: 20}}
  //         className="hyperlink"
  //       >
  //         <Link to="/productlist/[category_id]" as={`/productlist/${item.category_id}`}>
  //           <Button type="text" className="hyperlink" style={{color: '#2B2B2B'}}>
  //             {item.category_name}
  //           </Button>
  //         </Link>
  //       </Menu.Item>
  //     ));
  //   });
  //   return (
  //     <Menu
  //       // onClick={this.handleClick}
  //       style={{ width: 256 }}
  //       defaultSelectedKeys={['1']}
  //       // defaultOpenKeys={['sub1']}
  //       closable
  //       mode="inline"
  //     >
  //       <Menu.SubMenu
  //         className="hyperlink drawer-submenu"
  //         key="sub1"
  //         style={{ paddingLeft: 0}}
  //         title={(
  //           <Button
  //             type="text"
  //           >
  //             {t('homepage:product_category')}
  //           </Button>
  //         )}
  //       >
  //         {categoryButtons}
  //       </Menu.SubMenu>
  //     </Menu>
  //   );
  // };

  return (
    <Drawer
      placement="left"
      closable
      onClose={() => { dispatch(setDrawerVisible(false)) }}
      visible={visible}
      key="left"
      bodyStyle={{ padding: 0, paddingBottom: 50, backgroundColor: '#060a10' }}
      drawerStyle={{ padding: 0 }}
    >
      <Row style={{ marginTop: 60, maxWidth: '100%' }}>
        <Col xs={20} offset={1}>
          <Search
            defaultValue=""
            style={{ marginBottom: 8 }}
            placeholder="Search..."
            enterButton={(
              <Button
                icon={(<SearchOutlined />)}
                style={{
                  backgroundColor: '#ffffff',
                  color: '#4b607e'
                }}
              />
            )}
          />
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Home
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/events">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Latest Events
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/marketplace">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Marketplace
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/account">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              My Wallet
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/contact">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              About Us
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/contact">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Contact Us
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/terms">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Terms & Conditions
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        <Col xs={24}>
          <Link to="/privacy">
            <Button
              style={styles.text}
              className="hyperlink"
              type="text"
              onClick={() => {
                dispatch(setDrawerVisible(false));
              }}
            >
              Privacy Policy
            </Button>
          </Link>
        </Col>
        <Divider style={{ margin: '10px 0px' }} />
        {/* <Col xs={24}>
          {renderTextButton()}
        </Col> */}

        {/* <Col xs={24}>
          {user.isUser ? (
            <Button
              className="hyperlink"
              type="text"
              onClick={async () => {
                dispatch(setDrawerVisible(false));
                const response = await Service.call('get', '/api/auth/logout');
                if (response.status === 1) {
                  openNotificationWithIcon('success', t('common:Success'), "");
                }
                dispatch(setUser({user_id: 0, admin_id: 0}))
                Router.push('/')
              }}
            >
              登出
            </Button>
          )
            : (
              <Button
                type="text"
                onClick={() => {
                  dispatch(setDrawerVisible(false));
                  setModalVisible(true);
                }}
              >
                {t('signin_sign_up')}
              </Button>
            )}
        </Col> */}
        {/* <Divider style={{margin: '10px 0px'}} />
        <Col xs={23} offset={1} style={{padding: 5}}>
          <MediaGroup mode="dark" whatsapp />
        </Col> */}
      </Row>
    </Drawer>
  )
}

// const LanguageSelect = () => {
//   const [t, i18n] = useTranslation();
//   return (
//     <Select
//       defaultValue={i18n.language}
//       style={{ width: 130, marginRight: '10px' }}
//       onChange={(val) => i18n.changeLanguage(val)}
//       size="small"
//     >
//       {
//         _.map(LanguageList, (val, key) => {
//           return (
//             <Option key={key} value={key}>{val}</Option>
//           )
//         })
//       }
//     </Select>
//   )
// }

const styles = {
  icon: {
    color: '#7e96b8',
    marginRight: 20,
    fontSize: 20,
    transform: 'translateY(20%)'
  },
  text: {
    color: '#7e96b8',
    fontSize: 16,
  }
}

export default AppDrawer;

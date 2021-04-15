import React from "react";
import { Layout, Row, Col } from "antd";
import { useDispatch } from "react-redux";
import * as CommonAction from "../redux/actions/common";
import Logo from "./Logo";
import _ from "lodash";
import { Link } from "react-router-dom";
// import * as Service from '../core/Service';
import { useSelector } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";

const { Header } = Layout;

const Navbar = (props) => {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();

  return (
    <Header style={styles.container}>
      <Row align="middle" style={styles.row}>
        {/* Mobile Version */}
        <Col xs={24} sm={24} md={0} lg={0} xl={0}>
          <Row>
            <Col xs={6} sm={6} md={0} lg={0} xl={0}>
              <MenuOutlined
                style={{ ...styles.icon, color: "#7e98b8", fontSize: 26, }}
                onClick={() => {
                  dispatch(CommonAction.setDrawerVisible(true));
                }}
              />
            </Col>
            <Col xs={12} sm={12} md={0} lg={0} xl={0}>
              <Row justify="center">
                <Col>
                  <Logo />
                </Col>
              </Row>
            </Col>
            <Col xs={6} sm={6} md={0} lg={0} xl={0}>

            </Col>
          </Row>
        </Col>
        <Col xs={0} sm={0} md={24} lg={24} xl={24}>
          <Row>
            <Col xs={0} sm={0} md={6} lg={5} xl={4}>
              <Logo />
            </Col>
            <Col xs={0} sm={0} md={16} lg={14} xl={10}>
              <Row justify="space-between" style={{ color: "#fff" }}>
                <Link to="/events">
                  <Col
                    style={{
                      color: "#7e96b8",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Events
                  </Col>
                </Link>
                <Link to={`/${user.user_id > 0 ? 'account' : 'sign'}`}>
                  <Col
                    style={{
                      color: "#7e96b8",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Account
                  </Col>
                </Link>
                <Link to="/marketplace">
                  <Col
                    style={{
                      color: "#7e96b8",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Marketplace
                  </Col>
                </Link>
                <Link to="/transaction">
                  <Col
                    style={{
                      color: "#7e96b8",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Transaction
                  </Col>
                </Link>
                <Link to="/company/verify">
                  <Col
                    style={{
                      color: "#7e96b8",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                  >
                    Company Info.
                  </Col>
                </Link>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Header>
  );
};

const styles = {
  container: {
    backgroundColor: "#ffffff00",
    // boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
    // marginBottom: 4,
    height: 80,
    padding: 20
  },
  row: {
    height: "100%",
  },
  menu: {
    background: "transparent",
  },
};

export default Navbar;

import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Typography,
  Divider,
  Tabs,
  Table,
  Form,
  Button,
  Input,
  Radio,
  message,
  Modal,
} from "antd";
import {
  ShoppingOutlined, CloseOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import * as CommonActions from '../redux/actions/common'
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { } from "@ant-design/icons";
import logo from "../assets/eth_logo.png";
import FormUploadFile from '../components/FormUploadFile'
import * as Service from '../../src/core/Service'
import AppLayout from "../components/AppLayout";

const { Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Marketplace = () => {
  const [eventArr, setEventArr] = useState([]);
  const [ticketArr, setTicketArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const user = useSelector(state => state.app.user)

  const [modalVisible, setModalVisible] = useState(false);
  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('');

  useEffect(() => {
    setLoading(true);
    setTicket();
    setLoading(false);
  }, []);

  const setTicket = async () => {
    let tickets = await Service.call("get", "/api/sc/event/ticket");
    let events = await Service.call("get", "/api/sc/event");
    console.log(tickets[1]);
    setDataSource(tickets[1]);
    setEventArr(events);
  };

  const getColumn = () => {
    return [
      {
        title: '',
        dataIndex: 'ticketId',
        render: (val, record) => {
          return (<ShoppingOutlined onClick={() => {
            setSelectedTicket(record)
            setModalVisible(true);
          }} style={{ fontSize: 20, color: '#fff' }} />)
        }
      },
      {
        title: 'Area',
        dataIndex: 'area',
      },
      {
        title: 'Type',
        dataIndex: 'type',
      },
      {
        title: 'Position',
        dataIndex: 'seat',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (value) => `$${value}`
      },
    ]
  }
  return (
    <AppLayout>
      <Row justify="center" style={{ marginTop: 60 }}>
        <Col xs={22} sm={22} md={8} lg={8}>
          <Button
            size="large"
            style={{ width: '100%', fontSize: 16, height: 50 }}
            className="custom-button"
            onClick={() => {
              if (user.user_id <= 0) return message.warning('Please Login First.')
              setSellModalVisible(true)
            }}
          >
            Sell Your Ticket
            </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col xs={22} sm={22} md={14} lg={14}>
          <Table
            className="custom-table"
            rowKey="ticketId"
            scroll={{ x: true }}
            dataSource={dataSource}
            columns={getColumn()}
          >

          </Table>
        </Col>
      </Row>
      <Modal
        title={'Sell Ticket'}
        className="custom-modal"
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
        style={{ maxWidth: 600, padding: '40px 40px', backgroundColor: 'transparent' }}
        bodyStyle={{ backgroundColor: '#0e131d', padding: '40px 40px', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        width={'100%'}
        st
        visible={sellModalVisible}
        footer={null}
        onCancel={() => { setSellModalVisible(false) }}
      >
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Form
              layout="vertical"
              className="custom-form"
            >
              <Form.Item
                label="Event Name"
                name="eventId"
              >
                <Select size="large" dropdownClassName="custom-dropdown" placeholder="Please Select" style={{ color: '#fff', width: '100%' }}>
                  <Option>xxx</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Ticket Name"
                name="ticketId"
              >
                <Select size="large" dropdownClassName="custom-dropdown" placeholder="Please Select" style={{  color: '#fff', width: '100%' }}>
                  <Option>xxx</Option>
                </Select>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <Button loading={false} size="large" style={{ width: '100%', height: 60, fontSize: 24 }} className="custom-button">Confirm</Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={'xxx Concert'}
        className="custom-modal"
        centered
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
        style={{ maxWidth: 600, padding: '40px 40px', backgroundColor: 'transparent' }}
        bodyStyle={{ backgroundColor: '#0e131d', padding: '40px 40px', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        width={'100%'}
        st
        visible={modalVisible}
        footer={null}
        onCancel={() => { setModalVisible(false) }}
      >
        <Form
          className="custom-form ticket-form"
          layout="vertical"
          style={{ textAlign: 'center' }}
        >
          <Row justify="center" style={{ textAlign: 'center', marginBottom: 40 }}>
            <Col
              xs={24}
              sm={24}
              md={16}
              lg={12}
              style={{ color: '#fff', fontSize: 24, border: '1px solid #fff', padding: '10px 20px' }}
            >
              {selectedTicket.seat}

            </Col>
          </Row>
          <Row style={{ textAlign: 'center', marginBottom: 20 }}>
            <Col span={8}>
              <Form.Item
                style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}
                label="Area"
              >
                {selectedTicket.area}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Type"
                style={{ color: '#fff', fontSize: 16 }}
              >
                {selectedTicket.type}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Price"
                style={{ color: '#fff', fontSize: 16 }}
              >
                {selectedTicket.price}
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={22} sm={22} md={14} lg={12}>
              <Button onClick={() => {
                if (user.user_id <=0) return message.warning('Please Login First.');
              }} size="large" style={{ width: '100%', borderRadius: 24, height: 45 }} className="custom-button">Checkout</Button>
            </Col>
          </Row>

        </Form>
      </Modal>
    </AppLayout>
  )
}

export default Marketplace;
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
  Spin
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
  const [eventArr, setEventArr] = useState({});
  const [ticketArr, setTicketArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initLoading, setinitLoading] = useState(false);
  const [dataSource, setDataSource] = useState([])
  const user = useSelector(state => state.app.user)

  const [sellTicketForm] = Form.useForm();
  const [filterForm] = Form.useForm();
  const [filterEventId, setFilterEventId] = useState(null)
  const [ownerTickets, setOwnerTickets] = useState({})

  const [modalVisible, setModalVisible] = useState(false);
  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  const [marketplaceTickets, setMarketplaceTickets] = useState({})
  const [marketplaceTicketsMapEventId, setMarketplaceTicketsMapEventId] = useState({})
  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    setinitLoading(true);
    let tickets = await Service.call("get", "/api/sc/event/ticket/marketplace");
    let events = await Service.call("get", "/api/sc/event");
    setEventArr(_.keyBy(events, 'eventId'));
    console.log('tickets', tickets);
    setMarketplaceTickets(_.keyBy(tickets, 'ticketId'))
    setMarketplaceTicketsMapEventId(_.keyBy(tickets, 'eventId'))
    setDataSource(tickets);
    setinitLoading(false)
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
        title: 'Event',
        dataIndex: 'eventId',
        render: (value) => eventArr[value].name
      },
      {
        title: 'Area',
        dataIndex: 'area',
      },
      // {
      //   title: 'Type',
      //   dataIndex: 'type',
      // },
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

  const sellTicket = async () => {
    setLoading(true)
    if (ticketId === -1) return message.warning('ticket not found');
    if (user.user_wallet === '') return message.warning('wallet not found');

    let result = await Service.call('post', '/api/sc/event/ticket/marketplace/sell', {
      seller: user.wallet_address,
      ticketId
    })

    setLoading(false);
    if (result.status <= 0) return message.error(result.errorMessage);
    setSellModalVisible(false);
    message.success('successful put your ticket on marketplace.');
    await getTickets();
  }

  const buyTicket = async () => {
    setLoading(true)
    if (user.user_id <= 0) return message.warning('Please Login First.');
    let result = await Service.call('post', '/api/sc/event/ticket/marketplace/buy', {
      buyer: user.wallet_address,
      ticketId: selectedTicket.ticketId
    })
    setLoading(false);
    if (result.status <= 0) return message.error(result.errorMessage);
    setModalVisible(false);
    message.success('successful put your ticket on marketplace.');
    await getTickets();
  }

  console.log(_.keyBy([marketplaceTicketsMapEventId[filterEventId]], 'area'))
  console.log(marketplaceTicketsMapEventId[filterEventId])
  return (
    <AppLayout>
      <Row justify="center" style={{ marginTop: 60 }}>
        <Col xs={22} sm={22} md={8} lg={8}>
          <Button
            size="large"
            style={{ width: '100%', fontSize: 16, height: 50 }}
            className="custom-button"
            onClick={async () => {
              if (user.user_id <= 0) return message.warning('Please Login First.');
              setSellModalVisible(true)
              sellTicketForm.setFieldsValue({ ticketId: null })
              setLoading(true);
              let tickets = await Service.call('post', '/api/sc/event/ticket/owner', { address: user.wallet_address });
              setOwnerTickets(tickets);
              setLoading(false);
            }}
          >
            Sell Tickets
            </Button>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 30 }}>
        <Col span={14}>
          <Form
            layout="vertical"
            style={{ width: '100%' }}
            className="custom-form"
            form={filterForm}
            wrapperCol={{ span: 24 }}
          >
            <Row gutter={[24, 0]}>

              <Col span={6}>
                <Form.Item
                  label="Event"
                  name="event_id"
                >
                  <Select
                    onChange={(value) => setFilterEventId(value)}
                    dropdownClassName="custom-dropdown" style={{ width: '100%' }} className="custom-input">
                    {_.map(eventArr, (item) => {
                      if (marketplaceTicketsMapEventId[item.eventId]) {
                        return <Option placeholder="Event" value={item.eventId}>{item.name}</Option>
                      }
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Area"
                  name="area"
                >
                  <Select dropdownClassName="custom-dropdown" style={{ width: '100%' }} className="custom-input">
                    {(filterEventId !== null) && _.map(_.keyBy([marketplaceTicketsMapEventId[filterEventId]], 'area'), (item) => {
                      return <Option placeholder="Event" value={item.ticketId}>{item.area}</Option>
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label=" "
                >
                  <Button className="custom-button">Search</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row justify="center" style={{ marginTop: 10 }}>
        <Col xs={22} sm={22} md={14} lg={14}>
          <Table
            loading={initLoading}
            className="custom-table"
            rowKey="ticketId"
            scroll={{ x: true }}
            dataSource={dataSource}
            columns={getColumn()}
          />
        </Col>
      </Row>
      <Modal
        title={'Sell Ticket'}
        className="custom-modal"
        closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
        style={{ maxWidth: 600, padding: '40px 40px', backgroundColor: 'transparent' }}
        bodyStyle={{ backgroundColor: '#0e131d', padding: '40px 40px', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}
        width={'100%'}
        visible={sellModalVisible}
        footer={null}
        onCancel={() => { setSellModalVisible(false); }}
      >
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Form
              layout="vertical"
              className="custom-form"
              form={sellTicketForm}
            >
              <Form.Item
                label="Event Name"
                name="eventId"
              >
                <Spin spinning={loading}>

                  <Select
                    size="large"
                    value={selectedEvent}
                    onChange={(value) => {
                      setSelectedEvent(value);
                      sellTicketForm.setFieldsValue({ ticketId: null })
                    }}
                    dropdownClassName="custom-dropdown"
                    placeholder="Please Select"
                    style={{ color: '#fff', width: '100%' }}
                  >
                    {_.map(ownerTickets, (item, key) => {
                      return (
                        <Option value={key}>{item.event.name}</Option>
                      )
                    })}
                  </Select>
                </Spin>
              </Form.Item>
              <Form.Item
                label="Ticket"
                name="ticketId"
              >
                <Select
                  size="large"
                  // value={ticketId}
                  // defaultValue={ticketId}
                  dropdownClassName="custom-dropdown"
                  placeholder="Please Select"
                  style={{ color: '#fff', width: '100%' }}
                  onChange={(value) => setTicketId(value)}
                >
                  {selectedEvent !== null && _.map(ownerTickets[selectedEvent].tickets, (item) => {
                    return (
                      <Option
                        disabled={!_.isEmpty(marketplaceTickets[item.ticketId])}
                        value={_.toInteger(item.ticketId)}
                      >
                        {!_.isEmpty(marketplaceTickets[item.ticketId]) && '[ Selling ]'} {item.area} | {item.seat} | ${item.price}
                      </Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                label="Receiving Account - Credit Card Number"
                name="credit_card_account"
                initialValue={user.credit_card_number}
              >
                <Input disabled size="large" style={{backgroundColor: 'transparent', color: '#fff'}} placeholder="Credit Card Account Number" />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={12}>
            <Button
              loading={loading}
              size="large"
              style={{ width: '100%', height: 60, fontSize: 24 }}
              className="custom-button"
              onClick={sellTicket}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={!_.isEmpty(eventArr[selectedTicket.eventId]) && eventArr[selectedTicket.eventId].name}
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
            <Col span={12}>
              <Form.Item
                style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}
                label="Area"
              >
                {selectedTicket.area}
              </Form.Item>
            </Col>
            {/* <Col span={8}>
              <Form.Item
                label="Type"
                style={{ color: '#fff', fontSize: 18 }}
              >
                {selectedTicket.type}
              </Form.Item>
            </Col> */}
            <Col span={12}>
              <Form.Item
                label="Price"
                style={{ color: '#fff', fontSize: 18 }}
              >
                {selectedTicket.price}
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col xs={22} sm={22} md={14} lg={12}>
              <Button
                onClick={buyTicket}
                loading={loading}
                size="large"
                style={{ width: '100%', borderRadius: 24, height: 45 }} className="custom-button"
              >
                Checkout
                 </Button>
            </Col>
          </Row>

        </Form>
      </Modal>
    </AppLayout >
  )
}

export default Marketplace;
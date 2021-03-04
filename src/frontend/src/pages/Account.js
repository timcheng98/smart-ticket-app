import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Select,
  Typography,
  Divider,
  Tabs,
  Form,
  Button,
  Input,
  Radio,
  message
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import moment from "moment";
import {} from "@ant-design/icons";
import logo from "../assets/eth_logo.png";
import FormUploadFile from '../components/FormUploadFile'
import * as Service from '../../src/core/Service'
import AppLayout from "../components/AppLayout";

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const Account = () => {
  useEffect(() => {}, []);

  return (
    <AppLayout>
      <Row justify="center" style={{ height: "100%", marginTop: 100, marginBottom: 100 }}>
        <Col span={20}>
          <Tabs
            // centered
            tabPosition="left"
            size="large"
            tabBarStyle={{ color: "#fff", fontWeight: "bold", width: 180 }}
          >
            <TabPane tab="Information" key="1">
              <Information />
            </TabPane>
            <TabPane tab="Wallet" key="2">
              <TicketOwn />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </AppLayout>
  );
};

const Information = () => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.app.user);
  const [form] = Form.useForm()

  const [imageURL, setImageURL] = useState("");
  const [fileInfo, setFileInfo] = useState({});
  
  useEffect(() => {
    console.log(user)
    form.setFieldsValue({
      ...user,
      user_kyc_id: user.user_kyc_id > 0
    })
  }, [])

  const uploadOnChange = async (info) => {
    const { status,response } = info.file;
    if (status === 'done') {
      if( response.status > 0 ) {
        message.success('成功上載');
        let patchObj = {
          company_doc: info.file.response.filename
        }
        // await Service.call('patch', '/api/company/admin/kyc', patchObj);

        let path = info.file.response.url;
        setImageURL(`${app.config.STATIC_SERVER_URL}/media/${info.file.response.filename}`)
        setFileInfo(info.file);
      }
      else{
        message.error('上載失敗')
      }
    }
  }

  const onRemove = () => {
    setFileInfo({});
    setImageURL("");
  };


  return (
    <Form
      // initialValues={user}
      className="custom-form"
      colon={false}
      wrapperCol={{
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 12 },
      }}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      }}
      form={form}
    >
       <Form.Item >
        <Button size="large" className="custom-button">Apply KYC</Button>
      </Form.Item>
        <Form.Item label="ID Verification" name="user_kyc_id">
        <Radio.Group disabled>
          <Radio value={1}>YES</Radio>
          <Radio value={0}>NO</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="First Name" name="first_name">
        <Input className="custom-input" placeholder="First Name"/>
      </Form.Item>
      <Form.Item label="Last Name" name="last_name">
        <Input className="custom-input" placeholder="Last Name"/>
      </Form.Item>
      <Form.Item label="E-Mail" name="email">
        <Input disabled className="custom-input" placeholder="E-Mail"/>
      </Form.Item>
      <Form.Item label="ID Documents" name="email">
        <FormUploadFile 
         type="one"
         data={{ scope: "private" }}
         onChange={uploadOnChange}
         onRemove={onRemove}
         imageURL={imageURL}
        />
      </Form.Item>
      <Form.Item label="Personal Photo" name="email">
        <FormUploadFile 
         type="one"
         data={{ scope: "private" }}
         onChange={uploadOnChange}
         onRemove={onRemove}
         imageURL={imageURL}
        />
      </Form.Item>
    </Form>
    
  );
};

const TicketOwn = () => {
  const [loading, setLoading] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);

  return (
    <div style={{ paddingTop: 100, marginBottom: 80 }}>
      <Row justify="center" gutter={[0, 16]}>
        <Col xs={22} sm={22} md={7} lg={7}>
          <Wallet totalTickets={totalTickets} />
        </Col>
      </Row>
      <Row justify="center" gutter={[0, 16]}>
        <Col xs={22} sm={22} md={10} lg={10}>
          <EventList setTotalTickets={setTotalTickets} />
        </Col>
      </Row>
    </div>
  );
};

const Wallet = ({ totalTickets }) => {
  const user = useSelector((state) => state.app.user);
  return (
    <Card
      style={{
        backgroundImage:
          "linear-gradient(to right bottom, #444343, #343333, #242424, #161616, #000000)",
        borderColor: "#242424",
        height: 200,
        borderRadius: 20,
        marginTop: 20,
      }}
    >
      <Row justify="space-between" align="bottom">
        <Col style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
          <Row>
            <Col span={24} style={{ marginBottom: 15 }}>
              <img style={{ width: 50, height: 50 }} src={logo} />
            </Col>
            <Col span={24}>
              {user.first_name} {user.last_name}
            </Col>
          </Row>
        </Col>
        <Col>
          <span
            style={{
              color: "#fff",
              fontSize: 16,
              fontWeight: "bold",
              marginRight: 10,
            }}
          >
            <span style={{ fontSize: 40, marginRight: 4 }}>{totalTickets}</span>{" "}
            Tickets
          </span>
        </Col>
        <Col>
          <Paragraph
            ellipsis
            style={{
              color: "#fff",
              fontWeight: "bold",
              fontSize: 14,
              marginTop: 30,
            }}
          >
            {user.wallet_address}
          </Paragraph>
        </Col>
      </Row>
    </Card>
  );
};

const EventList = ({ setTotalTickets }) => {
  const [eventArr, setEventArr] = useState([]);
  const [ticketArr, setTicketArr] = useState([]);
  const [eventElement, setEvenElement] = useState(null);

  const user = useSelector(state => state.app.user)

  useEffect(() => {
    getOwnerTicket();
  }, []);

  const getOwnerTicket = async () => {
    let tickets = await Service.call('post', '/api/sc/event/ticket/owner', { address: user.wallet_address })
    Events(tickets)
    console.log('tickets', tickets)
  }
  
    // const getTicket = async () => {
    //   let ticket = await eventAPI.getTicketAll();
    //   let events = await eventAPI.getEventAll();
    //   ticket = _.keyBy(ticket, "area");
    //   ticket = _.map(ticket, "area");
    //   setTicketArr(ticket);
    //   setEventArr(events);

    //   setLoading(false);
    // };

  const Events = async (ticketArr) => {
    const eventElement = [];
    let total = 0;
    if (ticketArr.length === 0) {
      eventElement.push(
        <Row align="middle" justify="center" style={{ height: 100 }}>
          <Col style={{ fontSize: 18, fontWeight: "bold", color: "#9a9a9a" }}>
            No Ticket Found
          </Col>
        </Row>
      );
      return setEvenElement(eventElement);
    }
    ticketArr.map((val, index) => {
      let detail = {
        event: val.event,
        total: val.total,
      };
      total += val.total;
      let element = (
        <>
          <Event key={val} detail={detail} />
          <Divider />
        </>
      );
      if (index === ticketArr.length - 1) {
        element = <Event key={val} detail={detail} />;
      }

      eventElement.push(element);
    });
    setEvenElement(eventElement);
    setTotalTickets(total);
  };

  return (
    <Card
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        width: "100%",
        marginTop: 10,
      }}
    >
      {eventElement}
    </Card>
  );
};

const Event = ({ detail }) => {
  let { event, total } = detail;
  return (
    <Row align="middle" tyle={{ backgroundColor: "#fff", height: 100 }}>
      <Col span={5}>
        <span
          style={{
            width: 15,
            height: 15,
            backgroundColor: "#060a10",
            position: "absolute",
            top: "40%",
            left: -10,
            borderRadius: 30,
            border: "1px solid #060a10",
          }}
        ></span>

        <Row align="middle">
          <Col span={24} style={{ marginLeft: 15 }}>
            <img
              style={{
                height: 50,
                width: 50,
                objectFit: "cover",
                borderRadius: 50,
              }}
              src={event.approval_doc}
            />
          </Col>
        </Row>
      </Col>
      <Col span={15} style={{ padding: "0px 15px" }}>
        <Row>
          <Col
            span={24}
            style={{ fontSize: 12, fontWeight: "bold", color: "#2a2a2a" }}
          >
            <Paragraph style={{ marginBottom: 0 }} ellipsis>
              {event.name}
            </Paragraph>
          </Col>
          <Col span={24} style={{ fontSize: 10, color: "#8a8a8a" }}>
            <Paragraph ellipsis>
              {moment.unix(event.start_time).format("DD MMM, YYYY | HH:mm a")}
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Col span={4} style={{ fontWeight: "bold", color: "#2b2b2b" }}>
        <span style={{ fontSize: 24 }}> {total} </span> TKS
        {/* <Icon type="ticket" /> */}
      </Col>
    </Row>
  );
};

export default Account;

import React, { useState, useEffect } from "react";
import { EventAPI } from "../api/smart-contract/event";
import {
  Input,
  Button,
  Row,
  Col,
  Card,
  Select,
  Typography,
  Divider,
  Spin,
  Tag,
  message,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import {
  CalendarOutlined,
  AimOutlined,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import * as Service from "../core/Service";
import { EventsWithSlider } from "./EventList";

import Content from "../components/Content";
import AppLayout from "../components/AppLayout";

const { Title, Text } = Typography;

const { Option } = Select;

const eventAPI = new EventAPI();

const EventDetail = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    getInitialData();
    setLoading(false);
  }, [location]);

  const getInitialData = async () => {
    setEvent(location.state.event);
  };

  if (loading) return null;

  return (
    <AppLayout>
      <Content fullWidth>
        <div>
          <Row
            align="middle"
            style={{
              backgroundImage: `url('${event.approval_doc}')`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              minHeight: 500,
              // backgroundColor: '#fff'
            }}
          >
            <Col xs={0} sm={0} md={24} lg={24}>
              <Row align="middle" justify="end">
                <Col md={10} lg={7}>
                  <Card style={{ borderRadius: 25 }} hoverable>
                    <EventForm event={location.state.event} />
                  </Card>
                </Col>
                <Col span={2}></Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={0} lg={0} style={{ marginTop: -100 }}>
              <Row align="bottom" justify="center">
                <Col span={22}>
                  <Card style={{ borderRadius: 25 }} hoverable>
                    <EventForm event={event} />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Content>
      <Content>
        <Detail event={event} />
      </Content>
      <Content>
        <RelatedEvents event={event} />
      </Content>
    </AppLayout>
  );
};

const EventForm = ({ tickets, event }) => {
  const [eventArr, setEventArr] = useState([]);
  const [ticketAreaArr, setTicketAreaArr] = useState([]);
  const [ticketArr, setTicketArr] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  const user = useSelector(state => state.app.user)

  useEffect(() => {
    setLoading(true);
    setTicket();
    setLoading(false);
  }, []);

  const setTicket = async () => {
    let tickets = await Service.call("get", "/api/sc/event/ticket");
    tickets = tickets[location.state.event.eventId];
    let events = await Service.call("get", "/api/sc/event");
    let ticketGroupPrice = _.groupBy(tickets, "price");
    let ticketsMapPrice = {};
    _.each(ticketGroupPrice, (item, key) => {
      let area = _.uniq(_.map(item, "area"));
      ticketsMapPrice[key] = area;
    });
    let ticketArea = _.map(tickets, "area");
    ticketArea = _.uniq(ticketArea);
    setTicketArr(tickets);
    setTicketAreaOptionLoading(true);
    setTicketAreaArr(ticketsMapPrice);
    setTicketAreaOptionLoading(false);
    setEventArr(events);
  };

  const [ticketAreaOption, setTicketAreaOption] = useState(null);
  const [ticketAreaOptionLoading, setTicketAreaOptionLoading] = useState(true);
  useEffect(() => {
    getTicketAreaOption()
  }, [ticketAreaArr]);

  const getTicketAreaOption = () => {
    let areaOptions = [];

    _.map(ticketAreaArr, (item, price) => {
      areaOptions.push(
        <AreaPicker
          key={item}
          tickets={tickets}
          setSelectedTickets={setSelectedTickets}
          setSelectedArea={setSelectedArea}
          selectedTickets={selectedTickets}
          ticketAreaArr={item}
          price={price}
        // type={1}
        />
      );
    });

    setTicketAreaOption(areaOptions);
  };

  const [stage, setStage] = useState("preview");
  const [selectedTickets, setSelectedTickets] = useState({});
  const [selectedArea, setSelectedArea] = useState("");

  const onFinish = async (values) => {
    console.log("onFinish() START");

    let tickets = await eventAPI.getTicketAll();
    let totalTickets = [];

    tickets = _.map(tickets, (item) =>
      item.area === values.area ? item : null
    );
    tickets = _.compact(tickets);

    await eventAPI.autoSignTicketTransaction({ tickets, total: values.total });

    console.log("onFinish() END");
    // tickets = _.map(tickets, values.area);
  };

  if (stage === "preview") {
    return (
      <Row
        justify="center"
        layout="vertical"
        gutter={[24, 0]}
      // style={{ padding: 50 }}
      >
        <Col span={22}>
          <Row>
            <Col span={4}>
              <CalendarOutlined style={{ fontSize: 28 }} />
            </Col>
            <Col span={20}>
              <span style={{ fontWeight: "bold" }}>
                {moment.unix(event.start_time).format("dddd, MMMM Do YYYY")}
              </span>
              <br />
              <span>
                FROM {moment.unix(event.start_time).format("HH:mm A")} <br />
                TO {moment.unix(event.end_time).format("HH:mm A")}
              </span>
            </Col>
          </Row>
        </Col>
        <Divider />
        <Col span={22}>
          <Row>
            <Col span={4}>
              <AimOutlined style={{ fontSize: 28 }} />
            </Col>
            <Col span={20}>
              <span>{event.venue}</span>
              <br />
              <span>{event.region}</span>
              <br />
              <span>
                {event.district}, {event.country}
              </span>
            </Col>
          </Row>
        </Col>
        <Divider />
        <Col span={22}>
          <Button
            shape="round"
            style={{
              width: "100%",
              background: "linear-gradient(90deg,#0e131d,#060a10 90.65%)",
              color: "#fff",
              height: 50,
              fontWeight: "bold",
            }}
            onClick={() => setStage("checkout")}
          >
            Purchase Tickets
          </Button>
        </Col>
      </Row>
    );
  }

  if (stage === "checkout") {
    return (
      <Spin spinning={ticketAreaOptionLoading}>
        <Row
          justify="center"
          align="bottom"
          layout="vertical"
          gutter={[24, 12]}
          style={{ marginTop: 10 }}
        >
          <Col span={22} style={{ fontWeight: "bold" }}>
            Select Ticket
        </Col>
          {ticketAreaOption}

          <Col span={22}>
            <Button
              loading={loading}
              shape="round"
              style={{
                marginTop: 20,
                width: "100%",
                background: "linear-gradient(90deg,#0e131d,#060a10 90.65%)",
                color: "#fff",
                height: 50,
                fontWeight: "bold",
              }}
              onClick={async () => {
                if (user.user_id <= 0) return message.warning('Please Login First')
                if (user.wallet_address === '') {
                  return message.warning('invalid address')
                }
                setLoading(true);
                let tickets = await Service.call('post', '/api/sc/event/ticket/onsell', { selectedArea })
                let totalSelectedTicket = selectedTickets[selectedArea];
                let result = await Service.call('post', '/api/sc/event/ticket/buy', { address: user.wallet_address, tickets, total: totalSelectedTicket })
                setLoading(false)
              }}
            >
              Checkout
          </Button>
            <Button
              type="text"
              style={{
                width: "100%",
                fontSize: 12,
                color: "#9a9a9a",
                padding: 0,
              }}
              onClick={() => setStage("preview")}
            >
              Back
          </Button>
          </Col>
        </Row>
      </Spin>
    );
  }

  if (loading) return null;

  return (
    <Row justify="center" layout="vertical" gutter={[24, 0]}>
      <Spin spinning={true} />
    </Row>
  );
};

const Detail = ({ event }) => {
  return (
    <Row gutter={[0, 0]} style={{ color: "#fff", marginTop: 50 }}>
      <Col xs={24} sm={24} md={24} lg={16}>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={24} md={24} lg={20}>
            <Title level={1} style={{ color: "#fff" }}>
              {event.name}
            </Title>
            <Divider
              style={{ borderColor: "#fff", borderWidth: 4, borderRadius: 8 }}
            />
          </Col>
          <Col xs={24} sm={24} md={24} lg={20}>
            <Title level={2} style={{ color: "#fff" }}>
              Description
            </Title>
          </Col>
          <Col xs={24} sm={24} md={24} lg={20}>
            <pre style={{ color: "#fff" }}>{event.long_desc}</pre>
          </Col>
        </Row>

        <Row gutter={[24, 12]} style={{ color: "#fff", marginTop: 30 }}>
          <Col xs={24} sm={24} md={24} lg={20}>
            <Title level={3} style={{ color: "#fff" }}>
              Hour
            </Title>
          </Col>
          <Col>
            <Text style={{ color: "#fff" }}>
              {moment
                .unix(event.start_time)
                .format("YYYY-MM-DD - dddd, HH:mm a")}{" "}
              -{moment.unix(event.end_time).format("HH:mm a")}
            </Text>
          </Col>
        </Row>
        <Row
          gutter={[24, 12]}
          style={{ color: "#fff", marginTop: 30, marginBottom: 30 }}
        >
          <Col xs={24} sm={24} md={24} lg={20}>
            <Title level={3} style={{ color: "#fff" }}>
              How can I contact the organizer with any questions?
            </Title>
          </Col>
          <Col xs={24} sm={24} md={24} lg={20}>
            <Text style={{ color: "#fff" }}>
              If you have any questions, please contact us with {event.email} /{" "}
              {event.contact}
            </Text>
          </Col>
        </Row>
      </Col>
      <Col xs={24} sm={24} md={24} lg={8}>
        <Row gutter={[0, 24]} >
          <Col xs={24} sm={24} md={24} lg={20}>
            <Title level={2} style={{ color: "#fff" }}>
              Event Location
            </Title>
          </Col>
          <Col xs={24} sm={24} md={24} lg={24}>
            <div style={{ textAlign: "" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sin!4v1587818542745!5m2!1sen!2sin"
                height="400"
                width="100%"
                // allowFullscreen=''
                aria-hidden="false"
              // tabindex='0'
              ></iframe>
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row gutter={[0, 24]}>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Title level={2} style={{ color: "#fff" }}>
              Tags
            </Title>
          </Col>
          <Col xs={24} sm={24} md={18} lg={18}>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              Music
            </Tag>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              Lastest
            </Tag>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              Famouse
            </Tag>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              Hotest
            </Tag>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              Sing
            </Tag>
            <Tag
              style={{
                padding: "8px 20px",
                fontWeight: "bold",
                margin: 8,
                backgroundColor: "#ffffff00",
                color: "#fff",
              }}
            >
              U.S.A
            </Tag>
          </Col>
          <Col></Col>
        </Row>
      </Col>
    </Row>
  );
};

const RelatedEvents = ({event}) => {
  return (
    <div style={{ margin: "100px 0" }}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Title level={3} style={{ color: "#fff" }}>
            Recommended Suggestions
          </Title>
        </Col>
      </Row>
      {/* <Row justify="center"> */}
        {/* <Col span={24}> */}
          <EventsWithSlider event={event} />
        {/* </Col> */}
      {/* </Row> */}
    </div>
  );
};

const AreaPicker = ({
  tickets,
  setSelectedTickets,
  setSelectedArea,
  ticketAreaArr,
  price,
}) => {
  const [areaPicked, setAreaPicked] = useState("");
  const [totalTicketSelected, setTotalTicketSelected] = useState(0);
  return (
    <Col span={22}>
      <Row gutter={[0, 12]} align="middle">
        <Col span={6} style={{ fontWeight: "bold", color: "#060a10" }}>
          {_.toInteger(price) !== 0 ? `$${_.toInteger(price)}` : "FREE"}
        </Col>
        <Col span={10} style={{ fontWeight: "bold" }}>
          <Select
            dropdownClassName="custom-dropdown"
            onChange={(selectedArea) => {
              setAreaPicked((prev) => {
                setSelectedTickets({ [selectedArea]: 1 });
                setSelectedArea(selectedArea);
                setTotalTicketSelected(1);
                return selectedArea;
              });
            }}
            bordered={false}
            placeholder="Area"
            style={{ width: "80%", borderRadius: 15 }}
          >
            {ticketAreaArr.map((item) => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
        </Col>
        <Col span={8}>
          <Row align="middle">
            <MinusOutlined
              onClick={() => {
                setTotalTicketSelected((prev) => {
                  if (prev === 0) return 0;
                  setSelectedTickets({
                    [areaPicked]: --prev,
                  });
                  return prev;
                });
              }}
            />

            <span style={{ margin: "0px 15px" }}>{totalTicketSelected}</span>
            <PlusOutlined
              onClick={() => {
                setTotalTicketSelected((prev) => {
                  setSelectedTickets({
                    [areaPicked]: ++prev,
                  });
                  return prev;
                });
              }}
            />
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

const Ticket = () => {
  return (
    <div class="ticket">
      <div class="ticket--center">
        <div class="ticket--center--row">
          <div class="ticket--center--col">
            <span>Your ticket for</span>
            <strong>The event name</strong>
          </div>
        </div>
        <div class="ticket--center--row">
          <div class="ticket--center--col">
            <span class="ticket--info--title">Date and time</span>
            <span class="ticket--info--subtitle">Thursday, May 14 2020</span>
            <span class="ticket--info--content">
              7:00 am to 9:00 pm (GMT+1)
            </span>
          </div>
          <div class="ticket--center--col">
            <span class="ticket--info--title">Location</span>
            <span class="ticket--info--subtitle">Location name</span>
            <span class="ticket--info--content">
              Location complete address, Town, COUNTRY
            </span>
          </div>
        </div>
        <div class="ticket--center--row">
          <div class="ticket--center--col">
            <span class="ticket--info--title">Ticket type</span>
            <span class="ticket--info--content">Event category</span>
          </div>
          <div class="ticket--center--col">
            <span class="ticket--info--title">Order info</span>
            <span class="ticket--info--content">
              Order #0123456789. Ordered By Jhon DOE
            </span>
          </div>
        </div>
      </div>
      <div class="ticket--end">
        <div>
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png" />
        </div>
        <div>
          <img
            style={{ width: 100 }}
            src="https://www.fueledbyramen.com/sites/g/files/g2000005606/f/201702/FBR_Site_Assets_ArtistPanels_OOR.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;

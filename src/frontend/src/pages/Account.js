import React, { useState, useEffect } from 'react';
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
  message,
  Spin,
  List,
  Avatar,
  Modal,
  notification,
  Image,
  DatePicker,
} from 'antd';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { useHistory } from 'react-router-dom';
import * as CommonActions from '../redux/actions/common';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import { QrcodeOutlined, CloseOutlined } from '@ant-design/icons';
import QRCode from 'qrcode';
import logo from '../assets/eth_logo.png';
import FormUploadFile from '../components/FormUploadFile';
import * as Service from '../../src/core/Service';
import AppLayout from '../components/AppLayout';
import { not } from 'mathjs';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const Account = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [tabKey, setTabKey] = useState('');

  const logout = async () => {
    await Service.call('post', '/api/user/logout');
    dispatch(CommonActions.setAuth(false));
    dispatch(CommonActions.setUser({ user_id: 0 }));
    history.push('/');
  };

  return (
    <AppLayout>
      <Row
        justify='center'
        style={{ height: '100%', marginTop: 100, marginBottom: 100 }}
      >
        <Col xs={0} sm={0} md={20} lg={20}>
          <Tabs
            // centered
            onTabClick={(key) => setTabKey(key)}
            tabPosition='left'
            size='large'
            tabBarStyle={{ color: '#fff', fontWeight: 'bold', width: 180 }}
          >
            <TabPane tab='Information' key='1'>
              <Information tabKey={tabKey} />
            </TabPane>
            <TabPane tab='Wallet' key='2'>
              <TicketOwn tabKey={tabKey} />
            </TabPane>
            <TabPane tab='Credit Card' key="3">
              <CreditCardComponent tabKey={tabKey} />
            </TabPane>
            <TabPane
              tab={
                <Button onClick={logout} className='custom-button'>
                  Logout
								</Button>
              }
              key='logout'
            />
          </Tabs>
        </Col>
        <Col xs={22} sm={22} md={0} lg={0}>
          <Tabs
            centered
            tabPosition='top'
            size='large'
            tabBarStyle={{ color: '#fff', fontWeight: 'bold', width: '100%' }}
          >
            <TabPane tab='Information' key='1'>
              <Information />
            </TabPane>
            <TabPane tab='Wallet' key='2'>
              <TicketOwn />
            </TabPane>
            <TabPane
              tab={
                <Button
                  onClick={logout}
                  type='text'
                  style={{ color: '#fff', fontWeight: 'bold', fontSize: 15 }}
                >
                  Logout
								</Button>
              }
              key='3'
            />
          </Tabs>
        </Col>
      </Row>
    </AppLayout>
  );
};

const Information = ({ tabKey }) => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.app.user);
  const [form] = Form.useForm();
  const [isKyc, setKyc] = useState(false);
  const [userKyc, setUserKyc] = useState({})


  useEffect(() => {
    setKyc(false);
  }, [tabKey]);

  useEffect(() => {
    getInitialValue();
  }, []);

  const getInitialValue = async () => {
    const user_kyc = await Service.call('get', `/api/user/kyc`);
    console.log('user_kyc', user_kyc)
    setUserKyc(user_kyc)
  }

  const buttonText = () => {
    let text = 'Apply KYC';
    console.log(userKyc);
    if (!_.isEmpty(userKyc) && userKyc.user_id > 0 && userKyc.status === 0) {
      return text = 'KYC Pending'
    }
    if (!_.isEmpty(userKyc) && userKyc.user_id > 0 && userKyc.status === 1) {
      return text = 'KYC Pass'
    }
    if (!_.isEmpty(userKyc) && userKyc.user_id > 0 && userKyc.status === -1) {
      return text = 'Re-apply KYC'
    }

    return text
  }

  return (
    <>
      {!isKyc && (
        <Button
          disabled={!_.isEmpty(userKyc) && userKyc.status >= 0 && userKyc.user_id > 0}
          size='large'
          className='custom-button'
          style={{ marginBottom: 30 }}
          onClick={() => setKyc(true)}
        >
          {buttonText()}
        </Button>
      )}
      {isKyc ? <KYCComponent setKyc={setKyc} /> : <UserInformationCompoent />}
    </>
  );
};

const UserInformationCompoent = () => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.app.user);
  const [form] = Form.useForm();

  const [imageURL, setImageURL] = useState({
    national_doc: '',
    face_doc: '',
  });


  useEffect(() => {
    getInitialValue();
  }, [form]);

  const getInitialValue = async () => {
    const user_kyc = await Service.call('get', `/api/user/kyc`);
    form.setFieldsValue({
      ...user,
      ...user_kyc,
      birthday: moment.unix(user_kyc.birthday),
      user_kyc_id: user.user_kyc_id > 0 && !_.isEmpty(user_kyc) && user_kyc.status === 1 ? 1 : 0,
    })

    setImageURL({
      national_doc: user_kyc.national_doc ? `${app.config.STATIC_SERVER_URL}/media/${user_kyc.national_doc}` : '',
      face_doc: user_kyc.face_doc ? `${app.config.STATIC_SERVER_URL}/media/${user_kyc.face_doc}` : '',
    });
  }


  // useEffect(() => {
  //   console.log(user);
  //   form.setFieldsValue({
  //     ...user,
  //     user_kyc_id: user.user_kyc_id > 0 ? 1 : 0,
  //   });
  // }, []);

  return (
    <Form
      // initialValues={user}
      className='custom-form'
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
      <Form.Item label='ID Verification' name='user_kyc_id'>
        <Radio.Group disabled>
          <Radio value={1}>YES</Radio>
          <Radio value={0}>NO</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label='First Name' name='first_name'>
        <Input className='custom-input' placeholder='First Name' disabled />
      </Form.Item>
      <Form.Item label='Last Name' name='last_name'>
        <Input className='custom-input' placeholder='Last Name' disabled />
      </Form.Item>
      <Form.Item label='Birthday' name='birthday'>
        <DatePicker disabled className="custom-picker" style={{ width: '100%', backgroundColor: 'transparent', borderBottom: '1px solid #fff', border: 'none', color: '#fff' }} placeholder='Birthday' />
      </Form.Item>
      <Form.Item label='E-Mail' name='email'>
        <Input disabled className='custom-input' placeholder='E-Mail' disabled />
      </Form.Item>
      <Form.Item label='ID Document' className="form-item-image">
        <Row>
          <Image.PreviewGroup>
            <Image
              // width={300}
              style={{ width: '100%' }}
              src={imageURL.national_doc}
            />
          </Image.PreviewGroup>
        </Row>
      </Form.Item>
      <Form.Item label='Face Document' className="form-item-image">
        <Row>
          <Image.PreviewGroup>
            <Image
              // width={300}
              style={{ width: '100%' }}
              src={imageURL.face_doc}
            />
          </Image.PreviewGroup>
        </Row>
      </Form.Item>
    </Form>
  );
};

const KYCComponent = ({ setKyc }) => {
  const app = useSelector((state) => state.app);
  const user = useSelector((state) => state.app.user);
  const [form] = Form.useForm();

  const [imageURL, setImageURL] = useState({
    national_doc: '',
    face_doc: ''
  });

  // useEffect(() => {
  //   getInitialValue();
  // }, [form]);

  // const getInitialValue = async () => {
  //   setImageURL({
  //     national_doc: form.national_doc ? `${app.config.STATIC_SERVER_URL}/media/${form.national_doc}` : '',
  //     face_doc: form.face_doc ? `${app.config.STATIC_SERVER_URL}/media/${form.face_doc}` : '',
  //   });
  // }

  const uploadOnChange = async (info, fieldKey) => {
    const { status, response } = info.file;
    if (status === 'done') {
      if (response.status > 0) {
        message.success('成功上載');
        let patchObj = {
          company_doc: info.file.response.filename,
        };
        // await Service.call('patch', '/api/company/admin/kyc', patchObj);

        let path = info.file.response.filename;
        setImageURL({
          ...imageURL,
          [fieldKey]: path
        });
        console.log(path);
        form.setFieldsValue({ [fieldKey]: path })
      } else {
        message.error('上載失敗');
      }
    }
  };

  const onRemove = () => {
    setImageURL({
      national_doc: '',
      face_doc: ''
    });
    form.setFieldsValue({
      national_doc: '',
      face_doc: ''
    })
  };

  const onFinish = async (formData) => {
    let postObj = {
      ...formData,
      birthday: formData.birthday.unix(),
      natioanl_doc_verified: 0,
      face_doc_verified: 0,
      status: 0
    }

    const resp = await Service.call('post', '/api/user/kyc', postObj)
    if (resp.errorMessage) {
      return notification.error({ message: resp.errorMessage })
    }
    setKyc(false)
    return notification.success({ message: 'Submit Successful.' })
  }

  return (
    <Form
      // initialValues={user}
      onFinishFailed={(errors) => _.map(errors.errorFields, (errorObj) => notification.warning({ message: errorObj.errors[0] }))}
      onFinish={onFinish}
      className='custom-form'
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
      <Form.Item rules={[{ required: true, message: 'First name is required.' }]} label='First Name' name='first_name'>
        <Input className='custom-input' placeholder='First Name' />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Last name is required.' }]} label='Last Name' name='last_name'>
        <Input className='custom-input' placeholder='Last Name' />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Birthday is required.' }]} label='Birthday' name='birthday'>
        <DatePicker className="custom-picker" style={{ width: '100%', backgroundColor: 'transparent', borderBottom: '1px solid #fff', border: 'none', color: '#fff' }} placeholder='Birthday' />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'National Id is required.' }]} label='National ID' name='national_id'>
        <Input className='custom-input' placeholder='National ID' />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'National Document is required.' }]} label='National ID Document' name='national_doc'>
        <FormUploadFile
          type='one'
          // data={{ scope: 'private' }}
          onChange={(file) => uploadOnChange(file, 'national_doc')}
          onRemove={onRemove}
          imageURL={imageURL.national_doc ? `${app.config.STATIC_SERVER_URL}/media/${imageURL.national_doc}` : null}
        />
      </Form.Item>
      <Form.Item rules={[{ required: true, message: 'Face Document is required.' }]} label='Face Photo' name='face_doc'>
        <FormUploadFile
          type='one'
          // data={{ scope: 'private' }}
          onChange={(file) => uploadOnChange(file, 'face_doc')}
          onRemove={onRemove}
          imageURL={imageURL.face_doc ? `${app.config.STATIC_SERVER_URL}/media/${imageURL.face_doc}` : null}
        />
      </Form.Item>
      <Form.Item>
        <Row gutter={[16, 0]}>
          <Col>
            <Button
              size='large'
              className='custom-button'
              htmlType="submit"
            >
              Submit
						</Button>
          </Col>
          <Col>
            <Button
              size='large'
              type="dashed"
              style={{ backgroundColor: 'transparent', color: '#fff' }}
              onClick={() => setKyc(false)}
            >
              Back
						</Button>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

const TicketOwn = () => {
  const [loading, setLoading] = useState(true);
  const [totalTickets, setTotalTickets] = useState([]);
  const [ticketSum, setTicketSum] = useState(0);
  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    getOwnerTicket();
  }, []);

  const getOwnerTicket = async () => {
    let tickets = await Service.call('post', '/api/sc/event/ticket/owner', {
      address: user.wallet_address,
    });

    let ticket_sum = 0;
    _.each(tickets, (item) => {
      ticket_sum += item.ticket_own;
    });
    setTotalTickets(tickets);
    setTicketSum(ticket_sum);
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: 20, marginBottom: 80 }}>
      <Spin spinning={loading}>
        <Row justify='center' gutter={[0, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Wallet totalTickets={ticketSum} />
          </Col>
        </Row>
        <Row justify='center' gutter={[0, 16]}>
          <Col xs={22} sm={22} md={12} lg={12}>
            <EventList events={totalTickets} />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

const Wallet = ({ totalTickets }) => {
  const user = useSelector((state) => state.app.user);
  return (
    <Card
      style={{
        backgroundImage:
          'linear-gradient(to right bottom, #444343, #343333, #242424, #161616, #000000)',
        borderColor: '#242424',
        height: 200,
        borderRadius: 20,
        marginTop: 20,
      }}
    >
      <Row justify='space-between' align='bottom'>
        <Col style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
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
              color: '#fff',
              fontSize: 16,
              fontWeight: 'bold',
              marginRight: 10,
            }}
          >
            <span style={{ fontSize: 40, marginRight: 4 }}>{totalTickets}</span>{' '}
						Tickets
					</span>
        </Col>
        <Col>
          <Paragraph
            ellipsis
            style={{
              color: '#fff',
              fontWeight: 'bold',
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

const CreditCardComponent = () => {
  const [form] = Form.useForm();
  const user = useSelector(state => state.app.user)
  const dispatch = useDispatch();
  useEffect(() => {
    setCreditCard({
      expiry: user.credit_card_expiry_date,
    name: user.credit_card_name,
    cvc: '',
    focus: '',
    number: user.credit_card_number,
    })
  }, [user])

  const [creditCard, setCreditCard] = useState({
    expiry: '',
    name: '',
    cvc: '',
    focus: '',
    number: '',
  })


  const handleInputFocus = (e) => {
    setCreditCard({
      ...creditCard,
      focus: e.target.name
    })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setCreditCard({
      ...creditCard,
      [name]: value
    })
  }

  const onFinish = async () => {
    if (!_.toInteger(creditCard.number)) {
      return message.warning('credit card number should be integer')
    }
    let obj = {
      credit_card_number: _.toInteger(creditCard.number),
      credit_card_expiry_date: _.toString(creditCard.expiry),
      credit_card_name: _.toString(creditCard.name),
    }
    await Service.call('patch', '/api/user', obj);
    let result = await Service.call('get', '/api/user');

    dispatch(CommonActions.setUser(result))
    return message.success('Update Succesful.')
  }

  return (
    <div id="PaymentForm">
      <Row gutter={[0, 40]} justify="center">
        <Col span={12}> <Cards
        cvc={creditCard.cvc}
        expiry={creditCard.expiry}
        focused={creditCard.focus}
        name={creditCard.name}
        number={creditCard.number}
      /></Col>
        </Row>
     <Row justify="center">
       <Col span={10}>
      <Form
       className='custom-form'
       colon={false}
       wrapperCol={{
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      }}
      labelCol={{
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      }}
      >
        <Form.Item label="Card Number">
          <Input
            value={creditCard.number}
            maxLength={16}
            name="number"
            placeholder="Card Number"
            className="custom-input"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Form.Item>
        <Form.Item label="Name">
          <Input
          value={creditCard.name}
            name="name"
            placeholder="Name"
            className="custom-input"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Form.Item>
        <Form.Item label="Expiry Date">
          <Input
          value={creditCard.expiry}
            maxLength={4}
            name="expiry"
            placeholder="Expiry Date"
            className="custom-input"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </Form.Item>
        <Form.Item>
          <Button onClick={onFinish} style={{width: '100%'}} size="large" className="custom-button">Save</Button>
          </Form.Item>
      </Form>
      </Col>
      </Row>
    </div>
  )
}

const EventList = ({ events }) => {
  const [eventList, setEventList] = useState(events);
  const [eventCount, setEventCount] = useState(0);
  const [ticketArr, setTicketArr] = useState([]);
  const [eventElement, setEvenElement] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(-1);
  const user = useSelector((state) => state.app.user);
  const app = useSelector((state) => state.app);
  const [modalVisible, setModalVisible] = useState(false);
  const [qrcode, setQrcode] = useState('');
  useEffect(() => {
    setEventList(events);
  }, [events]);

  useEffect(() => {
    Events();
  }, [eventList]);

  useEffect(() => {
    if (selectedEvent === -1) return;
    setEventList({ [selectedEvent]: events[selectedEvent] });
  }, [selectedEvent]);

  const Events = async () => {
    const eventElement = [];
    if (_.isEmpty(eventList)) {
      eventElement.push(
        <Row key={0} align='middle' justify='center' style={{ height: 100 }}>
          <Col style={{ fontSize: 18, fontWeight: 'bold', color: '#0e131d' }}>
            No Ticket Found
					</Col>
        </Row>
      );
      return setEvenElement(eventElement);
    }
    let count = 0;
    _.each(eventList, (item, key) => {
      let detail = {
        event: item.event,
        ticket_own: item.ticket_own,
      };
      let element = (
        <div onClick={() => setSelectedEvent(key)}>
          <Event key={key} detail={detail} />
          <Divider />
        </div>
      );
      eventElement.push(element);
      count++;
    });
    setEventCount(count);
    setEvenElement(eventElement);
  };

  const generateQR = async (ticket) => {
    try {
      const opts = {
        errorCorrectionLevel: 'L',
        type: 'image/png',
        quality: 1,
        margin: 1,
        color: {
          dark: '#0e131d',
          light: '#fff',
        },
      };
      // let encrpyted_data = {
      //   user_id: user.user_id,
      //   ticketId: ticketId,
      //   ts: moment().unix()
      // }
      // console.log(ticket);
      let url = `${app.config.TICKET_VERIFY_URL
        }/admin/event/ticket/verify?user_id=${user.user_id}&ticketId=${ticket.ticketId
        }&eventId=${ticket.eventId}&ts=${moment().unix()}`;
      console.log(url);
      let qrcode = await QRCode.toDataURL(url, opts);
      setQrcode(qrcode);
    } catch (err) {
      console.error(err);
    }
  };

  if (selectedEvent !== -1) {
    return (
      <Card
        style={{
          backgroundColor: '#fff',
          borderRadius: 20,
          width: '100%',
          marginTop: 10,
        }}
      >
        <div
          onClick={() => {
            setSelectedEvent(-1);
            setEventList(events);
          }}
        >
          {eventElement}
        </div>
        <Row justify='center'>
          <Col span={12}>
            <Button
              onClick={() => {
                setSelectedEvent(-1);
                setEventList(events);
              }}
              style={{
                width: '100%',
                borderColor: '#0e131d',
                color: '#0e131d',
                fontWeight: 'bold',
                marginBottom: 8,
              }}
            >
              Back
						</Button>
          </Col>
        </Row>
        <Row style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 12 }}>
          <Col span={2}></Col>
          <Col span={6}>Area</Col>
          <Col span={8}>Seat</Col>
          <Col span={8}>Price</Col>
        </Row>
        <Divider style={{ margin: '8px 0px' }} />
        <List
          itemLayout='horizontal'
          dataSource={events[selectedEvent].tickets}
          renderItem={(item) => (
            <List.Item>
              <Row style={{ width: '100%', textAlign: 'center' }}>
                <Col span={2}>
                  <QrcodeOutlined
                    onClick={() => {
                      generateQR(item);
                      setModalVisible(true);
                    }}
                    style={{ color: '#0e131d', fontSize: 20 }}
                  />
                </Col>
                <Col span={6}>{item.area}</Col>
                <Col span={8}>{item.seat}</Col>
                <Col span={8}>
                  {item.price === 0 ? 'Free' : `$${item.price}`}
                </Col>
              </Row>
            </List.Item>
          )}
        />
        <Modal
          title={'Passport'}
          className='custom-modal'
          closeIcon={<CloseOutlined style={{ color: '#fff' }} />}
          style={{
            maxWidth: 600,
            padding: '40px 40px',
            backgroundColor: 'transparent',
          }}
          bodyStyle={{
            backgroundColor: '#0e131d',
            padding: '40px 40px',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
          width={'90%'}
          st
          visible={modalVisible}
          footer={null}
          onCancel={() => {
            setModalVisible(false);
          }}
        >
          <Row justify='center'>
            <Col xs={22} sm={22} md={14} lg={14}>
              <img style={{ width: '100%' }} src={qrcode} />
            </Col>
          </Row>
        </Modal>
      </Card>
    );
  }

  return (
    <Card
      style={{
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '100%',
        marginTop: 10,
      }}
    >
      {eventElement}
      <div
        style={{ textAlign: 'center', color: '#0e131d', fontWeight: 'bold' }}
      >
        Total No. Events: {eventCount}
      </div>
    </Card>
  );
};

const Event = ({ detail }) => {
  let { event, ticket_own } = detail;
  return (
    <Row align='middle' tyle={{ backgroundColor: '#fff', height: 100 }}>
      <Col span={5}>
        <span
          style={{
            width: 15,
            height: 15,
            backgroundColor: '#060a10',
            position: 'absolute',
            top: '40%',
            left: -10,
            borderRadius: 30,
            border: '1px solid #060a10',
          }}
        ></span>

        <Row align='middle'>
          <Col span={24} style={{ marginLeft: 15 }}>
            <img
              style={{
                height: 50,
                width: 50,
                objectFit: 'cover',
                borderRadius: 50,
              }}
              src={event.approval_doc || ''}
            />
          </Col>
        </Row>
      </Col>
      <Col span={15} style={{ padding: '0px 15px' }}>
        <Row>
          <Col
            span={24}
            style={{ fontSize: 12, fontWeight: 'bold', color: '#2a2a2a' }}
          >
            <Paragraph style={{ marginBottom: 0 }} ellipsis>
              {event.name}
            </Paragraph>
          </Col>
          <Col span={24} style={{ fontSize: 10, color: '#8a8a8a' }}>
            <Paragraph ellipsis>
              {moment.unix(event.start_time).format('DD MMM, YYYY | HH:mm a')}
            </Paragraph>
          </Col>
        </Row>
      </Col>
      <Col span={4} style={{ fontWeight: 'bold', color: '#2b2b2b' }}>
        <span style={{ fontSize: 24 }}> {ticket_own} </span> TKS
				{/* <Icon type="ticket" /> */}
      </Col>
    </Row>
  );
};

export default Account;

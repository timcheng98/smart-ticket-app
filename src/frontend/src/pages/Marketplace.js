import React, { useState } from 'react';
import {
  Row,
  Col,
  Select,
  Table,
  Form,
  Button,
  Input,
  Modal,
  Spin,
} from 'antd';
import { ShoppingOutlined, CloseOutlined } from '@ant-design/icons';
import StripePayment from '../components/StripePayment';
import _ from 'lodash';
import AppLayout from '../components/AppLayout';

const { Option } = Select;

const Marketplace = () => {
  const [dataSource, setDataSource] = useState([
    {ticketId: 0,
      eventId: 0,
      price: 1280,
      seat: 'Row 2 Col 10'
    }
  ]);

  const [sellTicketForm] = Form.useForm();
  const [stage, setStage] = useState('buying');
  const [modalVisible, setModalVisible] = useState(false);
  const [sellModalVisible, setSellModalVisible] = useState(false);
  const [commission, setCommission] = useState(0);

  const getColumn = () => {
    return [
      {
        title: '',
        dataIndex: 'ticketId',
        render: (val, record) => {
          return (
            <ShoppingOutlined
              onClick={() => {
                setStage('buying');
                setModalVisible(true);
              }}
              style={{ fontSize: 20, color: '#000' }}
            />
          );
        },
      },
      {
        title: 'Event',
        dataIndex: 'eventId',
        render: (value) => 'MIRROR 2021 演唱會',
      },
      {
        title: 'Area',
        dataIndex: 'area',
      },
      {
        title: 'Position',
        dataIndex: 'seat',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        render: (value) => `$${value}`,
      },
    ];
  };

  const sellTicket = async () => {
    setSellModalVisible(false);
  };

  const buyTicket = async (payload) => {
    setDataSource([])
    setModalVisible(false);
  };

  const getTicketCommission = async () => {
    setCommission(1.2)
    setStage('checkout');
  };

  return (
    <AppLayout>
      <Row justify='center' style={{ marginTop: 60 }}>
        <Col xs={22} sm={22} md={8} lg={8}>
          <Button
            size='large'
            style={{
              width: '100%',
              fontSize: 16,
              height: 50,
              marginBottom: 30
            }}
            className='custom-button'
            onClick={async () => {
              setSellModalVisible(true);
            }}
          >
            Sell Tickets
					</Button>
        </Col>
      </Row>
      <Row justify='center' style={{ marginTop: 10 }}>
        <Col xs={22} sm={22} md={14} lg={14}>
          <Table
            rowKey='ticketId'
            scroll={{ x: true }}
            dataSource={dataSource}
            columns={getColumn()}
          />
        </Col>
      </Row>
      <Modal
        title={'Sell Ticket'}
        className='custom-modal'
        maskClosable={false}
        closeIcon={<CloseOutlined style={{ color: '#000' }} />}
        style={{
          maxWidth: 600,
          padding: '40px 40px',
          backgroundColor: 'transparent',
        }}
        bodyStyle={{
          backgroundColor: '#fff',
          padding: '40px 40px',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        width={'100%'}
        visible={sellModalVisible}
        footer={null}
        onCancel={() => {
          setSellModalVisible(false);
        }}
      >
        <Row gutter={[0, 12]}>
          <Col span={24}>
            <Form
              layout='vertical'
              className='custom-form'
              form={sellTicketForm}
            >
              <Form.Item label='Event Name' name='eventId'>
                  <Select
                    size='large'
                    placeholder='Please Select'
                    style={{ color: '#fff', width: '100%' }}
                  >
                    <Option value={1}>MIRROR 2021 演唱會</Option>
                  </Select>
              </Form.Item>
              <Form.Item label='Ticket' name='ticketId'>
                <Select
                  size='large'
                  placeholder='Please Select'
                  style={{ color: '#fff', width: '100%' }}
                >
                  <Option disabled>
                    [Selling]VIP | Row 2 Col 10 | $1280
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                label='Receiving Account - Credit Card Number'
                name='credit_card_account'
                initialValue="42424242424242424"
              >
                <Input
                  disabled
                  size='large'
                  style={{ backgroundColor: 'transparent', color: '#000' }}
                  placeholder='Credit Card Account Number'
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row justify='center'>
          <Col span={12}>
            <Button
              size='large'
              style={{ width: '100%', height: 60, fontSize: 24 }}
              className='custom-button'
              onClick={sellTicket}
            >
              Confirm
						</Button>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="MIRROR 2021 演唱會"
        className='custom-modal'
        maskClosable={false}
        centered
        closeIcon={<CloseOutlined style={{ color: '#000' }} />}
        style={{
          maxWidth: 600,
          padding: '40px 40px',
          backgroundColor: 'transparent',
        }}
        bodyStyle={{
          backgroundColor: '#fff',
          padding: '40px 40px',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        width={'100%'}
        st
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {stage === 'buying' && (
          <>
            <Form
              className='custom-form ticket-form'
              layout='vertical'
              style={{ textAlign: 'center' }}
            >
              <Row
                justify='center'
                style={{ textAlign: 'center', marginBottom: 40 }}
              >
                <Col
                  xs={24}
                  sm={24}
                  md={16}
                  lg={12}
                  style={{
                    color: '#000',
                    fontSize: 24,
                    border: '1px solid #000',
                    padding: '10px 20px',
                  }}
                >
                  Row 2 Col 10
                </Col>
              </Row>
              <Row style={{ textAlign: 'center', marginBottom: 20 }}>
                <Col span={12}>
                  <Form.Item
                    style={{ color: '#000', fontSize: 18, textAlign: 'center' }}
                    label='Area'
                  >
                    VIP
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label='Price'
                    style={{ color: '#000', fontSize: 18 }}
                  >
                    $1280
                  </Form.Item>
                </Col>
              </Row>

              <Row justify='center'>
                <Col xs={22} sm={22} md={14} lg={12}>
                  <Button
                    onClick={getTicketCommission}
                    size='large'
                    style={{ width: '100%', borderRadius: 24, height: 45 }}
                    className='custom-button'
                  >
                    Checkout
									</Button>
                </Col>
              </Row>
            </Form>
          </>
        )}

        {stage === 'checkout' && (
          <Row
            justify='center'
            align='bottom'
            layout='vertical'
            // gutter={[24, 12]}
            style={{ marginTop: 10 }}
          >
            <Col span={24} style={{ width: 500 }}>
              <StripePayment
                seatObj={{
                  total_price: 1280,
                  selectedArea: 'VIP',
                  commission,
                  seat: 'Row 2 Col 10',
                  totalSelectedTicket: 1,
                }}
                onSuccess={buyTicket}
              />
            </Col>
          </Row>
        )}
      </Modal>
    </AppLayout>
  );
};

export default Marketplace;

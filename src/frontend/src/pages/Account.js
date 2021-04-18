import React, { useState, useEffect } from 'react';
import {
	Row,
	Col,
	Card,
	Typography,
	Divider,
	Tabs,
	Form,
	Button,
	Input,
	List,
	Avatar,
	Modal,
	DatePicker,
} from 'antd';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { QrcodeOutlined, CloseOutlined } from '@ant-design/icons';
import AppLayout from '../components/AppLayout';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const Account = () => {
	const history = useHistory();
	const [tabKey, setTabKey] = useState('');

	useEffect(() => {
		setTabKey(history.location.search.split('=')[1]);
	}, [history]);

	const logout = async () => {
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
						activeKey={tabKey}
						tabBarStyle={{ color: '#000', fontWeight: 'bold', width: 180 }}
					>
						<TabPane tab='Information' key='info'>
							<Information tabKey={tabKey} />
						</TabPane>
						<TabPane tab='Wallet' key='wallet'>
							<TicketOwn tabKey={tabKey} />
						</TabPane>
						<TabPane tab='Credit Card' key='credit_card'>
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
						tabBarStyle={{ color: '#000', fontWeight: 'bold', width: '100%' }}
					>
						<TabPane tab='Information' key='info'>
							<Information />
						</TabPane>
						<TabPane tab='Wallet' key='wallet'>
							<TicketOwn />
						</TabPane>
						<TabPane tab='Credit Card' key='credit_card'>
							<CreditCardComponent tabKey={tabKey} />
						</TabPane>
						<TabPane
							tab={
								<Button
									onClick={logout}
									type='text'
									style={{ color: '#000', fontWeight: 'bold', fontSize: 15 }}
								>
									Logout
								</Button>
							}
							key='logout'
						/>
					</Tabs>
				</Col>
			</Row>
		</AppLayout>
	);
};

const Information = ({ tabKey }) => {
	return (
		<>
			<UserInformationCompoent />
		</>
	);
};

const UserInformationCompoent = () => {
	const [form] = Form.useForm();

	const [imageURL, setImageURL] = useState({
		national_doc: '',
		face_doc: '',
	});

	return (
		<Form
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
			<Form.Item>
				<Avatar size='large' />
			</Form.Item>
			<Form.Item label='E-Mail' name='email'>
				<Input
					disabled
					className='custom-input'
					placeholder='E-Mail'
					defaultValue='test@gmail.com'
				/>
			</Form.Item>
			<Form.Item label='First Name' name='first_name'>
				<Input className='custom-input' placeholder='First Name' disabled />
			</Form.Item>
			<Form.Item label='Last Name' name='last_name'>
				<Input className='custom-input' placeholder='Last Name' disabled />
			</Form.Item>
			<Form.Item label='Birthday' name='birthday'>
				<DatePicker
					disabled
					className='custom-picker'
					style={{
						width: '100%',
						backgroundColor: 'transparent',
						borderBottom: '1px solid #000',
						border: 'none',
						color: '#000',
					}}
					placeholder='Birthday'
				/>
			</Form.Item>
		</Form>
	);
};

const TicketOwn = () => {
	return (
		<div style={{ paddingTop: 20, marginBottom: 80 }}>
			<Row justify='center' gutter={[0, 16]}>
				<Col xs={24} sm={24} md={12} lg={12}>
					<Wallet />
				</Col>
			</Row>
			<Row justify='center' gutter={[0, 16]}>
				<Col xs={22} sm={22} md={12} lg={12}>
					<EventList />
				</Col>
			</Row>
		</div>
	);
};

const Wallet = () => {
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
							<img style={{ width: 50, height: 50 }} src='/eth_logo.png' />
						</Col>
						<Col span={24}>Brian Chan</Col>
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
						<span style={{ fontSize: 40, marginRight: 4, color: '#fff' }}>
							1
						</span>
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
						0xaf06C9A15fd9c0a554Bcc5cd08a2C5A6e810ED61
					</Paragraph>
				</Col>
			</Row>
		</Card>
	);
};

const CreditCardComponent = () => {
	const [creditCard, setCreditCard] = useState({
		expiry: '',
		name: '',
		cvc: '',
		focus: '',
		number: '',
	});

	const handleInputFocus = (e) => {
		setCreditCard({
			...creditCard,
			focus: e.target.name,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setCreditCard({
			...creditCard,
			[name]: value,
		});
	};

	const onFinish = async () => {};

	return (
		<div id='PaymentForm'>
			<Row gutter={[0, 40]} justify='center'>
				<Col span={12}>
					{' '}
					<Cards
						cvc={creditCard.cvc}
						expiry={creditCard.expiry}
						focused={creditCard.focus}
						name={creditCard.name}
						number={creditCard.number}
					/>
				</Col>
			</Row>
			<Row justify='center'>
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
						<Form.Item label='Card Number'>
							<Input
								value={creditCard.number}
								maxLength={16}
								name='number'
								placeholder='Card Number'
								className='custom-input'
								onChange={handleInputChange}
								onFocus={handleInputFocus}
							/>
						</Form.Item>
						<Form.Item label='Name'>
							<Input
								value={creditCard.name}
								name='name'
								placeholder='Name'
								className='custom-input'
								onChange={handleInputChange}
								onFocus={handleInputFocus}
							/>
						</Form.Item>
						<Form.Item label='Expiry Date'>
							<Input
								value={creditCard.expiry}
								maxLength={4}
								name='expiry'
								placeholder='Expiry Date'
								className='custom-input'
								onChange={handleInputChange}
								onFocus={handleInputFocus}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								onClick={onFinish}
								style={{ width: '100%' }}
								size='large'
								className='custom-button'
							>
								Save
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

const EventList = () => {
	const [eventElement, setEvenElement] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(-1);
	const [modalVisible, setModalVisible] = useState(false);

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
					}}
				>
					{/* {eventElement} */}
					<Event />
					<Divider />
				</div>
				<Row justify='center'>
					<Col span={12}>
						<Button
							onClick={() => {
								setSelectedEvent(-1);
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
					dataSource={[{ area: 'VIP', seat: 'Row 2, Col 10' }]}
					renderItem={(item) => (
						<List.Item>
							<Row style={{ width: '100%', textAlign: 'center' }}>
								<Col span={2}>
									<QrcodeOutlined
										onClick={() => {
											setModalVisible(true);
										}}
										style={{ color: '#0e131d', fontSize: 20 }}
									/>
								</Col>
								<Col span={6}>{item.area}</Col>
								<Col span={8}>{item.seat}</Col>
								<Col span={8}>$1280</Col>
							</Row>
						</List.Item>
					)}
				/>
				<Modal
					title={'Passport'}
					className='custom-modal'
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
					width={'90%'}
					visible={modalVisible}
					footer={null}
					onCancel={() => {
						setModalVisible(false);
					}}
				>
					<Row justify='center'>
						<Col xs={22} sm={22} md={14} lg={14}>
							<img
								style={{ width: '100%' }}
								src={
									'https://store-images.s-microsoft.com/image/apps.3104.14481483800220513.5d6b67d5-bde5-4f6b-9e61-27c8013e2ec6.9c60dd5e-6a52-40e1-af64-12ba12c450db?mode=scale&q=90&h=200&w=200&background=%230078D7'
								}
							/>
						</Col>
					</Row>
				</Modal>
			</Card>
		);
	}

	return (
		<Card
			style={{
				backgroundColor: '#fafafa',
				borderRadius: 20,
				width: '100%',
				marginTop: 10,
			}}
		>
			<div onClick={() => setSelectedEvent(1)}>
				<Event />
				<Divider />
			</div>
			<div style={{ textAlign: 'center', color: '#000', fontWeight: 'bold' }}>
				Total No. Events: 1
			</div>
		</Card>
	);
};

const Event = () => {
	return (
		<Row align='middle' tyle={{ backgroundColor: 'red', height: 100 }}>
			<Col span={5}>
				<Row align='middle'>
					<Col span={24} style={{ marginLeft: 30 }}>
						<img
							style={{
								height: 50,
								width: 50,
								objectFit: 'cover',
								borderRadius: 50,
							}}
							src='https://www.tickethk.com/images/posters/1542.jpg?v=90011'
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
							MIRROR 演唱會 2021
						</Paragraph>
					</Col>
					<Col span={24} style={{ fontSize: 10, color: '#8a8a8a' }}>
						<Paragraph ellipsis>
							{moment().format('DD MMM, YYYY | HH:mm a')}
						</Paragraph>
					</Col>
				</Row>
			</Col>
			<Col span={4} style={{ fontWeight: 'bold', color: '#2b2b2b' }}>
				<span style={{ fontSize: 24 }}> 1 </span> TKS
			</Col>
		</Row>
	);
};

export default Account;

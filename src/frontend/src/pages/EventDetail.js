import React, { useState } from 'react';
import {
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
} from 'antd';
import Slider from 'react-slick';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import {
	CalendarOutlined,
	AimOutlined,
	PlusOutlined,
	MinusOutlined,
} from '@ant-design/icons';
import StripePayment from '../components/StripePayment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import Content from '../components/Content';
import AppLayout from '../components/AppLayout';

const { Title, Text } = Typography;

const { Option } = Select;

const bannerSettings = {
	className: 'slider variable-width',
	dots: false,
	infinite: true,
	arrows: false,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	fade: true,
	autoplaySpeed: 3000,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				dots: false,
			},
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				initialSlide: 1,
				dots: true,
				// arrows: false,
			},
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
			},
		},
	],
};

const Banner = ({ event }) => {
	return (
		<div>
			<div
				className='event-banner'
				style={{
					width: '100%',
					height: '40vw',
					maxHeight: 658,
					position: 'relative',
				}}
			>
				<Slider
					{...bannerSettings}
					style={{
						width: '100%',
						height: '40vw',
						maxHeight: 658,
						position: 'relative',
					}}
				>
					<div>
						<img
							style={{
								width: '100%',
								height: '40vw',
								maxHeight: 658,
								objectFit: 'cover',
								position: 'relative',
							}}
							src='https://hk.ulifestyle.com.hk/cms/images/event/1024x576/201811/20181105123258_0_12324354678.jpg'
							alt='banner_home'
						/>
					</div>
				</Slider>

				<Row>
					<Col
						xs={0}
						sm={0}
						md={24}
						lg={24}
						xl={24}
						style={{ position: 'absolute', right: '2%', top: '15%' }}
					>
						<Row>
							<Col md={20} lg={20}>
								<Card style={{ borderRadius: 25 }} hoverable>
									<EventForm />
								</Card>
							</Col>
						</Row>
					</Col>
				</Row>
			</div>
		</div>
	);
};

const EventDetail = () => {
	return (
		<AppLayout>
			<Content fullWidth>
				<div style={{ marginTop: 30 }}>
					<Banner />
					<Row>
						<Col xs={24} sm={24} md={0} lg={0} xl={0}>
							<Row
								justify='center'
								style={{ marginTop: 40 }}
								className='event-form'
							>
								<Col span={22}>
									<Card style={{ borderRadius: 25, zIndex: 2 }} hoverable>
										<EventForm />
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
				</div>
			</Content>
			<Content>
				<Detail />
			</Content>
		</AppLayout>
	);
};

const EventForm = ({ tickets, event }) => {
	const history = useHistory();

	const selectTicket = async () => {
		setSeatObj({
			total_price: 1280,
			selectedArea: 'VIP',
			commission: 1.2,
			totalSelectedTicket: 1,
		});
		setStage('checkout');
	};

	const [stage, setStage] = useState('preview');
	const [seatObj, setSeatObj] = useState({});

	if (stage === 'preview') {
		return (
			<Row
				justify='center'
				layout='vertical'
				gutter={[24, 0]}
			>
				<Col span={22}>
					<Row>
						<Col span={4}>
							<CalendarOutlined style={{ fontSize: 28 }} />
						</Col>
						<Col span={20}>
							<span style={{ fontWeight: 'bold' }}>
								{moment().format('dddd, MMMM Do YYYY')}
							</span>
							<br />
							<span>
								FROM {moment().format('HH:mm A')} <br />
								TO {moment().format('HH:mm A')}
							</span>
						</Col>
					</Row>
				</Col>
				<Divider />
				<Col span={22}>
					<a
						target='_blank'
						href={`https://maps.google.com/maps?q=0, 0&z=20&language=zh-HK`}
					>
						<Row style={{ color: '#0e131d' }}>
							<Col span={4}>
								<AimOutlined style={{ fontSize: 28 }} />
							</Col>
							<Col span={20}>
								<span>紅館</span>
								<br />
								<span>HK</span>
								<br />
								<span>HK, Kowloon</span>
							</Col>
						</Row>
					</a>
				</Col>
				<Divider />
				<Col span={22}>
					<Button
						shape='round'
						style={{
							width: '100%',
							backgroundColor: '#fff',
							borderColor: '#000',
							color: '#000',
							height: 50,
							fontWeight: 'bold',
							zIndex: 2,
						}}
						onClick={() => setStage('buying')}
					>
						Purchase Tickets
					</Button>
				</Col>
			</Row>
		);
	}

	if (stage === 'buying') {
		return (
			<Spin spinning={false}>
				<Row
					justify='center'
					align='bottom'
					layout='vertical'
					gutter={[24, 12]}
					style={{ marginTop: 10, width: 600 }}
				>
					<Col span={22} style={{ fontWeight: 'bold' }}>
						Select Ticket
					</Col>
					<AreaPicker />

					<Col span={22}>
						<Button
							loading={false}
							shape='round'
							style={{
								marginTop: 20,
								width: '80%',
								background: '#fff',
								color: '#000',
								borderColor: '#000',
								height: 50,
								fontWeight: 'bold',
							}}
							onClick={selectTicket}
						>
							Checkout
						</Button>
						<Button
							loading={false}
							type='text'
							style={{
								width: '80%',
								fontSize: 12,
								color: '#9a9a9a',
								padding: 0,
							}}
							onClick={() => setStage('preview')}
						>
							Back
						</Button>
					</Col>
				</Row>
			</Spin>
		);
	}

	const onSuccess = async () => {
		message.success('Checkout Successfully.');
		history.push('/account?tab=wallet');
	};

	if (stage === 'checkout') {
		return (
			<Row
				justify='center'
				align='bottom'
				layout='vertical'
				style={{ marginTop: 10 }}
			>
				<Col span={24} style={{ width: 500 }}>
					<StripePayment seatObj={seatObj} onSuccess={onSuccess} />
					<Button
						type='text'
						style={{
							width: '100%',
							fontSize: 12,
							color: '#9a9a9a',
							padding: 0,
						}}
						onClick={() => {
							setStage('buying');
							setSeatObj({});
						}}
					>
						Back
					</Button>
				</Col>
			</Row>
		);
	}
};

const Detail = () => {
	return (
		<Row gutter={[0, 0]} style={{ color: '#000', marginTop: 50 }}>
			<Col xs={24} sm={24} md={24} lg={16}>
				<Row gutter={[24, 24]}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={1} style={{ color: '#000' }}>
							MIRROR 2021 演唱會
						</Title>
						<Divider
							style={{ borderColor: '#000', borderWidth: 4, borderRadius: 8 }}
						/>
						<Text
							style={{
								color: '#000',
								textDecoration: 'underline',
								fontSize: 16,
							}}
						>
							Organization: XXX Company
						</Text>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={2} style={{ color: '#000' }}>
							Description
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<ReactQuill
							theme={['bubble']}
							value='<p>ViuTV全新男子組合MIRROR即將舉行首個演唱會！ViuTV早在11月3日於鑽石山荷里活廣場舉行ViuTV男子組合誕生日發佈會，宣佈MIRROR正式出道，並將於12月21日舉行首個演唱會！粉絲們快留意買飛日子喇！
						</p>
						<br />
						<p>
						ViuTV全力打造的男子組合MIRROR由12名ViuTV大型選秀節目《Good Night Show全民造星》中的參賽者組成。成員包括隊長楊樂文 (Lokman)、王智德 (Alton)、江熚生(Anson Kong)、 盧瀚霆 (Anson Lo)、呂爵安(Edan)、陳瑞輝 (Frankie)、陳卓賢 (Ian)、柳應廷 (Jer)、李駿傑 (Jeremy)、姜濤(Show)、邱士縉 (Stanley)及邱傲然(Tiger)。
						</p>'
							readOnly
							className='read-only'
						/>

						<div style={{ color: '#000' }}></div>
					</Col>
				</Row>
				<Row gutter={[24, 12]} style={{ color: '#000', marginTop: 30 }}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={3} style={{ color: '#000' }}>
							Hour
						</Title>
					</Col>
					<Col>
						<Text style={{ color: '#000' }}>
							{moment().format('YYYY-MM-DD - dddd, HH:mm a')} -
							{moment().format('HH:mm a')}
						</Text>
					</Col>
				</Row>
				<Row
					gutter={[24, 12]}
					style={{ color: '#000', marginTop: 30, marginBottom: 30 }}
				>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={3} style={{ color: '#000' }}>
							How can I contact the organizer with any questions?
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Text style={{ color: '#000' }}>
							If you have any questions, please contact us with email at{' '}
							contact@contact.com or phone +852-12345678
						</Text>
					</Col>
				</Row>
			</Col>
			<Col xs={24} sm={24} md={24} lg={8}>
				<Row gutter={[0, 24]}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={2} style={{ color: '#000' }}>
							Event Location
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={24}>
						<div>
							<iframe
								src={`https://maps.google.com/maps?q=22.3014048,114.1820327&z=17&output=embed&language=zh-HK`}
								width='100%'
								height='400'
							></iframe>
						</div>
					</Col>
					<Col></Col>
				</Row>
				<Row gutter={[0, 24]}>
					<Col xs={24} sm={24} md={24} lg={24}>
						<Title level={2} style={{ color: '#000', margin: 0 }}>
							Categories
						</Title>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18}>
						<Tag
							style={{
								padding: '8px 20px',
								fontWeight: 'bold',
								margin: '0px 8px',
								borderColor: '#000',
								color: '#000',
							}}
						>
							#Music
						</Tag>
					</Col>
					<Col></Col>
				</Row>
				<Row gutter={[0, 24]}>
					<Col xs={24} sm={24} md={24} lg={24}>
						<Title level={2} style={{ color: '#fff', margin: 0 }}>
							Tags
						</Title>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18}>
						<Tag
							style={{
								padding: '8px 20px',
								fontWeight: 'bold',
								margin: '0px 8px',
								borderColor: '#000',
								color: '#000',
							}}
						>
							#Music
						</Tag>
					</Col>
					<Col></Col>
				</Row>
			</Col>
		</Row>
	);
};

const AreaPicker = () => {
	return (
		<Col span={22}>
			<Row gutter={[0, 12]} align='middle'>
				<Col span={6} style={{ fontWeight: 'bold', color: '#060a10' }}>
					$1280
				</Col>
				<Col span={10} style={{ fontWeight: 'bold' }}>
					<Select
						bordered={false}
						placeholder='Area'
						style={{ width: '80%', borderRadius: 15 }}
					>
						<Option>VIP</Option>
					</Select>
				</Col>
				<Col span={8}>
					<Row align='middle'>
						<MinusOutlined />
						<span style={{ margin: '0px 15px' }}>1</span>
						<PlusOutlined />
					</Row>
				</Col>
			</Row>
		</Col>
	);
};

export default EventDetail;

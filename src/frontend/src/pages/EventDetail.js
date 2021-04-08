import React, { useState, useEffect } from 'react';
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
} from 'antd';
import Slider from 'react-slick';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import {
	CalendarOutlined,
	AimOutlined,
	PlusOutlined,
	MinusOutlined,
} from '@ant-design/icons';
import StripePayment from '../components/StripePayment';
import * as Service from '../core/Service';
import { EventsWithSlider } from './EventList';

import Content from '../components/Content';
import AppLayout from '../components/AppLayout';

const { Title, Text } = Typography;

const { Option } = Select;

const bannerSettings = {
	// className: 'slider variable-width',
	// centerMode: true,
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
	const location = useLocation();

	return (
		<div>
			{/* <Col xs={24} sm={24} md={24} lg={0} xl={0}> */}

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
							src={event.banner_1}
							alt='banner_home'
						/>
					</div>
					{event.banner_2 !== '' && (
						<div>
							<img
								style={{
									width: '100%',
									height: '40vw',
									maxHeight: 658,
									objectFit: 'cover',
									position: 'relative',
								}}
								src={event.banner_2}
								alt='banner_home'
							/>
						</div>
					)}
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
						{/* <div > */}
						<Row>
							<Col md={20} lg={20}>
								<Card style={{ borderRadius: 25 }} hoverable>
									<EventForm event={location.state.event} />
								</Card>
							</Col>
						</Row>
						{/* </div> */}
					</Col>
				</Row>
			</div>
			{/* </Col> */}
		</div>
	);
};

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
				<div style={{ marginTop: 30 }}>
					<Banner event={event} />
					<Row>
						<Col xs={24} sm={24} md={0} lg={0} xl={0}>
							<Row
								justify='center'
								style={{ marginTop: 40 }}
								className='event-form'
							>
								<Col span={22}>
									<Card style={{ borderRadius: 25, zIndex: 2 }} hoverable>
										<EventForm event={location.state.event} />
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
					{/* <Slider {...bannerSettings} style={{ margin: 0, padding: 0, width: '100%' }}>
            {banners}
          </Slider> */}
					{/* <Row
            align="middle"
            style={{
              backgroundImage: `url('${event.banner_2}')`,
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
          </Row> */}
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
	const history = useHistory();

	const user = useSelector((state) => state.app.user);

	useEffect(() => {
		setLoading(true);
		setTicket();
		setLoading(false);
	}, []);

	const setTicket = async () => {
		let tickets = await Service.call('get', '/api/sc/event/ticket');
		tickets = tickets[location.state.event.eventId];
		let events = await Service.call('get', '/api/sc/event');
		let ticketGroupPrice = _.groupBy(tickets, 'price');
		let ticketsMapPrice = {};
		_.each(ticketGroupPrice, (item, key) => {
			let area = _.uniq(_.map(item, 'area'));
			ticketsMapPrice[key] = area;
		});
		let ticketArea = _.map(tickets, 'area');
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
		getTicketAreaOption();
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

	const selectTicket = async () => {
		if (user.user_id <= 0) return message.warning('Please Login First');
		if (user.wallet_address === '') {
			return message.warning('invalid address');
		}
		setLoading(true);
		let tickets = await Service.call('post', '/api/sc/event/ticket/onsell', {
			selectedArea,
		});
		let totalSelectedTicket = selectedTickets[selectedArea];
		setLoading(false);

		if (_.isEmpty(tickets)) return message.warning('Sold Out!');

		let result = await Service.call(
			'post',
			'/api/sc/event/ticket/buy/commission',
			{
				address: user.wallet_address,
				tickets,
				total: totalSelectedTicket,
			}
		);

		setSeatObj({
			total_price: tickets[0].price,
			selectedArea,
			commission: result.commission,
			totalSelectedTicket,
		});
		setStage('checkout');
	};

	const [stage, setStage] = useState('preview');
	const [seatObj, setSeatObj] = useState({});
	const [selectedTickets, setSelectedTickets] = useState({});
	const [selectedArea, setSelectedArea] = useState('');

	if (stage === 'preview') {
		return (
			<Row
				justify='center'
				layout='vertical'
				gutter={[24, 0]}
				// style={{ padding: 50 }}
			>
				<Col span={22}>
					<Row>
						<Col span={4}>
							<CalendarOutlined style={{ fontSize: 28 }} />
						</Col>
						<Col span={20}>
							<span style={{ fontWeight: 'bold' }}>
								{moment.unix(event.start_time).format('dddd, MMMM Do YYYY')}
							</span>
							<br />
							<span>
								FROM {moment.unix(event.start_time).format('HH:mm A')} <br />
								TO {moment.unix(event.end_time).format('HH:mm A')}
							</span>
						</Col>
					</Row>
				</Col>
				<Divider />
				<Col span={22}>
					<a
						target='_blank'
						href={`https://maps.google.com/maps?q=${event.latitude}, ${event.longitude}&z=20&language=zh-HK`}
					>
						<Row style={{ color: '#0e131d' }}>
							<Col span={4}>
								<AimOutlined style={{ fontSize: 28 }} />
							</Col>
							<Col span={20}>
								<span>{event.venue}</span>
								<br />
								<span>{event.district}</span>
								<br />
								<span>
									{event.region}, {event.country}
								</span>
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
							backgroundColor: '#0e131d',
							color: '#fff',
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
			<Spin spinning={ticketAreaOptionLoading}>
				<Row
					justify='center'
					align='bottom'
					layout='vertical'
					gutter={[24, 12]}
					style={{ marginTop: 10, width: 600 }}
					// style={{ width: 500 }}
				>
					<Col span={22} style={{ fontWeight: 'bold' }}>
						Select Ticket
					</Col>
					{ticketAreaOption}

					<Col span={22}>
						<Button
							loading={loading}
							shape='round'
							style={{
								marginTop: 20,
								width: '80%',
								background: 'linear-gradient(90deg,#0e131d,#060a10 90.65%)',
								color: '#fff',
								height: 50,
								fontWeight: 'bold',
							}}
							onClick={selectTicket}
						>
							Checkout
						</Button>
						<Button
							loading={loading}
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

	const onSuccess = async (payload) => {
		console.log('payload', payload);
		setLoading(true);
		let tickets = await Service.call('post', '/api/sc/event/ticket/onsell', {
			selectedArea,
		});
		let totalSelectedTicket = selectedTickets[selectedArea];
		let result = await Service.call('post', '/api/sc/event/ticket/buy', {
			address: user.wallet_address,
			tickets,
			total: totalSelectedTicket,
		});
		setLoading(false);

		message.success('Checkout Successfully.');
		history.push('/account?tab=wallet');
	};

	if (stage === 'checkout') {
		return (
			<Row
				justify='center'
				align='bottom'
				layout='vertical'
				// gutter={[24, 12]}
				style={{ marginTop: 10 }}
			>
				<Col span={24} style={{ width: 500 }}>
					<StripePayment
						loading={loading}
						seatObj={seatObj}
						onSuccess={onSuccess}
					/>
				</Col>
			</Row>
		);
	}

	if (loading) return null;

	return (
		<Row justify='center' layout='vertical' gutter={[24, 0]}>
			<Spin spinning={true} />
		</Row>
	);
};

const Detail = ({ event }) => {
	return (
		<Row gutter={[0, 0]} style={{ color: '#fff', marginTop: 50 }}>
			<Col xs={24} sm={24} md={24} lg={16}>
				<Row gutter={[24, 24]}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={1} style={{ color: '#fff' }}>
							{event.name}
						</Title>
						<Divider
							style={{ borderColor: '#fff', borderWidth: 4, borderRadius: 8 }}
						/>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={2} style={{ color: '#fff' }}>
							Description
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<pre style={{ color: '#fff' }}>{event.long_desc}</pre>
					</Col>
				</Row>
				<Row gutter={[24, 12]} style={{ color: '#fff', marginTop: 30 }}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={3} style={{ color: '#fff' }}>
							Hour
						</Title>
					</Col>
					<Col>
						<Text style={{ color: '#fff' }}>
							{moment
								.unix(event.start_time)
								.format('YYYY-MM-DD - dddd, HH:mm a')}{' '}
							-{moment.unix(event.end_time).format('HH:mm a')}
						</Text>
					</Col>
				</Row>
				<Row
					gutter={[24, 12]}
					style={{ color: '#fff', marginTop: 30, marginBottom: 30 }}
				>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={3} style={{ color: '#fff' }}>
							How can I contact the organizer with any questions?
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Text style={{ color: '#fff' }}>
							If you have any questions, please contact us with email at{' '}
							{event.email} or phone {event.contact_no}
							{event.contact}
						</Text>
					</Col>
				</Row>
			</Col>
			<Col xs={24} sm={24} md={24} lg={8}>
				<Row gutter={[0, 24]}>
					<Col xs={24} sm={24} md={24} lg={20}>
						<Title level={2} style={{ color: '#fff' }}>
							Event Location
						</Title>
					</Col>
					<Col xs={24} sm={24} md={24} lg={24}>
						<div>
							<iframe
								src={`https://maps.google.com/maps?q=${event.latitude}, ${event.longitude}&z=17&output=embed&language=zh-HK`}
								width='100%'
								height='400'
								frameborder='0'
							></iframe>
						</div>
					</Col>
					<Col></Col>
				</Row>
				<Row gutter={[0, 24]}>
					<Col xs={24} sm={24} md={24} lg={24}>
						<Title level={2} style={{ color: '#fff', margin: 0 }}>
							Categories
						</Title>
					</Col>
					<Col xs={24} sm={24} md={18} lg={18}>
						{_.map(JSON.parse(event.categories), (value) => {
							return (
								<Tag
									style={{
										padding: '8px 20px',
										fontWeight: 'bold',
										margin: '0px 8px',
										backgroundColor: '#ffffff00',
										color: '#fff',
									}}
								>
									{value.toUpperCase()}
								</Tag>
							);
						})}
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
						{_.map(JSON.parse(event.tags), (value) => {
							return (
								<Tag
									style={{
										padding: '8px 20px',
										fontWeight: 'bold',
										margin: '0px 8px',
										backgroundColor: '#ffffff00',
										color: '#fff',
									}}
								>
									{value.toUpperCase()}
								</Tag>
							);
						})}
					</Col>
					<Col></Col>
				</Row>
			</Col>
		</Row>
	);
};

const RelatedEvents = ({ event }) => {
	return (
		<div style={{ margin: '100px 0' }}>
			<Row gutter={[0, 24]}>
				<Col span={24}>
					<Title level={3} style={{ color: '#fff' }}>
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
	const [areaPicked, setAreaPicked] = useState('');
	const [totalTicketSelected, setTotalTicketSelected] = useState(0);
	return (
		<Col span={22}>
			<Row gutter={[0, 12]} align='middle'>
				<Col span={6} style={{ fontWeight: 'bold', color: '#060a10' }}>
					{_.toInteger(price) !== 0 ? `$${_.toInteger(price)}` : 'FREE'}
				</Col>
				<Col span={10} style={{ fontWeight: 'bold' }}>
					<Select
						dropdownClassName='custom-dropdown'
						onChange={(selectedArea) => {
							setAreaPicked((prev) => {
								setSelectedTickets({ [selectedArea]: 1 });
								setSelectedArea(selectedArea);
								setTotalTicketSelected(1);
								return selectedArea;
							});
						}}
						bordered={false}
						placeholder='Area'
						style={{ width: '80%', borderRadius: 15 }}
					>
						{ticketAreaArr.map((item) => (
							<Option key={item} value={item}>
								{item}
							</Option>
						))}
					</Select>
				</Col>
				<Col span={8}>
					<Row align='middle'>
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

						<span style={{ margin: '0px 15px' }}>{totalTicketSelected}</span>
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
		<div class='ticket'>
			<div class='ticket--center'>
				<div class='ticket--center--row'>
					<div class='ticket--center--col'>
						<span>Your ticket for</span>
						<strong>The event name</strong>
					</div>
				</div>
				<div class='ticket--center--row'>
					<div class='ticket--center--col'>
						<span class='ticket--info--title'>Date and time</span>
						<span class='ticket--info--subtitle'>Thursday, May 14 2020</span>
						<span class='ticket--info--content'>
							7:00 am to 9:00 pm (GMT+1)
						</span>
					</div>
					<div class='ticket--center--col'>
						<span class='ticket--info--title'>Location</span>
						<span class='ticket--info--subtitle'>Location name</span>
						<span class='ticket--info--content'>
							Location complete address, Town, COUNTRY
						</span>
					</div>
				</div>
				<div class='ticket--center--row'>
					<div class='ticket--center--col'>
						<span class='ticket--info--title'>Ticket type</span>
						<span class='ticket--info--content'>Event category</span>
					</div>
					<div class='ticket--center--col'>
						<span class='ticket--info--title'>Order info</span>
						<span class='ticket--info--content'>
							Order #0123456789. Ordered By Jhon DOE
						</span>
					</div>
				</div>
			</div>
			<div class='ticket--end'>
				<div>
					<img src='https://upload.wikimedia.org/wikipedia/commons/7/78/Qrcode_wikipedia_fr_v2clean.png' />
				</div>
				<div>
					<img
						style={{ width: 100 }}
						src='https://www.fueledbyramen.com/sites/g/files/g2000005606/f/201702/FBR_Site_Assets_ArtistPanels_OOR.svg'
					/>
				</div>
			</div>
		</div>
	);
};

export default EventDetail;

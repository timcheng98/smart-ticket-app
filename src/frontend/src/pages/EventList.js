import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Input, Button, Row, Col, Card, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalSeats } from '../redux/actions/common';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import {
	ShareAltOutlined,
	HeartFilled,
	FireFilled,
	SearchOutlined,
	FacebookFilled,
	WhatsAppOutlined,
	InstagramFilled
} from '@ant-design/icons';
import * as Service from '../core/Service'
import { EventAPI } from '../api/smart-contract/event';
import AppLayout from '../components/AppLayout';
import Content from '../components/Content';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
	className: 'slider variable-width',
	// centerMode: true,
	variableWidth: true,
	dots: true,
	infinite: false,
	arrows: false,
	speed: 1000,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	autoplaySpeed: 3000,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: false,
				dots: false
			}
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				initialSlide: 1,
				dots: false,
				infinite: true,
				// arrows: false,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false,
				infinite: true
			}
		}
	]
};

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
				dots: false
			}
		},
		{
			breakpoint: 800,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				initialSlide: 1,
				dots: true,
				// arrows: false,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: false
			}
		}
	]
};

const EventList = () => {
	const [events, setEvents] = useState({});

	useEffect(() => {
		getInitialData();
	}, []);

	const getInitialData = async () => {
		let events = await Service.call('get', '/api/sc/event');
		setEvents(events);
	}

	return (
		<AppLayout>
			<Content fullWidth>
				<Row style={{ marginTop: 30 }}>
					<Col span={24}><Banner events={events} /></Col>
				</Row>
			</Content>
			<Content>
				<Row justify='center'>
					<Col span={24}>

					</Col>
					<Col xs={20} sm={20} md={12} lg={12} style={{ margin: -40 }}>
						<Input
							placeholder='Search Events...'
							suffix={
								<SearchOutlined
									style={{ fontSize: 28, paddingRight: 10, color: '#0e131d' }}
								/>
							}
							size="large"
							style={{ height: 60, fontSize: 46, borderRadius: 30, paddingLeft: 30 }}
						/>
					</Col>
				</Row>
				<Row
					gutter={[0, 20]}
					justify='center'
					style={{ paddingTop: 50, width: '80vw', margin: 'auto' }}
				>
					<Col
						xs={24}
						sm={24}
						md={18}
						lg={18}
						style={{ fontSize: 32, fontWeight: 'bold', color: '#fff' }}
					>
						Events
				</Col>
					<Col
						xs={22}
						sm={22}
						md={18}
						lg={18}
						style={{ color: '#fff', fontWeight: 'bold', marginBottom: 30 }}
					>
						<span style={{ marginRight: 40, color: '#FFFF00' }}>All</span>
						<span style={{ marginRight: 40 }}>Upcoming</span>
						<span style={{ color: '#4b607e' }}>Past</span>
					</Col>
				</Row>
				<Row
					justify='center'
					style={{ paddingTop: 20, width: '80vw', margin: 'auto' }}
				>
					<Col xs={24} sm={24} md={18} lg={18}>
						<Row gutter={[0, 60]}>
							<Events events={events} />
						</Row>
					</Col>
				</Row>
			</Content>
		</AppLayout>
	);
};

const Banner = ({ events }) => {
	// console.log(events);
	const [banners, setBanners] = useState(null);

	useEffect(() => {
		getBanners();
	}, [events]);

	const getBanners = () => {
		let banners = [];
		let eventsMap = _.map(events, 'banner_1');
		_.map(eventsMap, (src) => {
			banners.push((
				<div style={{ margin: 0, padding: 0 }}>

					<div style={{ position: 'relative', backgroundImage: `url('${src}')`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', margin: 0, paddingBottom: 400, width: '100%' }} ></div>
					{/* <img
							style={{ width: '100%', height: '100%', objectFit: 'cover', height: 400 }}
							src={src}
						/> */}
				</div>
			))
		});
		setBanners(banners)
	}

	return (
		// <div style={{ margin: 0, height: 400, width: '100%' }}>
		<Slider {...bannerSettings} style={{ margin: 0, padding: 0, width: '100%' }}>
			{banners}
		</Slider>
		// </div>
	);
};

const EventItem = ({ event, padding }) => {

	let daysLeft = '';
	if (event.close_date > moment().unix()) {
		daysLeft = `${moment.unix(event.close_date).fromNow()} Left`;
	}
	console.log(event.close_date > moment().unix());
	return (
		<Card
			style={{
				borderRadius: 18,
				borderWidth: 1,
				// width: 350
			}}
			bordered
			hoverable
			bodyStyle={{ padding: padding || 0 }}
			cover={
			
				<div style={{ width: '100%', height: '100%', overflow: 'hidden', borderTopRightRadius: 15, borderTopLeftRadius: 15 }}>
				<Link to={{
					pathname: '/event',
					state: { event }
				}}>		<img
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderTopRightRadius: 15,
							borderTopLeftRadius: 15,
							height: 160,
							borderWidth: 0,
						}}
						src={event.thumbnail}
						className="event-thumbnail"
					/>
					</Link>
					<div style={{ position: 'absolute', top: 15, right: 15 }}>
						<Button
							style={{ marginRight: 12 }}
							shape='circle'
							size='small'
							icon={
								<HeartFilled
									style={{ color: '#0e131d', transform: 'translate(0, -15%)' }}
								/>
							}
						/>
						<Popover
							content={(
								<Row gutter={[16, 0]}>
									<Col>
										<WhatsAppOutlined
											style={{ color: '#87d068', fontSize: 24 }}
										/>
									</Col>
									<Col>
										<InstagramFilled
											style={{ color: '#8a3ab9', fontSize: 24 }}
										/>
									</Col>
									<Col>
										<FacebookFilled
											style={{ color: '#108ee9', fontSize: 24 }}
										/>
									</Col>
								</Row>)
							}
						>
							<Button
								shape='circle'
								size='small'
								icon={
									<ShareAltOutlined
										style={{ color: '#0e131d', transform: 'translate(0, -15%)' }}
									/>
								}
							/>
						</Popover>
					</div>
					<div style={{ position: 'absolute', bottom: 5, right: 15 }}>
						<FireFilled
							style={{
								fontSize: 20,
								color: '#0e131d',
								transform: 'translate(0, -15%)',
							}}
						/>
					</div>
				</div>
			}
		>
			<Col span={24} style={{ padding: 0 }}>
				<Row gutter={[24, 10]}>
					<Col span={24} style={{ fontWeight: 'bold', fontSize: 16 }}>
						{event.name}
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24}>
						{_.map(JSON.parse(event.tags), (value) => {
							return (
								<Button
									size='small'
									style={{
										fontSize: 12,
										// padding: 12,
										transform: 'scale(0.833)',
										borderRadius: 4,
										fontWeight: 'bold',
										borderColor: '#0e131d',
										color: '#FFFFFF',
										backgroundColor: '#0e131d',
										marginRight: 0,
									}}
								>
									#{value.toUpperCase()}
								</Button>
							)
						})}
					</Col>
				</Row>
				<Row gutter={[24, 0]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						{moment.unix(event.start_time).format('MMM DD | HH:mm a')}
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						{event.fullAddress}
					</Col>
				</Row>
				<Row justify='center'>
					<Col span={24}>
						<Link to={{
							pathname: '/event',
							state: { event }
						}}>
							<Button
								// disabled={daysLeft === ''}
								size="large"
								style={{
									borderRadius: 4,
									fontWeight: 'bold',
									width: '100%',
									borderColor: '#0e131d',
									color: '#FFFFFF',
									backgroundColor: '#0e131d',
								}}
							>
								{daysLeft === '' ? 'END' : 'BUY TICKET'}
							</Button>
						</Link>
					</Col>
					{daysLeft !== '' &&
						<Col style={{ textAlign: 'center', marginTop: 8 }}>
							<span
								style={{
									textAlign: 'center',
									fontSize: 12,
									fontWeight: 'bold',
									color: '#5a5a5a',
									borderColor: '#fafafa',
									backgroundColor: '#fafafa',
								}}
							>
								{daysLeft}
							</span>
						</Col>
					}
				</Row>
			</Col>
		</Card>
	);
};

export const Events = ({ events }) => {
	const EventList = () => {
		let eventItem = [];
		_.each(events, (item) => {
			eventItem.push((
				<Col xs={24} sm={24} md={8} lg={8} xl={8}>
					<EventItem event={item} padding={20} />
				</Col>))
		})
		return eventItem;
	};

	return (
		<Row gutter={[{ xs: 0, sm: 0, md: 24, lg: 24 }, 48]}>
			{EventList()}
		</Row>
	);
};

export const EventsWithSlider = ({ event }) => {
	const [eventArr, setEventArr] = useState({});

	useEffect(() => {
		getInitialData()
	}, []);

	const getInitialData = async () => {
		let events = await Service.call('get', '/api/sc/event');
		setEventArr(events)
	}


	const EventList = () => {
		let eventItem = [];
		_.each(eventArr, (item, key) => {
			// if (event.eventId === item.eventId) return null;
			eventItem.push((
				<div
					style={{
						position: 'relative',
						width: 350,
						margin: 0,
						maxWidth: '80vw',
					}}
				>
					<EventItem event={item} padding={20} />
				</div>
			))
		})
		return eventItem;
	};


	return (
		<Slider {...settings} style={{ margin: 0, width: '100%' }}>
			{EventList()}
		</Slider>
	);
};

export default EventList;

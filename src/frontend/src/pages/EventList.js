import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Input, Button, Row, Col, Card, Carousel } from 'antd';
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
} from '@ant-design/icons';
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
	infinite: true,
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
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				dots: true
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
	return (
		<AppLayout>
			<Content fullWidth>
				<Row>
					<Col span={24}><Banner /></Col>
				</Row>				
			</Content>
			<Content>
			<Row justify='center'>
				<Col span={24}>
					
				</Col>
				<Col xs={18} sm={18} md={12} lg={12} style={{ margin: -20 }}>
					<Input
						placeholder='Search Events...'
						suffix={
							<SearchOutlined
								style={{ fontSize: 28, paddingRight: 10, color: '#0e131d' }}
							/>
						}
						style={{ height: 50, borderRadius: 30 }}
					/>
				</Col>
			</Row>
			<Row
				gutter={[0, 20]}
				justify='center'
				style={{ paddingTop: 50, width: '80vw', margin: 'auto' }}
			>
				<Col
					xs={22}
					sm={22}
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
					<span style={{ color: '#4b607e'}}>Past</span>
				</Col>
			</Row>
			<Row
				justify='center'
				style={{ paddingTop: 20, width: '80vw', margin: 'auto' }}
			>
				<Col xs={22} sm={22} md={18} lg={18}>
					<Row gutter={[48, 60]}>
						<Events />
					</Row>
				</Col>
			</Row>
			</Content>
		</AppLayout>
	);
};

const Banner = () => {
	return (			
		<div style={{height: 400}}>
			<img
				style={{ width: '100%', height: '100%', objectFit: 'cover' }}
				src='https://www.animephproject.com/wp-content/uploads/2016/01/cropped-revised-one-ok-rock-banner-1345-x-542.jpg'
			/>
		</div>
	);
};

const EventItem = ({ event, padding }) => {

	let daysLeft = '';
	if (event.endDateSell > moment().unix()) {
		daysLeft = `${moment.unix(event.endDateSell).fromNow()} Left`;
	}

	return (
		<Card
			style={{
				borderRadius: 18,
				borderWidth: 1,
			}}
			bordered
			hoverable
			bodyStyle={{ padding: padding || 0 }}
			cover={
				<div style={{ width: '100%', height: '100%' }}>
					<img
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderTopRightRadius: 15,
							borderTopLeftRadius: 15,
							height: 160,
							borderWidth: 0,
						}}
						src='https://www.timesunioncenter-albany.com/mc_images/product/image/Website03.jpg'
					/>
					<div style={{ position: 'absolute', top: 15, right: 15 }}>
						<Button
							style={{ marginRight: 12 }}
							shape='circle'
							size='small'
							icon={
								<HeartFilled
									style={{ color: '#8a8a8a', transform: 'translate(0, -15%)' }}
								/>
							}
						/>
						<Button
							shape='circle'
							size='small'
							icon={
								<ShareAltOutlined
									style={{ color: '#8a8a8a', transform: 'translate(0, -15%)' }}
								/>
							}
						/>
					</div>
					<div style={{ position: 'absolute', bottom: 5, right: 15 }}>
						<FireFilled
							style={{
								fontSize: 20,
								color: '#fdcf58',
								transform: 'translate(0, -15%)',
							}}
						/>
					</div>
				</div>
			}
		>
			<Col span={24}>
				<Row gutter={[24, 10]}>
					<Col span={24} style={{ fontWeight: 'bold', fontSize: 16 }}>
						{event.name}
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24}>
						<Button
							size='small'
							style={{
								fontSize: 10,
								borderRadius: 15,
								fontWeight: 'bold',
								borderColor: 'red',
								color: '#FFFFFF',
								backgroundColor: 'red',
								marginRight: 8,
							}}
						>
							#HOT
						</Button>
						<Button
							size='small'
							style={{
								fontSize: 10,
								borderRadius: 15,
								fontWeight: 'bold',
								borderColor: 'red',
								color: '#FFFFFF',
								backgroundColor: 'red',
								marginRight: 8,
							}}
						>
							#Music
						</Button>
						<Button
							size='small'
							style={{
								fontSize: 10,
								borderRadius: 15,
								fontWeight: 'bold',
								borderColor: 'red',
								color: '#FFFFFF',
								backgroundColor: 'red',
							}}
						>
							#Comdey
						</Button>
					</Col>
				</Row>
				<Row gutter={[24, 0]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						{moment.unix(event.startDate).format('MMM DD | HH:mm a')}
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						{event.fullAddress}
					</Col>
				</Row>
				<Row justify='space-between' gutter={[24, 0]}>
					<Col>
						<Link to={{
							pathname: '/event',
							state: { eventId: event.eventId }
						}}>
							<Button
								style={{
									borderRadius: 15,
									fontWeight: 'bold',
									borderColor: 'red',
									color: '#FFFFFF',
									backgroundColor: 'red',
								}}
							>
								Buy Ticket
							</Button>
						</Link>
					</Col>
					<Col>
						<Button
							size='small'
							style={{
								fontSize: 10,
								color: '#5a5a5a',
								borderColor: '#fafafa',
								backgroundColor: '#fafafa',
							}}
						>
							{daysLeft}
						</Button>
					</Col>
				</Row>
			</Col>
		</Card>
	);
};

export const Events = () => {
	const [eventAPI, setEventAPI] = useState({});
	const [eventArr, setEventArr] = useState([]);

	const app = useSelector((state) => state.app);
	const dispatch = useDispatch();

	useEffect(() => {
		init();
	}, []);


	const init = async () => {
		let eventAPI = new EventAPI();
		setEventAPI(eventAPI);
		await eventAPI.init();
		let event = await eventAPI.getEventAll();
		setEventArr(event);
	};

	const EventList = () => {
		let eventItem = [];
		eventArr.map(item => {
			eventItem.push((
				<Col xs={22} sm={22} md={12} lg={12} xl={8}>
				
			<EventItem event={item} />
			</Col>))
		})
		return eventItem;
	};

	return (
		<Row gutter={[48, 48]}>
			{EventList()}
		</Row>
	);
};

export const EventsWithSlider = () => {
	const [eventAPI, setEventAPI] = useState({});
	const [eventArr, setEventArr] = useState([]);

	const app = useSelector((state) => state.app);
	const dispatch = useDispatch();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		let eventAPI = new EventAPI();
		setEventAPI(eventAPI);
		await eventAPI.init();
		let event = await eventAPI.getEventAll();
		setEventArr(event);
	};

	const EventList = () => {
		let eventItem = [];
		eventArr.map(item => {
			eventItem.push((
				<div style={{ position: 'relative', width: 320, }}>
			<EventItem event={item} padding={15} />
			</div>
			))
		})
		return eventItem;
	};


	return (
		<Row justify="center">
			<Col span={24}>
				<Slider {...settings} style={{margin: 0,}}>
					{EventList()}
				</Slider>
			</Col>
		</Row>
	);
};

export default EventList;

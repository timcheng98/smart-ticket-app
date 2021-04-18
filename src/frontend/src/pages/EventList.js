import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Button, Row, Col, Card } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import moment from 'moment';
import AppLayout from '../components/AppLayout';
import Content from '../components/Content';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bannerSettings = {
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

const EventList = () => {
	return (
		<AppLayout>
			<Content fullWidth>
				<Row style={{ marginTop: 30 }}>
					<Col span={24}>
						<Banner />
					</Col>
				</Row>
			</Content>
			<Content>
				<Row
					gutter={[0, 20]}
					justify='center'
					style={{ paddingTop: 0, width: '80vw', margin: 'auto' }}
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
						<span style={{ marginRight: 40, color: '#000' }}>All</span>
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
							<Events />
						</Row>
					</Col>
				</Row>
			</Content>
		</AppLayout>
	);
};

const Banner = ({ events }) => {
	const [banners, setBanners] = useState(null);

	useEffect(() => {
		getBanners();
	}, [events]);

	const getBanners = () => {
		setBanners(
			<div style={{ margin: 0, padding: 0 }}>
				<div
					style={{
						position: 'relative',
						backgroundImage: `url('https://hk.ulifestyle.com.hk/cms/images/event/1024/201811/20181105122218_0_45244284-342361479676181-955046107807744-o.jpg')`,
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						margin: 0,
						paddingBottom: 400,
						width: '100%',
					}}
				></div>
			</div>
		);
	};

	return (
		<Slider
			{...bannerSettings}
			style={{ margin: 0, padding: 0, width: '100%' }}
		>
			{banners}
		</Slider>
	);
};

const EventItem = ({ event, padding, margin = 0 }) => {
	return (
		<Card
			style={{
				borderRadius: 18,
				borderWidth: 1,
				height: 400,
				margin: margin,
			}}
			bordered
			hoverable
			bodyStyle={{ padding: padding || 0 }}
			cover={
				<div
					style={{
						width: '100%',
						height: '100%',
						overflow: 'hidden',
						borderTopRightRadius: 15,
						borderTopLeftRadius: 15,
					}}
				>
					<Link
						to={{
							pathname: '/event',
						}}
					>
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
							src={
								'https://hk.ulifestyle.com.hk/cms/images/event/w600/201811/20181105122209_0_45238212-342057059706623-853866569623666688-o.jpg'
							}
							className='event-thumbnail'
						/>
					</Link>
				</div>
			}
		>
			<Col span={24} style={{ padding: 0 }}>
				<Row gutter={[24, 10]}>
					<Col
						span={24}
						style={{ fontWeight: 'bold', fontSize: 16, height: 40 }}
					>
						MIRROR 2021 演唱會
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24}>
						<Button
							size='small'
							style={{
								fontSize: 12,
								transform: 'scale(0.833)',
								borderRadius: 4,
								fontWeight: 'bold',
								borderColor: '#000',
								color: '#000',
								backgroundColor: '#fff',
								marginRight: 0,
							}}
						>
							#Music
						</Button>
					</Col>
				</Row>
				<Row gutter={[24, 0]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						{moment().format('MMM DD | HH:mm a')}
					</Col>
				</Row>
				<Row gutter={[24, 16]}>
					<Col span={24} style={{ fontWeight: '400', fontSize: 10 }}>
						紅館
					</Col>
				</Row>
				<Row justify='center'>
					<Col span={24}>
						<Link
							to={{
								pathname: '/event',
							}}
						>
							<Button
								size='large'
								style={{
									borderRadius: 4,
									fontWeight: 'bold',
									width: '100%',
									borderColor: '#000',
									color: '#000',
									backgroundColor: '#fff',
								}}
							>
								BUY TICKET
							</Button>
						</Link>
					</Col>
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
							23 Day Left
						</span>
					</Col>
				</Row>
			</Col>
		</Card>
	);
};

export const Events = () => {
	return (
		<Row gutter={[{ xs: 0, sm: 0, md: 24, lg: 24 }, 48]}>
			<Col xs={24} sm={24} md={12} lg={12} xl={12}>
				<EventItem padding={20} />
			</Col>
		</Row>
	);
};

export default EventList;

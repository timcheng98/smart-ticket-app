import React, { useState, useEffect } from 'react';
import { EventAPI } from '../api/smart-contract/event';
import { Input, Button, Row, Col, Card, Carousel, Form, Select , Typography, Divider} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { setTotalSeats } from '../redux/actions/common';
import _ from 'lodash';
import moment from 'moment';
import {
	ShareAltOutlined,
	HeartFilled,
	FireFilled,
	ArrowRightOutlined,
	DollarCircleFilled
} from '@ant-design/icons';

import Icon from '../components/Icon'
import AppLayout from '../components/AppLayout';

const { Paragraph } = Typography;

const { Option } = Select;

const eventAPI = new EventAPI();

const Account = () => {
	const app = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [isInit, setInit] = useState(false);

  
  useEffect(() => {
    init();
  }, []);
  
  const init = async () => {
		let isInit = await eventAPI.init();
    setInit(isInit);
  }

	return (
		<AppLayout
		>
			<TicketOwn eventAPI={eventAPI} isInit={isInit} />
		</AppLayout>
	);
};

const TicketOwn = ({isInit }) => {
	const [loading, setLoading] = useState(false);
  const [totalTickets, setTotalTickets] = useState(0);

  // console.log(loading)
	if (!isInit) return <h1>wait</h1>

	return (
		<div style={{paddingTop: 100}}>
		<Row justify="center" gutter={[0, 16]}>
			<Col xs={22} sm={22} md={6} lg={6}> 
				<Wallet totalTickets={totalTickets} />
			</Col>
			</Row>
			<Row justify="center" gutter={[0, 16]}>
			<Col xs={22} sm={22} md={10} lg={10}>
        <EventList setLoading={setLoading} setTotalTickets={setTotalTickets} isInit={isInit} />
			</Col>
		</Row>
		</div>
	)
}

const Wallet = ({ totalTickets }) => {
  return (
    <Card 
      style={{
      backgroundImage: 'linear-gradient(to right bottom, #444343, #343333, #242424, #161616, #000000)',
      borderColor: '#000',
       height: 200, borderRadius: 20, marginTop: 20}}>
      <Row justify="space-between" align="bottom" >
        <Col style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
          <Row>
            <Col span={24} style={{marginBottom: 15}}><img style={{width: 50, height: 50}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/220px-Ethereum-icon-purple.svg.png" /></Col>
            <Col span={24}>Tim Cheng</Col>
          </Row>
        </Col>
        <Col><span style={{color: '#fff', fontSize: 16, fontWeight: 'bold', marginRight: 10}}><span style={{fontSize: 40, marginRight: 4}}>{totalTickets}</span> Tickets</span></Col>
        <Col>
        <Paragraph ellipsis style={{color: '#fff', fontWeight: 'bold', fontSize: 14, marginTop: 30}}>{eventAPI.accounts[0]}</Paragraph>
        </Col>

      </Row>
    </Card>
  )
}

const EventList = ({ setLoading, setTotalTickets, isInit }) => {
  const [eventArr, setEventArr] = useState([]);
  const [ticketArr, setTicketArr] = useState([]);
  const [eventElement, setEvenElement] = useState(null)

	useEffect(() => {
		ownerOf();
	}, [eventAPI])

	const ownerOf = async () => {
		let ticketArr = await eventAPI.ownerOf();
		Events(ticketArr);
	}

	useEffect(() => {

		if (isInit) {
			setTicket();
		}

	}, [isInit]);


  

  const setTicket = async () => {
		let ticket = await eventAPI.getTicketAll();
		let events = await eventAPI.getEventAll();
		ticket = _.keyBy(ticket, 'area');
		ticket = _.map(ticket, 'area');
		setTicketArr(ticket);
    setEventArr(events);
    
    setLoading(false);

  }
  
  
  const Events = async (ticketArr) => {
		const eventElement = [];
		let total = 0;
		if (ticketArr.length === 0) {
			eventElement.push((
				<Row align="middle" justify="center" style={{height: 100}}><Col style={{fontSize: 18,  fontWeight: 'bold', color: '#9a9a9a'}}>No Ticket Found</Col></Row>));
			return setEvenElement(eventElement)
		}
		ticketArr.map((val, index) => {
			let detail = {
				event: val.event,
				total: val.total
			}
			total += val.total;
			let element = (<>
				<Event detail={detail} />
					<Divider /></>
			)
			if (index === ticketArr.length - 1) {
				element = (<Event detail={detail} />);
			}

			eventElement.push(element)
		});
		setEvenElement(eventElement);
		setTotalTickets(total)
  }
  
  return (
    <Card style={{backgroundColor: '#fff', borderRadius: 20, width: '100%', marginTop: 10}}>
      {eventElement}
    </Card>
  )
}

const Event = ({ detail }) => {
	let { event, total } = detail;
	return (
		<Row align="middle" tyle={{backgroundColor: '#fff', height: 100, }}>
			<Col span={5}>
				<span style={{width: 15, height: 15, backgroundColor: '#060a10', position: 'absolute', top: '40%', left: -10, borderRadius: 30, border: '1px solid #060a10'}}></span>

				<Row align="middle">
					<Col span={24} style={{marginLeft: 15 }}>
						<img style={{ height: 50, width: 50, objectFit: 'cover', borderRadius: 50}} src="https://www.tickethk.com/images/posters/1536.jpg?v=89926"/>
					</Col>
				</Row>
			</Col>
			<Col span={15} style={{padding: '0px 15px'}}>
				<Row >
					<Col span={24} style={{fontSize: 12, fontWeight: 'bold', color: '#2a2a2a'}}>
            <Paragraph style={{marginBottom: 0}} ellipsis>{event.name}</Paragraph>
          </Col>
					<Col span={24} style={{fontSize: 10, color: '#8a8a8a'}}>
          <Paragraph ellipsis>
            {moment.unix(event.startDate).format('DD MMM, YYYY | HH:mm a')}
          </Paragraph>
          </Col>
				</Row>
			</Col>
			<Col span={4} style={{fontWeight: 'bold', color: '#2b2b2b'}}>
			<span style={{fontSize: 24}}> {total} </span> TKS
			{/* <Icon type="ticket" /> */}
			</Col>
	</Row>
	)
}

export default Account;

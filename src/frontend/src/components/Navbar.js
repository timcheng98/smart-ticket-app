import React from 'react';
import { Layout, Row, Col } from 'antd';
import _ from 'lodash';
import { Link } from 'react-router-dom';

const { Header } = Layout;

const Navbar = (props) => {
	return (
		<Header style={styles.container}>
			<Row align='middle' style={styles.row}>
				<Col xs={0} sm={0} md={24} lg={24} xl={24}>
					<Row>
						<Col xs={0} sm={0} md={2} lg={2} xl={2}>
							<img
								src='/ppnngg.png'
								style={{ width: 80, height: 80, objectFit: 'cover' }}
							/>
						</Col>
						<Col xs={0} sm={0} md={8} lg={8} xl={8}>
							<Row justify='space-between' style={{ color: '#fff' }}>
								<Link to='/events'>
									<Col
										style={{
											color: '#000',
											fontWeight: '500',
											fontSize: 16,
										}}
									>
										Events
									</Col>
								</Link>
								<Link to='/account'>
									<Col
										style={{
											color: '#000',
											fontWeight: '500',
											fontSize: 16,
										}}
									>
										Account
									</Col>
								</Link>
								<Link to='/marketplace'>
									<Col
										style={{
											color: '#000',
											fontWeight: '500',
											fontSize: 16,
										}}
									>
										Marketplace
									</Col>
								</Link>
								<Link to='/sign'>
									<Col
										style={{
											color: '#000',
											fontWeight: '500',
											fontSize: 16,
										}}
									>
										Login
									</Col>
								</Link>
							</Row>
						</Col>
					</Row>
				</Col>
			</Row>
		</Header>
	);
};

const styles = {
	container: {
		backgroundColor: '#ffffff00',
		// boxShadow: '0 4px 2px -2px rgba(0,0,0,.2)',
		// marginBottom: 4,
		height: 80,
		padding: 20,
	},
	row: {
		height: '100%',
	},
	menu: {
		background: 'transparent',
	},
};

export default Navbar;

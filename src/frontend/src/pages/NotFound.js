import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Content from '../components/Content';

const NotFound = () => {
	return (
		<AppLayout>
			<Content fullWidth>
				<Result
					status='404'
					style={{ margin: '60px 0px' }}
					title={<h1 style={{ color: '#fff' }}>404</h1>}
					subTitle={
						<h4 style={{ color: '#fff', padding: 20 }}>
							Sorry, the page you visited does not exist.
						</h4>
					}
					extra={
						<Link to='/'>
							<Button
								size='large'
								type='primary'
								style={{
									backgroundColor: 'transparent',
									borderColor: '#fff',
									color: '#fff',
								}}
							>
								Back Home
							</Button>
						</Link>
					}
				/>
			</Content>
		</AppLayout>
	);
};

export default NotFound;

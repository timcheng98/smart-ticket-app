import React from 'react';
import { Input, Button, Row, Col, Form, Tabs, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import AppLayout from '../components/AppLayout';

const { TabPane } = Tabs;

const Sign = () => {
	return (
		<AppLayout>
			<Row justify='center' style={{ height: '65vh', marginTop: 60 }}>
				<Col xs={22} sm={22} md={6} lg={6}>
					<Tabs
						centered
						size='large'
						tabBarStyle={{ color: '#000', fontWeight: 'bold' }}
					>
						<TabPane tab='Login' key='1'>
							<Login />
						</TabPane>
						<TabPane tab='Register' key='2'>
							<Register />
						</TabPane>
					</Tabs>
				</Col>
			</Row>
		</AppLayout>
	);
};

const Login = () => {
	const [form] = Form.useForm();
	const history = useHistory();

	const onFinish = async (formData) => {
		notification.success({ message: 'Sucessful Login.' });
		history.push('/account');
	};

	return (
		<Form form={form} onFinish={onFinish}>
			<Row justify='center' style={{ padding: '20px 0' }}>
				<Col>
					<Row gutter={[0, 40]}>
						<Col span={24}>
							<Form.Item
								name='email'
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your E-mail!',
									},
								]}
							>
								<Input placeholder='E-mail*' className='custom-input' />
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item name='password'>
								<Input.Password
									placeholder='Password*'
									className='custom-input'
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Button
								htmlType='submit'
								size='large'
								className='custom-button'
								style={{ width: '100%' }}
							>
								Sign In
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
};

const Register = () => {
	const [form] = Form.useForm();
	const history = useHistory();

	const onFinish = async (formData) => {
		notification.success({ message: 'Sucessful Register.' });
		history.push('/account');
	};

	return (
		<Form form={form} onFinish={onFinish} style={{ marginBottom: 80 }}>
			<Row justify='center' style={{ padding: '20px 0' }}>
				<Col>
					<Row gutter={[0, 20]}>
						<Col span={24}>
							<Form.Item
								name='email'
								rules={[
									{
										type: 'email',
										message: 'The input is not valid E-mail!',
									},
									{
										required: true,
										message: 'Please input your E-mail!',
									},
								]}
							>
								<Input
									placeholder='E-mail*'
									className='custom-input'
									autoComplete='off'
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name='password'
								rules={[
									{
										required: true,
										message: 'Please input your password!',
									},
								]}
								hasFeedback
							>
								<Input.Password
									placeholder='Password*'
									className='custom-input'
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Form.Item
								name='confirm_password'
								dependencies={['password']}
								hasFeedback
								rules={[
									{
										required: true,
										message: 'Please confirm your password!',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (!value || getFieldValue('password') === value) {
												return Promise.resolve();
											}
											return Promise.reject(
												new Error(
													'The two passwords that you entered do not match!'
												)
											);
										},
									}),
								]}
							>
								<Input.Password
									placeholder='Confirm Password*'
									className='custom-input'
								/>
							</Form.Item>
						</Col>
						<Col span={24}>
							<Button
								htmlType='submit'
								size='large'
								className='custom-button'
								style={{ width: '100%' }}
							>
								Sign Up
							</Button>
						</Col>
					</Row>
				</Col>
			</Row>
		</Form>
	);
};
export default Sign;

import React, { useState, useEffect } from 'react';
import {
	Avatar,
	Button,
	Divider,
	Form,
	Icon,
	Menu,
	Modal,
	Popconfirm,
	Table,
	Tag,
	Tooltip,
	Row,
	Typography,
	Col,
	Popover,
	Layout,
} from 'antd';
import { GlobalOutlined, QrcodeOutlined, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import * as UI from '../core/UI';
// import * as Main from "../core/Main";
import { useSelector } from 'react-redux';
import * as Service from '../core/Service';
import AppLayout from '../components/AppLayout';
// import CompanyForm from './Form';
import { Link } from 'react-router-dom';
import {
	EditOutlined,
	StopOutlined,
	CheckOutlined,
	FileProtectOutlined,
	FileSearchOutlined,
	ZoomInOutlined,
} from '@ant-design/icons';

const involvedModelName = 'transaction';
const title = 'Trsanction History';
const selectedKey = 'transaction_history';
const tableIDName = 'transaction_id';
const { Paragraph, Text } = Typography;

const TransactionHistoryList = (props) => {
	const [dataList, setDataList] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		getAllData();
		setLoading(false);
	}, []);

	const getAllData = async () => {
		let dataList = [];
		try {
			let url = `/api/${involvedModelName}/all`;
			let data = await Service.call('get', url);
			dataList = _.orderBy(data, ['ctime'], ['desc']);
		} catch (error) {
			console.error('error >>> ', error);
		} finally {
			setDataList(dataList);
		}
	};

	const setTableHeader = () => {
		const columns = [
			{
				title: 'Txn Hash',
				dataIndex: 'transaction_hash',
				render: (value, record) => {
					return (
						<>
							<Popover
								placement='right'
								content={
									<Row gutter={[0, 12]} style={{ width: 300 }}>
										<Col span={24}>Status</Col>
										<Col span={24}>
											{UI.displayStatus(record.status, {
												1: 'Confirm',
												0: 'Fail',
												'-1': 'Fail',
												default: 'Fail',
											})}
										</Col>
                    <Col span={24}>Service Provider</Col>
                    <Col span={24}>
                    <Tooltip title={record.sender}>
												<span style={{ color: '#3498db' }}>
													{record.sender.substring(0, 32)}...
												</span>
											</Tooltip>
                    </Col>
										<Col span={24}>Block Hash</Col>
										<Col span={24}>
											<Tooltip title={record.block_hash}>
												<span style={{ color: '#3498db' }}>
													{record.block_hash.substring(0, 32)}...
												</span>
											</Tooltip>
										</Col>
										<Col span={24}>Contract Address</Col>
										<Col span={24}>
											<Tooltip title={record.contract_address}>
												<span style={{ color: '#3498db' }}>
													{record.contract_address.substring(0, 32)}...
												</span>
											</Tooltip>
										</Col>
										<Col span={24}>Event</Col>
										<Col span={24}>
											<Paragraph
												ellipsis={{
													rows: 2,
													expandable: true,
													symbol: 'more',
												}}
											>
												{record.event}
											</Paragraph>
										</Col>
										<Col span={24}>Logs</Col>
										<Col
											span={24}
											style={{ width: 280, wordWrap: 'break-word' }}
										>
											<Paragraph
												ellipsis={{
													rows: 2,
													expandable: true,
													symbol: 'more',
												}}
											>
												{record.logs}
											</Paragraph>
										</Col>
									</Row>
								}
							>
								<EyeOutlined style={{ marginRight: 12 }} />
							</Popover>
							<Tooltip title={value}>
								<span style={{ color: '#3498db' }}>
									{value.substring(0, 17)}...
								</span>
							</Tooltip>
						</>
					);
				},
			},
			{
				title: 'Block',
				dataIndex: 'block_number',
			},
			{
				title: 'Confirm Block',
				dataIndex: 'confirm_block',
				render: (value, record) => {
					return `${value} / 2`;
				},
			},
			{
				title: 'Age',
				dataIndex: 'ctime',
				render: (value) => {
					return moment(moment.unix(value)).fromNow();
				},
			},
			{
				title: 'Sender',
				dataIndex: 'sender',
				render: (value, record) => {
          let sender = value;
          if (record.user_address !== '') {
            sender = record.user_address;
          }
					return (
						<Tooltip title={sender}>
							<span style={{ color: '#3498db' }}>
								{sender.substring(0, 17)}...
							</span>
						</Tooltip>
					);
				},
			},
			{
				title: 'Receiver',
				dataIndex: 'receiver',
				render: (value) => {
					return (
						<Tooltip title={value}>
							<span style={{ color: '#3498db' }}>
								{value.substring(0, 17)}...
							</span>
						</Tooltip>
					);
				},
			},
			{
				title: 'Tx Fee',
				dataIndex: 'gas_used',
				render: (value) => {
					return `${value} Gwei`;
				},
			},
		];
		return columns;
	};

	return (
		<AppLayout>
			<Layout.Header style={{ height: 120, background: 'transparent' }}>
				<Row align='center' justify='center'>
					<Col>
						<img
							src='/etherscan.png'
							style={{ objectFit: 'cover', width: 80, marginRight: 20 }}
						/>
						<span style={{ fontSize: 24, fontWeight: 'bold', color: '#fff' }}>
							Smart Ticket Scan
						</span>
					</Col>
				</Row>
			</Layout.Header>
			<Row justify='center' align='center'>
				<Col span={24}></Col>
				<Col span={22}>
					<Table
						className='custom-table'
						loading={loading}
						rowKey={tableIDName}
						scroll={{ x: 'max-content' }}
						dataSource={dataList}
						columns={setTableHeader()}
					/>
				</Col>
			</Row>
		</AppLayout>
	);
};

export default TransactionHistoryList;

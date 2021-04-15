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
	Select,
	Input
} from 'antd';
import { GlobalOutlined, QrcodeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import _ from 'lodash';
import * as UI from '../core/UI';
import * as Main from "../core/Main";
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

import Content from '../components/Content';

const CompanyVerification = () => {
	const [dataList, setDataList] = useState([]);
	const [companyMapping, setCompanyMapping] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedCompany, setSelectedCompany] = useState({});
	const [companyHash, setCompanyHash] = useState('');
	const [generatedHash, setGeneratedHash] = useState('');

	useEffect(() => {
		getAllData();
		setLoading(false);
	}, []);

	useEffect(() => {
		if (!_.isEmpty(selectedCompany))
      getCompanyHash();
	}, [selectedCompany]);

	const getAllData = async () => {
		let dataList = [];
		try {
			let url = `/api/company/kyc`;
			let data = await Service.call('get', url);
			dataList = _.orderBy(data, ['ctime'], ['desc']);
		} catch (error) {
			console.error('error >>> ', error);
		} finally {
			setDataList(dataList);
			setCompanyMapping(_.keyBy(dataList, 'company_kyc_id'));
		}
	};

	const getCompanyHash = async () => {
		
		let data = await Service.callBlockchain('get', `/api/sc/kyc/company?admin_id=${selectedCompany.admin_id}`);
		setCompanyHash(data)
	}

	const verifyCompanyCredential = async () => {
    const {
      company_kyc_id,
      admin_id,
      company_code,
      name,
      owner,
      description,
      industry,
      company_doc,
      company_size,
      address,
      found_date,
    } = selectedCompany;

    let encryptString = `${admin_id}${company_kyc_id}${company_code}${name}${owner}${description}${industry}${company_doc}${company_size}${address}${found_date}`;

    const digestHex = await Main.sha256(JSON.stringify(encryptString));
    // let result = await Service.callBlockchain("post", `/api/sc/kyc/company/verify`, {
    //   admin_id: selectedCompany.admin_id,
    //   id: selectedCompany.admin_id,
		// 	// company: selectedCompany,
    //   hashHex: digestHex,
    // });
    setGeneratedHash(digestHex)
  };

	return (
		<AppLayout>
			<Content fullWidth>
				<Row gutter={[0, 20]} justify='center' style={{ marginTop: 80 }}>
					<Col span={18} style={{ textAlign: 'center' }}>
						<h2 style={{ color: '#fff' }}>Company Verification</h2>
					</Col>
					<Col span={16}>
						<Form layout='vertical' className='custom-form' colon={false}>
							<Form.Item label='Company List' >
								<Select
									size='large'
									placeholder='Please Select'
									dropdownClassName='custom-dropdown'
									style={{ width: '100%', marginBottom: 40 }}
									className='custom-input'
									onChange={(value) => {
										setCompanyHash('');
										setGeneratedHash('');
										setSelectedCompany(companyMapping[value]);
									}}
								>
									{_.map(dataList, (item) => {
										return (
											<Select.Option value={item.company_kyc_id}>
												{item.name}
											</Select.Option>
										);
									})}
								</Select>
							</Form.Item>
							<h4 style={{ color: '#fff' }}>Company Information</h4>
							<Divider style={{borderTopColor: '#fff'}}/>

							<Row gutter={[20, 4]}>
								<Col span={12}>
									{' '}
									<Form.Item label='Company ID' style={{ color: '#fff' }}>
										<Input className="custom-input" value={selectedCompany.admin_id} />
									</Form.Item>
								</Col>
								<Col span={12}>
									{' '}
									<Form.Item label='Company KYC ID' style={{ color: '#fff' }}>
										<Input className="custom-input" value={selectedCompany.company_kyc_id} />

									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[20, 4]}>
								<Col span={12}>
									<Form.Item label='Company Name' style={{ color: '#fff' }}>
										<Input className="custom-input" value={selectedCompany.name} />

									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label='Company Code' style={{ color: '#fff' }}>
										<Input className="custom-input" value={selectedCompany.company_code} />

									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[20, 4]}>
								<Col span={12}>
									<Form.Item label='Owner' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.owner} />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label='Company Size' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.company_size} />
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[20, 4]}>
								<Col span={24}>
									<Form.Item label='Description' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.description} />
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[20, 4]}>
								<Col span={12}>
									<Form.Item label='Found Date Timestamp' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.found_date} />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label='Industry' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.industry} />
									</Form.Item>
								</Col>
							</Row>

							<Row gutter={[20, 4]}>
								<Col span={12}>
									<Form.Item label='Address' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.address} />
									</Form.Item>
								</Col>
								<Col span={12}>
									<Form.Item label='Company Doc Path' style={{ color: '#fff' }}>
									<Input className="custom-input" value={selectedCompany.company_doc} />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={[20, 4]}>
								<Col span={12}>
								  <h4 style={{ color: '#fff' }}>Company Credential On Blockchain</h4>
                  <h4 style={{ color: '#fff' }}>{companyHash === '' ? 'Do not register yet' : companyHash}</h4>
								</Col>
							</Row>
							{companyHash !=='' &&<Button style={{width: 200, margin: '10px 0px 20px 0px'}} onClick={verifyCompanyCredential} className="custom-button" size="large">Verify</Button> }

							{generatedHash !== '' && (<><h4 style={{ color: '#fff' }}>Result: {generatedHash}</h4></>)}
              {generatedHash !== '' && generatedHash === companyHash && (							<CheckCircleOutlined style={{ color: '#87d068', fontSize: 20, marginLeft: 12}} />)}
						</Form>
					</Col>
				</Row>

			
			</Content>
		</AppLayout>
	);
};

export default CompanyVerification;

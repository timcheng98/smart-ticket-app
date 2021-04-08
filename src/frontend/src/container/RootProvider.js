import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConfig, setUser, setAuth } from '../redux/actions/common';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Skeleton } from 'antd';
import * as Service from '../core/Service';
import _ from 'lodash';
import Path from '../routes/Path';

const RootProvider = () => {
	const [loading, setLoading] = useState(true);
	const dispatch = useDispatch();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		let resp = await Service.call('get', '/api/config');
		if (resp && resp.status > 0) {
			dispatch(setConfig(resp));
		} else {
			console.error('failed to get app config');
		}
		resp = await Service.call('get', `/api/user`);
		if (!resp || resp.status <= 0) {
			dispatch(setAuth(false));
			dispatch(setUser({ user_id: 0, is_user: false }));
			setLoading(false);

			return;
		}
		if (resp) {
			dispatch(setAuth(true));
			dispatch(setUser(resp));
			setLoading(false);
			return;
		}
	};

	if (loading) {
		const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		return (
			<div style={{ display: 'relative', position: 'absolute', top: 0, right: 0,  width: '100%', height: '100%',  backgroundColor: '#0e131d' }}>
				<Spin size="large" style={{position: 'absolute', top: '50%', left: '50%', color: '#fff',}} indicator={antIcon} />
			</div>
		);
	}

	return (
		<>
			<Path />
		</>
	);
};

export default RootProvider;

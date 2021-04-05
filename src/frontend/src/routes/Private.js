import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Spin } from 'antd';

const Private = ({ component: AppComponent }) => {
	const user = useSelector((state) => state.app.user);
	const app = useSelector((state) => state.app);
	if (!user) return <Spin></Spin>;

	return (
		<Route
			render={() => {
				return user.user_id > 0 ? <AppComponent /> : <Redirect to='/sign' />;
			}}
		/>
	);
};

export default Private;

import React from 'react';
import { Route } from 'react-router-dom';

const Private = ({ component: AppComponent }) => {
	return (
		<Route
			render={() => {
				return <AppComponent />
			}}
		/>
	);
};

export default Private;

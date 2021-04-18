import React from 'react';
import RootProvider from './container/RootProvider';

import 'antd/dist/antd.css';
import './styles/styles.css';


export default function App(props) {
	return (
		<>
			<RootProvider />
		</>
	);
}

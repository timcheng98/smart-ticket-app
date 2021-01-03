// import React from 'react';
// import 'antd/dist/antd.css';
// import './styles/App.css';
// import './styles/styles.scss';
// import CreateEvent from './pages/CreateEvent'
// import EventDetail from './pages/EventDetail';
// import RootProvider from '../src/App'

// import {Provider} from "react-redux";
// import configureStore from './redux/store/configureStore';
// const store = configureStore();

// const App = () => {
//   return (
//     <Provider store={store}>
//       {/* <CreateEvent /> */}
//       {/* <EventDetail /> */}
//       <RootProvider />
//     </Provider>
//   );
// }

// export default App;

import React from 'react';
import {Provider} from "react-redux";
import configureStore from "./redux/store/configureStore";
import RootProvider from './container/RootProvider';

import 'antd/dist/antd.css';
import './styles/styles.scss';


const store = configureStore();

export default function App(props) {
  return (
    <Provider store={store}>
      <RootProvider />
    </Provider>
  );
};


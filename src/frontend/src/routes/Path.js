import React from 'react';
import {
  BrowserRouter, Redirect, Switch
} from "react-router-dom";
// import * as Main from '../core/Main'
import Public from './Public';
import Private from './Private';

import EventList from '../pages/EventList';
import EventDetail from '../pages/EventDetail';
import Account from '../pages/Account';
import Sign from '../pages/Sign';
import NotFound from '../pages/NotFound';


const Path = (props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Public path="/sign" component={Sign} exact />
        <Public path="/events" component={EventList} exact />
        <Public path="/event" component={EventDetail} exact />
        {/* <Private path="/home" component={Home} exact  /> */}
        <Public path="/" component={EventList} exact />
        <Private path="/account" component={Account} exact />
        <Public path="/404" component={NotFound} exact />
        <Redirect exact from="/*" to="/404" />
      </Switch>
    </BrowserRouter>
  )
}

export default Path;

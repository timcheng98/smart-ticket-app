// import _ from 'lodash'
import * as types from './types';

export function setClientData(clientData) {
  return {
    type: types.SET_CLIENT_DATA,
    data: clientData,
  };
}

export function setAppData(data) {
  return {
    type: types.APP_DATA,
    data
  }
}

export function getSession() {
  return {
    type: types.GET_SESSION,
    data: null
  }
}

export function setTotalSeats(totalSeats) {
  return {
    type: types.SET_TOTAL_SEATS,
    data: totalSeats,
  };
}

export function setDrawerVisible(visible) {
  return {
    type: types.SET_DRAWER_VISIBLE,
    data: visible,
  };
}

export function setEvents(events) {
  return {
    type: types.SET_EVENTS,
    data: events,
  };
}

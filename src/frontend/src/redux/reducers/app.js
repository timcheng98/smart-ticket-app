// import _ from 'lodash';
// import Immutable from 'seamless-immutable';
import * as types from '../actions/types';

const initialState = {
  auth: false,
  loading: false,
  config: {
    STATIC_SERVER_URL: null,
  },
  data: {},
  totalSeats: {},
  events: false,
  drawerVisible: false,
  user: {}
};


const appReducer = {
  app: (prevState, action) => {
    if (typeof prevState === 'undefined') {
      return initialState;
    }
    let state;
    switch (action.type) {
      case types.SET_AUTH: {
        state = {
          ...prevState,
          totalSeats: action.data
        };
        break;
      }
      case types.SET_TOTAL_SEATS: {
        state = {
          ...prevState,
          totalSeats: {...prevState.totalSeats, ...action.data}
        };
        break;
      }
      case types.SET_CONFIG: {
        state = {
          ...prevState,
          config: action.data
        };
        break;
      }
      case types.SET_EVENTS: {
        state = {
          ...prevState,
          events: action.data
        };
        break;
      }
      case types.SET_DRAWER_VISIBLE: {
        state = {
          ...prevState,
          drawerVisible: action.data
        };
        break;
      }
      case types.SET_USER: {
        state = {
          ...prevState,
          user: action.data
        };
        break;
      }
      default:
        return prevState;
    }
    return state;
  }
};

export default appReducer;

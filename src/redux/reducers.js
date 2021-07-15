// import combineReducer func
import { combineReducers } from 'redux';
// types import
import * as types from './types';


const users = require('../constants/data.json');
const mainStateReducer = {
  userData:users,
  user:null
}

// DATA REDUCER
const update_state_reducer = (state = mainStateReducer, { type, payload }) => {
  // switch case condition
  switch (type) {
    case types.DATA:
      return {
        ...state,
        userData:payload
      }
    case types.USER:
      return {
        ...state,
        user:payload
      }
      // by default returns initial state
      default:
        return state
  }
  
}

// COMBINED REDUCERS
const reducers = {
  states: update_state_reducer
}

// export func
export default combineReducers(reducers)

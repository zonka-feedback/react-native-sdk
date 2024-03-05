import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { dataManagerReducer } from './reducer/dataManagerReducer';
const reducer = combineReducers({
  dataManagerReducer: dataManagerReducer,
});
const store = configureStore({
  reducer,
});
export default store;

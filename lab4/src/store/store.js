import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './reducers';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer:todoReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(thunk),
  devTools:process.env.NODE_ENV !=='production'
});

export default store;
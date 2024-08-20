// src/redux/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice'; // Adjust path if needed

const rootReducer = combineReducers({
  invoices: invoicesReducer,
});

export default rootReducer;

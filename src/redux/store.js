// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Adjust path if needed

const store = configureStore({
  reducer: rootReducer,
});

export default store;

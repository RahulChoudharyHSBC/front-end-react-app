//src/app/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import bankReducer from '../features/bankSlice';

export const store = configureStore({
  reducer: {
    bank: bankReducer, //Hooking the banking ledger up to our centraal system
  },
});
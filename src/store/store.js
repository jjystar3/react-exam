import { configureStore } from '@reduxjs/toolkit';
import { ledgerSlice } from './ledgerSlice';

export const store = configureStore({
  reducer: {
    ledger: ledgerSlice.reducer
  }
});

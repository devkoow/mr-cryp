import { configureStore } from '@reduxjs/toolkit';
import chartSlice from './chartSlice';

const store = configureStore({
  reducer: {
    chart: chartSlice.reducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartSlice';

const store = configureStore({
  reducer: {
    chart: chartReducer,
  },
});

export default store;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: 'KRW-BTC',
  rate: 0,
  prevPrice: null,
  currPrice: null,
  open: false,
};

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setRate: (state, action) => {
      state.rate = action.payload;
    },
    setPrevPrice: (state, action) => {
      state.prevPrice = action.payload;
    },
    setCurrPrice: (state, action) => {
      state.currPrice = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setCode, setRate, setPrevPrice, setCurrPrice, setOpen } =
  chartSlice.actions;

export default chartSlice.reducer;

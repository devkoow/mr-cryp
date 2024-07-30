import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: 'KRW-BTC',
  rate: 0,
  prevPrice: null,
  currPrice: null,
  open: false,
};

// 차트 페이지
const chartSlice = createSlice({
  name: 'chartSlice',
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

export default chartSlice;
export const { setCode, setRate, setPrevPrice, setCurrPrice, setOpen } =
  chartSlice.actions;

import React from 'react';
import Tickers from '../components/upbit/Tickers';
import Realtime from '../components/upbit/Realtime';
import Stack from '@mui/material/Stack';
import Transactions from '../components/upbit/Transactions';
import Candles from '../components/upbit/Candles';

export default function Trade() {
  return (
    <>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Tickers />
        <Realtime market={'KRW-BTC'} />
        <Transactions market={'KRW-BTC'} />
        <Candles market={'KRW-BTC'} />
      </Stack>
    </>
  );
}

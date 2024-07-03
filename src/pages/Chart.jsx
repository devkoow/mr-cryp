import React, { useState } from 'react';
import RealTimePrice from '../components/upbit/RealTimePrice';
import MarketCard from '../components/upbit/MarketCard';
import OrderbookCard from '../components/upbit/OrderbookCard';
import TradeHistoryCard from '../components/upbit/TradeHistoryCard';
import ChartCard from '../components/upbit/ChartCard';
import { Grid } from '@mui/material';

/** 전체 차트 페이지
 * - code : 선택한 마켓의 티커
 */
export default function Chart() {
  const [code, setCode] = useState('KRW-BTC');
  const [rate, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(null);

  return (
    <Grid
      container
      spacing={0}
      sx={{ width: 1200, height: 900, border: '1px' }}
      margin="auto"
    >
      <Grid item xs={3}>
        <RealTimePrice
          setCode={setCode}
          setPrice={setPrice}
          setPrevPrice={setPrevPrice}
        />
      </Grid>
      <Grid item xs={9}>
        <MarketCard code={code} />
        <ChartCard code={code} />
        <Grid container spacing={0} padding="0">
          <Grid item xs={7}>
            <TradeHistoryCard code={code} />
          </Grid>
          <Grid item xs={5}>
            <OrderbookCard code={code} rate={rate} prevPrice={prevPrice} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

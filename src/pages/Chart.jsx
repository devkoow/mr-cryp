import React from 'react';
import { Grid, Box } from '@mui/material';
import RealTimePrice from '../components/upbit/RealTimePrice';
import MarketCard from '../components/upbit/MarketCard';
import OrderbookCard from '../components/upbit/OrderbookCard';
import TradeHistoryCard from '../components/upbit/TradeHistoryCard';
import ChartCard from '../components/upbit/ChartCard';

export default function Chart() {
  return (
    <Grid
      container
      spacing={0}
      sx={{ width: 1200, height: 900, border: '1px  ' }}
      margin="auto"
    >
      <Grid item xs={3}>
        <RealTimePrice />
      </Grid>
      <Grid item xs={9}>
        <MarketCard ticker={'KRW-BTC'} />
        <Grid container spacing={0} padding="0">
          <Grid item xs={7}>
            <ChartCard ticker={'KRW-BTC'} />
            <TradeHistoryCard />
          </Grid>
          <Grid item xs={5}>
            <OrderbookCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

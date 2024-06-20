import React from 'react';
import RealTimePrice from './RealTimePrice';
import { Grid } from '@mui/material';
import MarketCard from '../components/upbit/MarketCard';

export default function Charts() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <RealTimePrice></RealTimePrice>
      </Grid>
      <Grid item xs={4}>
        <MarketCard ticker={'KRW-BTC'} />
      </Grid>
    </Grid>
  );
}

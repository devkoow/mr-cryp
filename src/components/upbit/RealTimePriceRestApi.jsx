import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useOpenApi } from '../../context/OpenApiContext';

export default function RealTimePrice({ market }) {
  const { upbit } = useOpenApi();
  const [price, setPrice] = useState('');
  const [fluctuation, setFluctuation] = useState('');

  useEffect(() => {
    upbit.realTimePrice(market).then((now) => {
      setPrice(now.trade_price);
      setFluctuation(now.signed_change_rate);
    });
  }, [market, upbit]);

  return (
    <>
      <Grid flex flexDirection={'column'}>
        <Typography>
          {market}의 현재가 : {price}
        </Typography>
        <Typography>
          {market}의 등락률 : {(fluctuation * 100).toFixed(2)}%
        </Typography>
      </Grid>
    </>
  );
}

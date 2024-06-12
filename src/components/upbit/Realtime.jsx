import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { useOpenApi } from '../../context/OpenApiContext';

export default function Realtime({ market }) {
  const [price, setPrice] = useState('');
  const [fluctuation, setFluctuation] = useState('');
  const { upbit } = useOpenApi();

  useEffect(() => {
    upbit.marketsNow(market).then((now) => {
      setPrice(now.trade_price);
      setFluctuation(now.signed_change_rate);
    });
  }, [market, upbit]);

  return (
    <>
      <Typography>
        {market}의 현재가 : {price}
      </Typography>
      <Typography>
        {market}의 등락률 : {(fluctuation * 100).toFixed(2)}%
      </Typography>
    </>
  );
}

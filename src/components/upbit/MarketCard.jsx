import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useOpenApi } from '../../context/OpenApiContext';

export default function MarketCard({ ticker }) {
  const { upbit } = useOpenApi();
  const [data, setData] = useState('KRW-BTC');
  useEffect(() => {
    const fetchData = async () => {
      const result = await upbit.currentPrice(ticker);
      setData(result);
    };

    fetchData();
  }, [ticker, upbit]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{data.market}</Typography>
        <Typography variant="h3">{data.trade_price} KRW</Typography>
        <Typography color={data.signed_change_rate < 0 ? 'red' : 'green'}>
          전일대비 {data.signed_change_rate}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>고가 {data.high_price}</Typography>
          <Typography>저가 {data.low_price}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>52주 신고가 {data.highest_52_week_price}</Typography>
          <Typography>52주 신저가 {data.lowest_52_week_price}</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography>거래량(24시간) {data.acc_trade_volume_24h}</Typography>
          <Typography>거래대금(24시간) {data.acc_trade_price_24h}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

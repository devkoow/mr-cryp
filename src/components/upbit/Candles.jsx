import React, { useState, useEffect } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { Button, Typography } from '@mui/material';

export default function Candles({ market = 'KRW-BTC' }) {
  const { upbit } = useOpenApi();
  const [candle, setCandle] = useState(null);
  const [candleType, setCandleType] = useState('days');

  useEffect(() => {
    const fetchCandle = async () => {
      let data;
      switch (candleType) {
        case 'minutes':
          data = await upbit.candleMinutes(1, market);
          break;
        case 'days':
          data = await upbit.candleDays(market);
          break;
        case 'weeks':
          data = await upbit.candleWeeks(market);
          break;
        case 'months':
          data = await upbit.candleMonths(market);
          break;
        default:
          data = await upbit.candleDays(market);
      }
      setCandle(data[0]);
    };

    fetchCandle();
  }, [upbit, market, candleType]);

  return (
    <div>
      <Button onClick={() => setCandleType('minutes')}>분봉</Button>
      <Button onClick={() => setCandleType('days')}>일봉</Button>
      <Button onClick={() => setCandleType('weeks')}>주봉</Button>
      <Button onClick={() => setCandleType('months')}>월봉</Button>
      {candle && (
        <>
          <Typography variant="h6">시장 코드: {candle.market}</Typography>
          <Typography variant="body1">
            캔들 날짜: {candle.candle_date_time_utc}
          </Typography>
          <Typography variant="body1">시가: {candle.opening_price}</Typography>
          <Typography variant="body1">고가: {candle.high_price}</Typography>
          <Typography variant="body1">저가: {candle.low_price}</Typography>
          <Typography variant="body1">종가: {candle.trade_price}</Typography>
          <Typography variant="body1">
            누적 거래량: {candle.candle_acc_trade_volume}
          </Typography>
          <Typography variant="body1">
            누적 거래 금액: {candle.candle_acc_trade_price}
          </Typography>
        </>
      )}
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { Typography } from '@mui/material';

export default function TradeHistoryRestApi({ market }) {
  const { upbit } = useOpenApi();
  const [tradeHistory, setTradeHistory] = useState('');

  useEffect(() => {
    upbit.tradeHistory(market).then((response) => {
      setTradeHistory(response[0]);
    });
  }, [market, upbit]);

  return (
    <div>
      <Typography variant="h5">실시간 체결 내역</Typography>
      <Typography variant="h6">마켓 코드: {market}</Typography>
      <Typography variant="body1">
        체결 시간: {tradeHistory.trade_time_utc}
      </Typography>
      <Typography variant="body1">
        체결 날짜: {tradeHistory.trade_date_utc}
      </Typography>
      <Typography variant="body1">
        체결 가격: {tradeHistory.trade_price}
      </Typography>
      <Typography variant="body1">
        체결량: {tradeHistory.trade_volume}
      </Typography>
      <Typography variant="body1">
        체결 ID: {tradeHistory.sequential_id}
      </Typography>
    </div>
  );
}

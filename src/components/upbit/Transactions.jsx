import React, { useEffect, useState } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { Typography } from '@mui/material';

export default function Transactions({ market }) {
  const { upbit } = useOpenApi();
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
    upbit.recentTransactions(market).then((response) => {
      setTransaction(response[0]);
    });
  }, [market, upbit]);

  return (
    <div>
      <Typography variant="h5">실시간 체결 내역</Typography>
      <Typography variant="h6">마켓 코드: {market}</Typography>
      <Typography variant="body1">
        체결 시간: {transaction.trade_time_utc}
      </Typography>
      <Typography variant="body1">
        체결 날짜: {transaction.trade_date_utc}
      </Typography>
      <Typography variant="body1">
        체결 가격: {transaction.trade_price}
      </Typography>
      <Typography variant="body1">
        체결량: {transaction.trade_volume}
      </Typography>
      <Typography variant="body1">
        체결 ID: {transaction.sequential_id}
      </Typography>
    </div>
  );
}

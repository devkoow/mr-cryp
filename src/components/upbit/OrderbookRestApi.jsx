import React, { useState, useEffect } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { Typography } from '@mui/material';

export default function Orderbook({ markets }) {
  const { upbit } = useOpenApi();
  const [data, setData] = useState([]);

  useEffect(() => {
    upbit.orderbook(markets).then((response) => {
      setData(response);
    });
  }, [markets, upbit]);

  return (
    <>
      {data.map((response) => {
        return (
          <div key={response.market}>
            <Typography variant="h6">시장 코드: {response.market}</Typography>
            <Typography variant="body1">
              총 매도 물량: {response.total_ask_size}
            </Typography>
            <Typography variant="body1">
              총 매수 물량: {response.total_bid_size}
            </Typography>
          </div>
        );
      })}
    </>
  );
}

import React, { useEffect, useState } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { theme } from '../../defaultTheme';
import { Box, Typography, Divider } from '@mui/material';

export default function MarketCard({ code }) {
  const { upbit } = useOpenApi();
  const [data, setData] = useState({});
  const priceColor =
    data.signed_change_rate > 0
      ? 'red'
      : data.signed_change_rate < 0
      ? 'blue'
      : 'black';

  useEffect(() => {
    const fetchData = async () => {
      const result = await upbit.currentPrice(code);
      setData(result);
    };
    fetchData();
  }, [code, upbit]);

  if (!data) {
    return <div>마켓 정보 로딩중...</div>;
  }

  return (
    <Box
      sx={{ height: 100, border: `thick double ${theme.palette.primary.main}` }}
    >
      <Typography>{data.market}</Typography>
      <Divider />
      <Box display="flex" justifyContent={'space-between'} paddingLeft={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          marginTop={1}
        >
          <Box display="flex" alignItems="flex-end">
            <Typography variant="h5" color={priceColor} fontWeight={'bold'}>
              {Number(data.trade_price).toLocaleString()}
            </Typography>
            <Typography color={priceColor} fontWeight={'bold'}>
              KRW
            </Typography>
          </Box>
          <Box display="flex" justifyContent={'space-between'}>
            <Typography fontSize={12} fontWeight="bold" color="#8c8b88">
              전일대비
            </Typography>
            <Typography color={priceColor} fontSize={12} fontWeight={'bold'}>
              {(data.signed_change_rate * 100).toFixed(2)}%
            </Typography>
            <Typography color={priceColor} fontSize={12} fontWeight={'bold'}>
              {Number(data.signed_change_price).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: '100%',
            display: 'flex',
            gap: 10,
            marginRight: 3,
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent={'center'}>
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                고가
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={'red'}
              >
                {Number(data.high_price).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                저가
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={'blue'}
              >
                {Number(data.low_price).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent={'center'}>
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                52주 신고가
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={'red'}
              >
                {Number(data.highest_52_week_price).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                52주 신저가
              </Typography>
              <Typography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={'blue'}
              >
                {Number(data.lowest_52_week_price).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent={'center'}>
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                거래량(24시간)
              </Typography>
              <Typography fontSize={12} marginTop={1}>
                {Number(data.acc_trade_volume_24h).toFixed(3).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent={'space-between'} gap="3rem">
              <Typography noWrap fontSize={12} marginTop={1}>
                거래대금(24시간)
              </Typography>
              <Typography fontSize={12} marginTop={1}>
                {Math.round(Number(data.acc_trade_price_24h)).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

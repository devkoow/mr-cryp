import React, { useEffect, useState } from 'react';
import { useWsTicker, useFetchMarketCode } from 'use-upbit-api';
import { theme } from '../../defaultTheme';
import { Box, Typography, Divider } from '@mui/material';

/** 실시간 마켓 정보 */
export default function MarketCard({ code }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [krwMarketCodes, setKrwMarketCodes] = useState([]);
  const { socket, isConnected, socketData } = useWsTicker(krwMarketCodes);
  const [data, setData] = useState({});

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setKrwMarketCodes(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.find((element) => element.code === code);
      setData(targetData);
    }
  }, [code, socketData]);

  const marketCodeMap = {};
  krwMarketCodes.forEach((item) => {
    marketCodeMap[item.market] = item.korean_name;
  });

  const numColor =
    data.signed_change_rate === 0
      ? 'black'
      : data.signed_change_rate > 0
      ? 'red'
      : 'blue';

  if (!data) {
    return <Typography>마켓 정보 로딩중...</Typography>;
  }

  return (
    <Box
      sx={{ height: 100, border: `thick double ${theme.palette.primary.main}` }}
    >
      <Box display="flex">
        <Typography fontSize={20} fontWeight={'bold'}>
          {marketCodeMap[data.code]}
        </Typography>
        <Typography fontSize={15}>{data.code}</Typography>
      </Box>
      <Divider />
      <Box display="flex" justifyContent={'space-between'} paddingLeft={1}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          marginTop={1}
        >
          <Box display="flex" alignItems="flex-end">
            <Typography variant="h5" fontWeight={'bold'} color={numColor}>
              {Number(data.trade_price).toLocaleString()}
            </Typography>
            <Typography fontWeight={'bold'} color={numColor}>
              KRW
            </Typography>
          </Box>
          <Box display="flex" justifyContent={'space-between'} gap={2}>
            <Typography fontSize={12} fontWeight="bold" color="#8c8b88">
              전일대비
            </Typography>
            <Typography fontSize={15} fontWeight={'bold'} color={numColor}>
              {(data.signed_change_rate * 100).toFixed(2)}%
            </Typography>
            <Typography fontSize={15} fontWeight={'bold'} color={numColor}>
              {Number(data.signed_change_price).toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            maxWidth: '100%',
            display: 'flex',
            gap: 2,
            marginRight: 2,
          }}
        >
          <Box display="flex" flexDirection="column" justifyContent={'center'}>
            <Box display="flex" justifyContent={'space-between'} width={200}>
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
            <Box display="flex" justifyContent={'space-between'} width={200}>
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
            <Box display="flex" justifyContent={'space-between'} width={200}>
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
            <Box display="flex" justifyContent={'space-between'} width={200}>
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
            <Box display="flex" justifyContent={'space-between'} width={200}>
              <Typography noWrap fontSize={12} marginTop={1}>
                거래량(24시간)
              </Typography>
              <Typography fontSize={12} marginTop={1}>
                {Number(data.acc_trade_volume_24h).toFixed(3).toLocaleString()}
              </Typography>
            </Box>
            <Divider />
            <Box display="flex" justifyContent={'space-between'} width={200}>
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

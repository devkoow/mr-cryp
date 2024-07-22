import React, { useEffect, useState } from 'react';
import { useWsTicker, useFetchMarketCode } from 'use-upbit-api';
import { PriceTypography, theme } from '../../defaultTheme';
import { Box, Typography, Divider } from '@mui/material';
import { globalColors } from '../../globalColors';

/** 실시간 마켓 정보 */
export default function MarketDetail({ code }) {
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
        ? globalColors.color_pos['400']
        : globalColors.color_neg['400'];

  if (!data) {
    return <Typography>마켓 정보 로딩중...</Typography>;
  }

  return (
    <Box
      sx={{
        height: 100,
        border: `dashed 5px ${theme.palette.primary.main}`,
        backgroundColor: globalColors.white,
        boxSizing: 'border-box',
      }}
    >
      <Box
        display="flex"
        flexWrap="wrap"
        marginLeft={0.5}
        gap={0.5}
        alignItems="flex-end"
      >
        <Typography fontSize={20} fontWeight={'bold'}>
          {marketCodeMap[data.code]}
        </Typography>
        <Typography fontSize={15} align="right">
          {data.code}
        </Typography>
      </Box>
      <Divider />
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent={'space-between'}
        paddingLeft={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent={'center'}
          marginTop={1}
        >
          <Box display="flex" alignItems="flex-end">
            <PriceTypography variant="h5" fontWeight={'bold'} color={numColor}>
              {Number(data.trade_price).toLocaleString()}
            </PriceTypography>
            <Typography fontWeight={'bold'} color={numColor}>
              KRW
            </Typography>
          </Box>
          <Box display="flex" justifyContent={'space-between'} gap={2}>
            <Typography fontSize={12} fontWeight="bold" color="#8c8b88">
              전일대비
            </Typography>
            <PriceTypography fontSize={15} fontWeight={'bold'} color={numColor}>
              {Number(data.signed_change_rate) > 0 ? '+' : ''}
              {Number(data.signed_change_rate * 100).toFixed(2)}%
            </PriceTypography>
            <PriceTypography fontSize={15} fontWeight={'bold'} color={numColor}>
              {Number(data.signed_change_price) < 0
                ? '▼'
                : Number(data.signed_change_price) > 0
                  ? '▲'
                  : ''}
              {Number(data.change_price).toLocaleString()}
            </PriceTypography>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            marginRight: 2,

            '@media (max-width:500px)': {
              display: 'none',
            },
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            flex="1 1 100%"
          >
            {/* 고가 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                고가
              </Typography>
              <PriceTypography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={globalColors.color_pos['400']}
              >
                {Number(data.high_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 저가 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                저가
              </Typography>
              <PriceTypography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={globalColors.color_neg['400']}
              >
                {Number(data.low_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            flex="1 1 100%"
          >
            {/* 52주 신고가 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                52주 신고가
              </Typography>
              <PriceTypography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={globalColors.color_pos['400']}
              >
                {Number(data.highest_52_week_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 52주 신저가 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                52주 신저가
              </Typography>
              <PriceTypography
                fontSize={12}
                fontWeight={'bold'}
                marginTop={1}
                color={globalColors.color_neg['400']}
              >
                {Number(data.lowest_52_week_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent={'center'}
            flex="1 1 100%"
          >
            {/* 거래량 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                거래량(24시간)
              </Typography>
              <PriceTypography fontSize={12} marginTop={1}>
                {Number(data.acc_trade_volume_24h).toFixed(3).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 거래대금 */}
            <Box
              display="flex"
              justifyContent={'space-between'}
              width={200}
              sx={{
                '@media (max-width:1180px)': {
                  width: '150px',
                },
              }}
            >
              <Typography noWrap fontSize={12} marginTop={1}>
                거래대금(24시간)
              </Typography>
              <PriceTypography fontSize={12} marginTop={1}>
                {Math.round(Number(data.acc_trade_price_24h)).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

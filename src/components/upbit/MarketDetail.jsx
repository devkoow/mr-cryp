import React, { useEffect, useState } from 'react';
import { useWsTicker, useFetchMarketCode } from 'use-upbit-api';
import { NGTypo, PriceTypography, theme } from '../../defaultTheme';
import { Box, Divider } from '@mui/material';
import { globalColors } from '../../globalColors';

const yaxisStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: '1 1 100%',
};

const boxStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  width: 200,
  '@media (max-width:1180px)': {
    width: '150px',
  },
};

const priceStyle = {
  fontWeight: 'bold',
};

const posStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 1,
  color: globalColors.color_pos['400'],
};

const negStyle = {
  fontSize: 12,
  fontWeight: 'bold',
  marginTop: 1,
  color: globalColors.color_neg['400'],
};

const statusTextStyle = {
  fontSize: 12,
  marginTop: 1,
};

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
    return <NGTypo>마켓 정보 로딩중...</NGTypo>;
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
        <NGTypo fontSize={20} fontWeight={'bold'}>
          {marketCodeMap[data.code]}
        </NGTypo>
        <NGTypo fontSize={15} align="right">
          {data.code}
        </NGTypo>
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
            <PriceTypography variant="h5" color={numColor} sx={priceStyle}>
              {Number(data.trade_price).toLocaleString()}
            </PriceTypography>
            <NGTypo fontWeight={'bold'} color={numColor}>
              KRW
            </NGTypo>
          </Box>
          <Box display="flex" justifyContent={'space-between'} gap={2}>
            <NGTypo
              fontSize={12}
              fontWeight="bold"
              color={globalColors.market_code}
            >
              전일대비
            </NGTypo>
            <PriceTypography fontSize={15} color={numColor} sx={priceStyle}>
              {Number(data.signed_change_rate) > 0 ? '+' : ''}
              {Number(data.signed_change_rate * 100).toFixed(2)}%
            </PriceTypography>
            <PriceTypography fontSize={15} color={numColor} sx={priceStyle}>
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
          <Box sx={{ yaxisStyle }}>
            {/* 고가 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>고가</NGTypo>
              <PriceTypography sx={posStyle}>
                {Number(data.high_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 저가 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>저가</NGTypo>
              <PriceTypography sx={negStyle}>
                {Number(data.low_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
          </Box>
          <Box sx={{ yaxisStyle }}>
            {/* 52주 신고가 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>52주 신고가</NGTypo>
              <PriceTypography sx={posStyle}>
                {Number(data.highest_52_week_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 52주 신저가 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>52주 신저가</NGTypo>
              <PriceTypography sx={negStyle}>
                {Number(data.lowest_52_week_price).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
          </Box>
          <Box sx={{ yaxisStyle }}>
            {/* 거래량 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>거래량(24시간)</NGTypo>
              <PriceTypography sx={statusTextStyle}>
                {Number(data.acc_trade_volume_24h).toFixed(3).toLocaleString()}
              </PriceTypography>
            </Box>
            <Divider />
            {/* 거래대금 */}
            <Box sx={boxStyle}>
              <NGTypo sx={statusTextStyle}>거래대금(24시간)</NGTypo>
              <PriceTypography sx={statusTextStyle}>
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

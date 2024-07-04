import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import {
  DescTypography,
  PriceTypography,
  StyledTableCell,
} from '../../defaultTheme';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
} from '@mui/material';
import { globalColors } from '../../globalColors';

const RealTimePriceTable = memo(function RealTimePriceTable({
  socketData,
  marketCodeMap,
  setCode,
  setPrice,
  setPrevPrice,
}) {
  const handleRowClick = (code, rate, prevPrice) => {
    setCode(code);
    setPrice(rate);
    setPrevPrice(prevPrice);
  };

  return (
    <TableContainer
      sx={{
        maxWidth: '100%',
        height: 900,
        overflow: 'auto',
        margin: 0,
        padding: 0,
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <DescTypography fontSize={12} fontWeight={700}>
                코인
              </DescTypography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescTypography fontSize={12} fontWeight={700}>
                현재가
              </DescTypography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescTypography fontSize={12} fontWeight={700}>
                전일대비
              </DescTypography>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescTypography fontSize={12} fontWeight={700}>
                거래대금
              </DescTypography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {socketData.map((data) => (
            <TableRow
              key={data.code}
              onClick={() => {
                handleRowClick(
                  data.code,
                  data.signed_change_rate,
                  data.prev_closing_price
                );
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#aeb0af',
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell>
                <Typography
                  fontSize={11}
                  fontWeight={'bold'}
                  sx={{ maxWidth: '5em', overflowWrap: 'break-word' }}
                >
                  {marketCodeMap[data.code]}
                </Typography>
                <Typography fontSize={10} color="#8c8b88">
                  {data.code}
                </Typography>
              </TableCell>
              <TableCell align="right">
                <PriceTypography
                  fontSize={11}
                  fontWeight={'bold'}
                  sx={{
                    color:
                      data.signed_change_rate > 0
                        ? globalColors.color_pos['400']
                        : data.signed_change_rate < 0
                        ? globalColors.color_neg['400']
                        : 'black',
                  }}
                >
                  {data.trade_price.toLocaleString()}
                </PriceTypography>
              </TableCell>
              <TableCell
                sx={{
                  color:
                    data.signed_change_rate > 0
                      ? globalColors.color_pos['400']
                      : data.signed_change_rate < 0
                      ? globalColors.color_neg['400']
                      : 'black',
                }}
                align="right"
              >
                <Box display="flex" flexDirection="column">
                  <PriceTypography fontSize={10} fontWeight={'bold'}>
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </PriceTypography>
                  <PriceTypography fontSize={10} fontWeight={'bold'}>
                    {data.signed_change_price.toLocaleString()}
                  </PriceTypography>
                </Box>
              </TableCell>
              <TableCell>
                <PriceTypography fontSize={10}>
                  {Math.round(
                    parseInt(data.acc_trade_price_24h) / 1000000
                  ).toLocaleString()}
                  백만
                </PriceTypography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

/** 실시간 가격
 * - marketCodes : [{market, korean_name, english_name}]
 * - socketData : useWsTicker를 이용하여 받아온 웹소켓 API 데이터. 내용은 업비트 공식 문서 참고
 * - krwMarketCodes : KRW로 시작하는 marketCodes
 * - marketCodeMap : market 값을 키로 사용하는 korean_name 해시맵
 * */
function RealTimePrice({ setCode, setPrice, setPrevPrice }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [krwMarketCodes, setKrwMarketCodes] = useState([]);
  const { socket, isConnected, socketData } = useWsTicker(krwMarketCodes);

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setKrwMarketCodes(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  const marketCodeMap = {};
  krwMarketCodes.forEach((item) => {
    marketCodeMap[item.market] = item.korean_name;
  });

  return (
    <>
      {socketData ? (
        <RealTimePriceTable
          socketData={socketData}
          marketCodeMap={marketCodeMap}
          setCode={setCode}
          setPrice={setPrice}
          setPrevPrice={setPrevPrice}
        />
      ) : (
        <Typography>실시간 가격 로딩중...</Typography>
      )}
    </>
  );
}
export default memo(RealTimePrice);

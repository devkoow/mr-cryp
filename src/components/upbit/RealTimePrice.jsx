import { memo, useEffect, useState, useContext } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import { StyledTableCell } from '../../defaultTheme';
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

const RealTimePriceTable = memo(function RealTimePriceTable({
  socketData,
  marketCodeMap,
  setCode,
}) {
  const handleRowClick = (code) => {
    setCode(code);
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
            <StyledTableCell align="center">코인</StyledTableCell>
            <StyledTableCell align="center">현재가</StyledTableCell>
            <StyledTableCell align="center">전일대비</StyledTableCell>
            <StyledTableCell align="center">거래대금</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {socketData.map((data) => (
            <TableRow
              key={data.code}
              onClick={() => {
                handleRowClick(data.code);
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
                  fontSize={10}
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
                <Typography
                  fontSize={11}
                  fontWeight={'bold'}
                  sx={{
                    color:
                      data.signed_change_rate > 0
                        ? 'red'
                        : data.signed_change_rate < 0
                        ? 'blue'
                        : 'black',
                  }}
                >
                  {data.trade_price.toLocaleString()}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  color:
                    data.signed_change_rate > 0
                      ? 'red'
                      : data.signed_change_rate < 0
                      ? 'blue'
                      : 'black',
                }}
                align="right"
              >
                <Box display="flex" flexDirection="column">
                  <Typography fontSize={12} fontWeight={'bold'}>
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </Typography>
                  <Typography fontSize={12} fontWeight={'bold'}>
                    {data.signed_change_price}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                {Math.round(
                  parseInt(data.acc_trade_price_24h) / 1000000
                ).toLocaleString()}
                백만
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
 * - socketData : use-upbit-api의 훅을 이용하여 받아온 웹소켓 API 데이터, 공식 문서 참고
 * - krwMarketCode : KRW로 시작하는 marketCodes 필터 데이터
 * - marketCodeMap : market 값을 키로 사용하는 korean_name 해시맵
 * */
function RealTimePrice({ setCode }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [krwMarketCode, setKrwMarketCode] = useState([]);
  const { socket, isConnected, socketData } = useWsTicker(krwMarketCode);
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setKrwMarketCode(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  const marketCodeMap = {};
  krwMarketCode.forEach((item) => {
    marketCodeMap[item.market] = item.korean_name;
  });

  return (
    <>
      {socketData ? (
        <RealTimePriceTable
          socketData={socketData}
          marketCodeMap={marketCodeMap}
          setCode={setCode}
        />
      ) : (
        <Typography>실시간 가격 로딩중...</Typography>
      )}
    </>
  );
}
export default memo(RealTimePrice);

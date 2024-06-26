import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTrade } from 'use-upbit-api';
import MarketCodeSelector from '../../components/upbit/MarketCodeSelector';
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
import { StyledTableCell } from '../../defaultTheme';

/** 실시간 거래내역 테이블 UI */
const TradeTable = memo(function TradeTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTrade(...targetMarketCode);
  const timestampToTime = (timestamp) => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <TableContainer sx={{ maxWidth: 1000, height: 400, overflow: 'auto' }}>
      {socketData ? (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">체결 시간</StyledTableCell>
              <StyledTableCell align="center">체결 가격</StyledTableCell>
              <StyledTableCell align="center">체결량</StyledTableCell>
              <StyledTableCell align="center">체결금액</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...socketData].reverse().map((ele, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {timestampToTime(ele.trade_timestamp)}
                </TableCell>
                <TableCell align="center">
                  {Number(ele.trade_price).toLocaleString()}원
                </TableCell>
                <TableCell align="center">
                  <Typography
                    fontSize={12}
                    color={ele.ask_bid === 'ASK' ? 'red' : 'blue'}
                  >
                    {ele.trade_volume}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography
                    fontSize={12}
                    color={ele.ask_bid === 'ASK' ? 'red' : 'blue'}
                  >
                    {Math.round(
                      ele.trade_volume * ele.trade_price
                    ).toLocaleString()}
                    원
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography>실시간 거래내역 로딩중...</Typography>
      )}
    </TableContainer>
  );
});

function TradeHistory({ marketCode }) {
  const { isLoading, fetchedCodes } = useFetchMarketCode();
  const [curMarketCode, setCurMarketCode] = useState('KRW-BTC');
  const [targetMarketCode, setTargetMarketCode] = useState([
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ]);

  useEffect(() => {
    if (fetchedCodes) {
      setCurMarketCode(marketCode);
      const target = fetchedCodes.filter(
        (code) => code.market === curMarketCode
      );
      setTargetMarketCode(target);
    }
  }, [curMarketCode, fetchedCodes, marketCode]);

  return (
    <>
      <Box
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <TradeTable targetMarketCode={targetMarketCode} />
      </Box>
    </>
  );
}

export default memo(TradeHistory);

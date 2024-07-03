import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTrade } from 'use-upbit-api';
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
import { globalColors } from '../../globalColors';
import { useOpenApi } from '../../context/OpenApiContext';

/** 실시간 거래내역 테이블 UI
 * - timestampToTime : 타임스탬프 값을 KST 시간으로 변환
 */
const TradeTable = memo(function TradeTable({ targetMarketCode, initialData }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTrade(targetMarketCode);
  const timestampToTime = (timestamp) => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <TableContainer sx={{ maxWidth: 1000, height: 400, overflow: 'auto' }}>
      {socketData && (
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
            {initialData
              ? [...initialData].reverse().map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {timestampToTime(data.timestamp)}
                    </TableCell>
                    <TableCell align="center">
                      {Number(data.trade_price).toLocaleString()}원
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={12}
                        color={
                          data.ask_bid === 'ASK'
                            ? globalColors.color_pos['400']
                            : globalColors.color_neg['400']
                        }
                      >
                        {data.trade_volume}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={12}
                        color={
                          data.ask_bid === 'ASK'
                            ? globalColors.color_pos['400']
                            : globalColors.color_neg['400']
                        }
                      >
                        {Math.round(
                          data.trade_volume * data.trade_price
                        ).toLocaleString()}
                        원
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              : '내역 테이블 로딩중'}
            {socketData
              ? [...socketData].reverse().map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {timestampToTime(data.trade_timestamp)}
                    </TableCell>
                    <TableCell align="center">
                      {Number(data.trade_price).toLocaleString()}원
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={12}
                        color={
                          data.ask_bid === 'ASK'
                            ? globalColors.color_pos['400']
                            : globalColors.color_neg['400']
                        }
                      >
                        {data.trade_volume}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        fontSize={12}
                        color={
                          data.ask_bid === 'ASK'
                            ? globalColors.color_pos['400']
                            : globalColors.color_neg['400']
                        }
                      >
                        {Math.round(
                          data.trade_volume * data.trade_price
                        ).toLocaleString()}
                        원
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))
              : '내역 테이블 로딩중'}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
});

/** 실시간 거래 내역
 * - targetMarketCode : props로 전달받은 마켓의 티커
 */
function TradeHistory({ code }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState();
  const [initialData, setInitialData] = useState(null);
  const { upbit } = useOpenApi();

  useEffect(() => {
    if (marketCodes) {
      const targetCode = marketCodes.find(
        (marketCode) => marketCode.market === code
      );
      setTargetMarketCode(
        targetCode || {
          market: 'KRW-BTC',
          korean_name: '비트코인',
          english_name: 'Bitcoin',
        }
      );
    }
  }, [code, marketCodes]);

  useEffect(() => {
    async function fetchData() {
      const result = await upbit.tradeHistory(code);
      setInitialData(result);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Typography>실시간 거래 내역 로딩중...</Typography>;
  }

  return (
    <Box>
      <TradeTable
        targetMarketCode={targetMarketCode}
        initialData={initialData}
      />
    </Box>
  );
}

export default memo(TradeHistory);

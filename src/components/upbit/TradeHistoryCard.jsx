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

/** 실시간 거래내역 테이블 UI */
const TradeTable = memo(function TradeTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTrade(...targetMarketCode);

  /** 웹소켓 연결 핸들러
   * - evt : 추가적으로 전달하고자 하는 이벤트 파라미터
   */
  const connectButtonHandler = (evt) => {
    if (isConnected && socket) {
      socket.close();
    }
  };

  return (
    <>
      <TableContainer sx={{ maxWidth: 1000, maxHeight: 400, overflow: 'auto' }}>
        {socketData ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>코인</TableCell>
                <TableCell>체결 ID</TableCell>
                <TableCell>체결 시간</TableCell>
                <TableCell>ASK/BID</TableCell>
                <TableCell>체결 가격</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData].reverse().map((ele, index) => (
                <TableRow key={index}>
                  <TableCell>{ele.code} </TableCell>
                  <TableCell>{ele.sequential_id} </TableCell>
                  <TableCell>
                    {ele.trade_date} {ele.trade_time}
                  </TableCell>
                  <TableCell>{ele.ask_bid} </TableCell>
                  <TableCell>
                    {ele.prev_closing_price.toLocaleString()}{' '}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography>실시간 거래내역 로딩중...</Typography>
        )}
      </TableContainer>
    </>
  );
});

function TradeHistory() {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [curMarketCode, setCurMarketCode] = useState('KRW-BTC');
  const [targetMarketCode, setTargetMarketCode] = useState([
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ]);

  useEffect(() => {
    if (marketCodes) {
      const target = marketCodes.filter(
        (code) => code.market === curMarketCode
      );
      setTargetMarketCode(target);
    }
  }, [curMarketCode, marketCodes]);

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

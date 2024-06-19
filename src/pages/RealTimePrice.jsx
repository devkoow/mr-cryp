import {
  Box,
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';

/** 실시간 가격 테이블 UI */
const RealTimePriceTable = memo(function RealTimePriceTable({ socketData }) {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>코인</TableCell>
            <TableCell>현재가</TableCell>
            <TableCell>등락률</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {socketData.map((data) => (
            <TableRow key={data.code}>
              <TableCell>{data.code}</TableCell>
              <TableCell>{data.trade_price.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  color: data.signed_change_rate < 0 ? 'blue' : 'red',
                }}
              >
                {(data.signed_change_rate * 100).toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

// 실시간 가격
function RealTimePrice() {
  /** useFetchMarketCode
   * - fetch all marketcode custom hook
   */
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState([]); // 타겟 마켓코드

  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTicker(targetMarketCode);

  /** 웹소켓 연결 핸들러
   * - evt : 추가적으로 전달하고자 하는 이벤트 파라미터
   */
  const connectButtonHandler = (evt) => {
    if (isConnected && socket) {
      socket.close();
    }
  };

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setTargetMarketCode(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  return (
    <>
      <Box
        margin="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Typography variant="h5">실시간 가격</Typography>
        <Typography>연결 상태 : {isConnected ? '🟢' : '🔴'}</Typography>
        <Button onClick={connectButtonHandler}>{'연결종료'}</Button>
        {socketData ? (
          <RealTimePriceTable socketData={socketData} />
        ) : (
          <Typography>실시간 가격 로딩중...</Typography>
        )}
      </Box>
    </>
  );
}

export default memo(RealTimePrice);

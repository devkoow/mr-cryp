import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTrade } from 'use-upbit-api';
import MarketCodeSelector from '../components/upbit/MarketCodeSelector';
import {
  Button,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from '@mui/material';
import { DescTypography, PriceTypography } from '../defaultTheme';

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
      <Box display="flex" alignItems="center" gap={4}>
        <DescTypography>연결 상태 : {isConnected ? '🟢' : '🔴'}</DescTypography>
        <Button onClick={connectButtonHandler}>
          <DescTypography>연결종료</DescTypography>
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: 1000, marginTop: '1rem' }}
      >
        {socketData ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    코인
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    체결 ID
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    체결 시간
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    ASK/BID
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    체결 가격
                  </DescTypography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData].reverse().map((ele, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{ele.code} </TableCell>
                  <TableCell align="center">{ele.sequential_id} </TableCell>
                  <TableCell align="center">
                    {ele.trade_date} {ele.trade_time}
                  </TableCell>
                  <TableCell align="center">{ele.ask_bid} </TableCell>
                  <TableCell align="center">
                    <PriceTypography fontSize={11}>
                      {ele.prev_closing_price.toLocaleString()}
                    </PriceTypography>
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
    <Box
      margin="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
    >
      <DescTypography variant="h5">실시간 거래내역</DescTypography>
      <MarketCodeSelector
        curMarketCode={curMarketCode}
        setCurMarketCode={setCurMarketCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <TradeTable targetMarketCode={targetMarketCode} />
    </Box>
  );
}

export default memo(TradeHistory);

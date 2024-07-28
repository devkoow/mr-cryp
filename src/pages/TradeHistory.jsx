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
  LinearProgress,
} from '@mui/material';
import { DescriptionTypo, PriceTypo, SubTitle } from '../defaultTheme';

const headStyle = {
  fontSize: 20,
  '@media (max-width:900px)': {
    fontSize: 11,
  },
};

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
        <DescriptionTypo>
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescriptionTypo>
        <Button onClick={connectButtonHandler}>
          <DescriptionTypo>연결종료</DescriptionTypo>
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
                  <DescriptionTypo sx={headStyle}>코인</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 ID</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 시간</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>ASK/BID</DescriptionTypo>
                </TableCell>
                <TableCell align="center">
                  <DescriptionTypo sx={headStyle}>체결 가격</DescriptionTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData].reverse().map((ele, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{ele.code}</TableCell>
                  <TableCell align="center">{ele.sequential_id}</TableCell>
                  <TableCell align="center">
                    {ele.trade_date} {ele.trade_time}
                  </TableCell>
                  <TableCell align="center">{ele.ask_bid}</TableCell>
                  <TableCell align="center">
                    <PriceTypo fontSize={11}>
                      {ele.prev_closing_price.toLocaleString()}
                    </PriceTypo>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <LinearProgress color="primary" />
        )}
      </TableContainer>
    </>
  );
});

function TradeHistory() {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [curMarketCode, setCurMarketCode] = useState(
    marketCodes && marketCodes.length > 0 ? marketCodes[0].market : ''
  );
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: 10 }}
    >
      <SubTitle>실시간 거래내역</SubTitle>
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

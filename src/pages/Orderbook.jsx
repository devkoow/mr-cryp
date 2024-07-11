import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsOrderbook } from 'use-upbit-api';
import MarketCodeSelector from '../components/upbit/MarketCodeSelector';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { globalColors } from '../globalColors';
import { DescTypography, NGTypography, PriceTypography } from '../defaultTheme';

/** 실시간 오더북 테이블 UI */
const OrderTable = memo(function OrderTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };

  /** 오더북 데이터
   * - socket : 웹소켓
   * - isConnected : 웹소켓 연결 여부
   * - socketData : 웹소켓 데이터
   */
  const { socket, isConnected, socketData } = useWsOrderbook(
    ...targetMarketCode
  );

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
        <DescTypography
          sx={{
            color: globalColors.white,
            textShadow: '1px 1px 2px black',
            fontWeight: 'bold',
          }}
        >
          연결 상태 : {isConnected ? '🟢' : '🔴'}
        </DescTypography>
        <Button onClick={connectButtonHandler}>
          <DescTypography sx={{ fontWeight: 'bold' }}>연결종료</DescTypography>
        </Button>
      </Box>
      {socketData ? (
        <TableContainer
          component={Paper}
          sx={{
            maxWidth: 500,
            marginTop: '1rem',
          }}
        >
          <Box
            sx={{
              paddingLeft: 1,
              paddingTop: 1,
              paddingBottom: 1,
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <NGTypography>마켓 티커 </NGTypography>
              <NGTypography fontWeight={'bold'}>
                {' '}
                : {socketData.code}
              </NGTypography>
            </Box>
            <NGTypography>
              총 매도 물량 : {socketData.total_ask_size}
            </NGTypography>
            <NGTypography>
              총 매수 물량 : {socketData.total_bid_size}
            </NGTypography>
          </Box>
          <Table display="flex">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    매도 물량
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    가격
                  </DescTypography>
                </TableCell>
                <TableCell align="center">
                  <DescTypography fontSize={20} fontWeight={700}>
                    매수 물량
                  </DescTypography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`ask_${index}`}>
                    <TableCell sx={{ backgroundColor: 'skyblue' }}>
                      <PriceTypography fontSize={12}>
                        {element.ask_size}
                      </PriceTypography>
                    </TableCell>
                    <TableCell>
                      <PriceTypography align="center" fontSize={12}>
                        {element.ask_price.toLocaleString()}
                      </PriceTypography>
                    </TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                ))}
              {[...socketData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell>-</TableCell>
                  <TableCell>
                    <PriceTypography align="center" fontSize={12}>
                      {element.bid_price.toLocaleString()}
                    </PriceTypography>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.hotpink['500'] }}
                  >
                    <PriceTypography fontSize={12}>
                      {element.bid_size}
                    </PriceTypography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>오더북 로딩</Typography>
      )}
    </>
  );
});

// 실시간 오더북
function OrderBook() {
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
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={1}
      sx={{ marginBottom: 10 }}
    >
      <DescTypography
        variant="h5"
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
        }}
      >
        실시간 오더북
      </DescTypography>
      <MarketCodeSelector
        curMarketCode={curMarketCode}
        setCurMarketCode={setCurMarketCode}
        isLoading={isLoading}
        marketCodes={marketCodes}
      />
      <OrderTable targetMarketCode={targetMarketCode} />
    </Box>
  );
}

export default memo(OrderBook);

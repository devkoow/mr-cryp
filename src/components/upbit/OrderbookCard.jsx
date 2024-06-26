import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsOrderbook } from 'use-upbit-api';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { globalColors } from '../../globalColors';
import { StyledTableCell } from '../../defaultTheme';

/** 실시간 오더북 테이블 UI */
const OrderTable = memo(function OrderTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };

  const { socket, isConnected, socketData } = useWsOrderbook(
    ...targetMarketCode
  );

  // 웹소켓 연결 핸들러 - evt : 추가적으로 전달하고자 하는 이벤트 파라미터
  const connectButtonHandler = (evt) => {
    if (isConnected && socket) {
      socket.close();
    }
  };

  return (
    <>
      {socketData ? (
        <TableContainer sx={{ height: 800, margin: 0, padding: 0 }}>
          <Table display="flex" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ padding: 1 }} align="center">
                  매도 물량
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 1 }} align="center">
                  가격
                </StyledTableCell>
                <StyledTableCell sx={{ padding: 1 }} align="center">
                  매수 물량
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`ask_${index}`}>
                    <TableCell
                      sx={{ backgroundColor: 'skyblue' }}
                      align="right"
                    >
                      {element.ask_size}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} align="center">
                      {element.ask_price.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}>-</TableCell>
                  </TableRow>
                ))}
              {[...socketData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell sx={{ padding: 1 }}>-</TableCell>
                  <TableCell sx={{ padding: 1 }} align="center">
                    {element.bid_price.toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.hotpink['300'] }}
                    align="left"
                  >
                    {element.bid_size}
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

/** 실시간 오더북 */
function OrderBookCard() {
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
      <Box>
        <OrderTable targetMarketCode={targetMarketCode} />
      </Box>
    </>
  );
}

export default memo(OrderBookCard);

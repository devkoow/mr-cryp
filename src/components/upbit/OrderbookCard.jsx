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
import { StyledTableCell } from '../../defaultTheme';
import { globalColors } from '../../globalColors';

/** 실시간 오더북 테이블 UI */
const OrderTable = memo(function OrderTable({ targetMarketCode, price }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsOrderbook(targetMarketCode);
  const numColor = price === 0 ? 'black' : price > 0 ? 'red' : 'blue';
  return (
    <>
      {socketData && (
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
                      color={numColor}
                    >
                      {element.ask_size}
                    </TableCell>
                    <TableCell
                      sx={{ padding: 1 }}
                      align="center"
                      color={numColor}
                    >
                      {element.ask_price.toLocaleString()}
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}></TableCell>
                  </TableRow>
                ))}
              {[...socketData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell sx={{ padding: 1 }}></TableCell>
                  <TableCell
                    sx={{ padding: 1 }}
                    align="center"
                    color={numColor}
                  >
                    {element.bid_price.toLocaleString()}
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.hotpink['300'] }}
                    align="left"
                    color={numColor}
                  >
                    {element.bid_size}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
});

/** 실시간 오더북
 * - targetMarketCode : props로 전달받은 마켓의 티커
 */
function OrderBookCard({ code, price }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState();

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

  if (isLoading) {
    return <Typography>실시간 오더북 로딩중...</Typography>;
  }

  return (
    <Box>
      <OrderTable targetMarketCode={targetMarketCode} price={price} />
    </Box>
  );
}

export default memo(OrderBookCard);

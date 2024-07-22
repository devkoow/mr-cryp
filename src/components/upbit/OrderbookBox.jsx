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
import {
  StyledTableCell,
  PriceTypography,
  DescTypography,
} from '../../defaultTheme';
import { globalColors } from '../../globalColors';

const OrderBookTable = memo(function OrderTable({
  targetMarketCode,
  rate,
  prevPrice,
}) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsOrderbook(targetMarketCode);
  const [numColor, setNumColor] = useState(
    rate === 0
      ? 'black'
      : rate > 0
        ? globalColors.color_pos['400']
        : globalColors.color_neg['400']
  );
  const [bidMaxSize, setBidMaxSize] = useState();
  const [askMaxSize, setAskMaxSize] = useState();
  const getMaxSize = (socketData) => {
    if (!socketData || !socketData.orderbook_units) {
      return [0, 0];
    }
    const askSizes = [];
    const bidSizes = [];
    socketData.orderbook_units.map((element) => {
      askSizes.push(element.ask_size);
      bidSizes.push(element.bid_size);
    });
    const maxAskSize = Math.max(...askSizes);
    const maxBidSize = Math.max(...bidSizes);
    return [maxAskSize, maxBidSize];
  };

  useEffect(() => {
    setNumColor(
      rate === 0
        ? 'black'
        : rate > 0
          ? globalColors.color_pos['400']
          : globalColors.color_neg['400']
    );
  }, [rate]);

  useEffect(() => {
    const [maxAskSize, maxBidSize] = getMaxSize(socketData);
    setAskMaxSize(maxAskSize);
    setBidMaxSize(maxBidSize);
  }, [socketData]);

  return (
    <>
      {socketData && (
        <TableContainer
          sx={{
            height: 400,
            margin: 0,
            padding: 0,
            backgroundColor: globalColors.white,
          }}
        >
          <Table display="flex" stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  sx={{ padding: 0.7, width: '33%' }}
                  align="center"
                >
                  <Box
                    height="11px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <DescTypography fontSize={12} fontWeight={700}>
                      매도 물량
                    </DescTypography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  sx={{ padding: 0.7, width: '33%' }}
                  align="center"
                >
                  <Box
                    height="11px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <DescTypography fontSize={12} fontWeight={700}>
                      가격
                    </DescTypography>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  sx={{ padding: 0.7, width: '33%' }}
                  align="center"
                >
                  <Box
                    height="11px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <DescTypography fontSize={12} fontWeight={700}>
                      매수 물량
                    </DescTypography>
                  </Box>
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {[...socketData.orderbook_units]
                .reverse()
                .map((element, index) => (
                  <TableRow key={`ask_${index}`}>
                    <TableCell
                      sx={{ backgroundColor: globalColors.color_ask['200'] }}
                      align="right"
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          height: '15px',
                        }}
                      >
                        <PriceTypography
                          fontSize={10}
                          sx={{
                            position: 'absolute',
                            right: 0,
                          }}
                        >
                          {Number(element.ask_size).toFixed(4)}
                        </PriceTypography>
                        <Box
                          sx={{
                            position: 'absolute',
                            right: 0,
                            height: '15px',
                            width: `${(element.ask_size / askMaxSize) * 100}%`,
                            maxWidth: '100%',
                            backgroundColor: globalColors.color_ask['500'],
                            opacity: 0.5,
                          }}
                        />
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: 1 }} align="center">
                      <Box display="flex" justifyContent={'space-between'}>
                        <PriceTypography
                          color={numColor}
                          fontSize={12}
                          fontWeight={'bold'}
                        >
                          {element.ask_price.toLocaleString()}
                        </PriceTypography>
                        <PriceTypography fontSize={12} color={numColor}>
                          {Number(rate) > 0 ? '+' : ''}
                          {prevPrice &&
                            Number(
                              ((element.ask_price - prevPrice) / prevPrice) *
                                100
                            ).toFixed(2)}
                          {prevPrice && '%'}
                        </PriceTypography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ padding: 1 }}></TableCell>
                  </TableRow>
                ))}

              {[...socketData.orderbook_units].map((element, index) => (
                <TableRow key={`bid_${index}`}>
                  <TableCell sx={{ padding: 1 }}></TableCell>
                  <TableCell sx={{ padding: 1 }} align="center">
                    <Box display="flex" justifyContent={'space-between'}>
                      <PriceTypography
                        color={numColor}
                        fontSize={12}
                        fontWeight={'bold'}
                      >
                        {element.bid_price.toLocaleString()}
                      </PriceTypography>
                      <PriceTypography fontSize={12} color={numColor}>
                        {Number(rate) > 0 ? '+' : ''}
                        {prevPrice &&
                          Number(
                            ((element.bid_price - prevPrice) / prevPrice) * 100
                          ).toFixed(2)}
                        {prevPrice && '%'}
                      </PriceTypography>
                    </Box>
                  </TableCell>
                  <TableCell
                    sx={{ backgroundColor: globalColors.color_bid['200'] }}
                    align="left"
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        height: '15px',
                      }}
                    >
                      <PriceTypography
                        fontSize={10}
                        sx={{
                          position: 'absolute',
                          left: 0,
                        }}
                      >
                        {Number(element.bid_size).toFixed(4)}
                      </PriceTypography>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 0,
                          height: '15px',
                          width: `${(element.bid_size / bidMaxSize) * 100}%`,
                          maxWidth: '100%',
                          backgroundColor: globalColors.color_bid['500'],
                          opacity: 0.5,
                        }}
                      />
                    </Box>
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

function OrderBookBox({ code, rate, prevPrice }) {
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
    <OrderBookTable
      targetMarketCode={targetMarketCode}
      rate={rate}
      prevPrice={prevPrice}
    />
  );
}

export default memo(OrderBookBox);

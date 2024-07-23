import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTrade } from 'use-upbit-api';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypography,
  StyledTableCell,
} from '../../defaultTheme';
import { globalColors } from '../../globalColors';
import { useOpenApi } from '../../context/OpenApiContext';

/** 실시간 거래내역 테이블 UI
 * - timestampToTime : 타임스탬프 값을 KST 시간으로 변환
 */
const TradeTable = memo(function TradeTable({ targetMarketCode }) {
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTrade(targetMarketCode);
  const timestampToTime = (timestamp) => {
    const time = new Date(timestamp);
    const timeStr = time.toLocaleTimeString();
    return timeStr;
  };

  return (
    <TableContainer
      sx={{
        maxWidth: 1000,
        height: 400,
        overflow: 'auto',
        backgroundColor: globalColors.white,
      }}
    >
      {socketData && (
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결 시간</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결 가격</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결량</DescriptionTypo>
              </StyledTableCell>
              <StyledTableCell align="center">
                <DescriptionTypo fontSize={12}>체결금액</DescriptionTypo>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {socketData
              ? [...socketData].reverse().map((data, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      <NGTypo fontSize={12}>
                        {timestampToTime(data.trade_timestamp)}
                      </NGTypo>
                    </TableCell>
                    <TableCell align="center">
                      <NGTypo fontSize={12}>
                        {Number(data.trade_price).toLocaleString()}원
                      </NGTypo>
                    </TableCell>
                    <TableCell align="center">
                      <PriceTypography
                        fontSize={12}
                        color={
                          data.ask_bid === 'ASK'
                            ? globalColors.color_pos['400']
                            : globalColors.color_neg['400']
                        }
                      >
                        {data.trade_volume}
                      </PriceTypography>
                    </TableCell>
                    <TableCell align="center">
                      <PriceTypography
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
                      </PriceTypography>
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
function TradeHistoryBox({ code }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState();
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
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <NGTypo>실시간 거래 내역 로딩중...</NGTypo>;
  }

  return (
    <Box>
      <TradeTable targetMarketCode={targetMarketCode} />
    </Box>
  );
}

export default memo(TradeHistoryBox);

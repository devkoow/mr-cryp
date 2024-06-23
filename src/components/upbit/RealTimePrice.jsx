import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

/** 실시간 가격 테이블 UI */
const RealTimePriceTable = memo(function RealTimePriceTable({ socketData }) {
  return (
    <TableContainer
      sx={{
        maxWidth: '100%',
        maxHeight: 850,
        overflow: 'auto',
        margin: 0,
        padding: 0,
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>코인</TableCell>
            <TableCell>현재가</TableCell>
            <TableCell>전일대비</TableCell>
            <TableCell>거래대금</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {socketData.map((data) => (
            <TableRow key={data.code}>
              <TableCell sx={{}}>{data.code}</TableCell>
              <TableCell>{data.trade_price.toLocaleString()}</TableCell>
              <TableCell
                sx={{
                  color: data.signed_change_rate < 0 ? 'blue' : 'red',
                }}
              >
                {(data.signed_change_rate * 100).toFixed(2)}%
              </TableCell>
              <TableCell>
                {Math.round(
                  parseInt(data.acc_trade_price_24h) / 1000000
                ).toLocaleString()}
                백만
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

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setTargetMarketCode(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  return (
    <>
      {socketData ? (
        <RealTimePriceTable socketData={socketData} />
      ) : (
        <Typography>실시간 가격 로딩중...</Typography>
      )}
    </>
  );
}

export default memo(RealTimePrice);

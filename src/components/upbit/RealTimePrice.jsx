import { Button, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';

/** 실시간 가격 테이블 UI */
const RealTimePriceTable = memo(function RealTimePriceTable({ socketData }) {
  return (
    <table>
      <thead>
        <tr>
          <th>코인</th>
          <th>현재가</th>
          <th>등락률</th>
        </tr>
      </thead>
      <tbody>
        {socketData.map((data) => (
          <tr key={data.code}>
            <td>{data.code}</td>
            <td>{data.trade_price}</td>
            <td>{(data.signed_change_rate * 100).toFixed(2)}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

function RealTimePrice() {
  /** useFetchMarketCode
   * - fetch all marketcode custom hook
   */
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [targetMarketCode, setTargetMarketCode] = useState([]);

  /** Ticker Socket State */
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
  const { socket, isConnected, socketData } = useWsTicker(targetMarketCode);

  /** 연결 컨트롤 버튼 이벤트 핸들러
   * - evt : 전달하고자 하는 이벤트 파라미터
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
      <Typography>RealTimePrice Example</Typography>
      <Typography>Connected : {isConnected ? '🟢' : '🔴'}</Typography>
      <Button onClick={connectButtonHandler}>{'연결종료'}</Button>
      <h3>Ticker</h3>
      {socketData ? (
        <RealTimePriceTable socketData={socketData} />
      ) : (
        <Typography>Ticker Loading...</Typography>
      )}
    </>
  );
}

export default memo(RealTimePrice);

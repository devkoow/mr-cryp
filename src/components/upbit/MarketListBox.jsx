import { memo, useEffect, useState } from 'react';
import { useFetchMarketCode, useWsTicker } from 'use-upbit-api';
import {
  DescriptionTypo,
  NGTypo,
  PriceTypo,
  StyledTableCell,
} from '../../defaultTheme';
import { globalColors } from '../../globalColors';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  LinearProgress,
} from '@mui/material';

const RealTimePriceTable = memo(function RealTimePriceTable({
  socketData,
  marketCodeMap,
  setCode,
  setRate,
  setPrevPrice,
  setCurrPrice,
}) {
  const handleRowClick = (code, rate, prevPrice, currPrice) => {
    setCode(code);
    setRate(rate);
    setPrevPrice(prevPrice);
    setCurrPrice(currPrice);
  };

  return (
    <TableContainer
      sx={{
        maxWidth: '100%',
        height: 900,
        overflow: 'auto',
        margin: 0,
        padding: 0,
        backgroundColor: globalColors.white,
      }}
    >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>코인</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>현재가</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>전일대비</DescriptionTypo>
            </StyledTableCell>
            <StyledTableCell align="center">
              <DescriptionTypo fontSize={12}>거래대금</DescriptionTypo>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {socketData.map((data) => (
            <TableRow
              key={data.code}
              onClick={() => {
                handleRowClick(
                  data.code,
                  data.signed_change_rate,
                  data.prev_closing_price,
                  data.trade_price
                );
              }}
              sx={{
                '&:hover': {
                  backgroundColor: '#aeb0af',
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell>
                <NGTypo
                  fontSize={11}
                  fontWeight={'bold'}
                  sx={{ maxWidth: '5em', overflowWrap: 'break-word' }}
                >
                  {marketCodeMap[data.code]}
                </NGTypo>
                <NGTypo fontSize={10} color={globalColors.market_code}>
                  {data.code}
                </NGTypo>
              </TableCell>
              <TableCell align="right">
                <PriceTypo
                  fontSize={11}
                  fontWeight={'bold'}
                  sx={{
                    color:
                      data.signed_change_rate > 0
                        ? globalColors.color_pos['400']
                        : data.signed_change_rate < 0
                          ? globalColors.color_neg['400']
                          : 'black',
                  }}
                >
                  {data.trade_price.toLocaleString()}
                </PriceTypo>
              </TableCell>
              <TableCell
                sx={{
                  color:
                    data.signed_change_rate > 0
                      ? globalColors.color_pos['400']
                      : data.signed_change_rate < 0
                        ? globalColors.color_neg['400']
                        : 'black',
                }}
                align="right"
              >
                <Box display="flex" flexDirection="column">
                  <PriceTypo fontSize={10} fontWeight={'bold'}>
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </PriceTypo>
                  <PriceTypo fontSize={10} fontWeight={'bold'}>
                    {data.signed_change_price.toLocaleString()}
                  </PriceTypo>
                </Box>
              </TableCell>
              <TableCell>
                <Box display={'flex'}>
                  <PriceTypo fontSize={10}>
                    {Math.round(
                      parseInt(data.acc_trade_price_24h) / 1000000
                    ).toLocaleString()}
                  </PriceTypo>
                  <NGTypo fontSize={10}>백만</NGTypo>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

/** 실시간 가격
 * - marketCodes : [{market, korean_name, english_name}]
 * - socketData : useWsTicker를 이용하여 받아온 웹소켓 API 데이터. 내용은 업비트 공식 문서 참고
 * - krwMarketCodes : KRW로 시작하는 marketCodes
 * - marketCodeMap : market 값을 키로 사용하는 korean_name 해시맵
 * */
function MarketListBox({ setCode, setRate, setPrevPrice, setCurrPrice }) {
  const { isLoading, marketCodes } = useFetchMarketCode();
  const [krwMarketCodes, setKrwMarketCodes] = useState([]);
  const { socket, isConnected, socketData } = useWsTicker(krwMarketCodes);

  useEffect(() => {
    if (!isLoading && marketCodes) {
      setKrwMarketCodes(
        marketCodes.filter((element) => element.market.includes('KRW'))
      );
    }
  }, [isLoading, marketCodes]);

  const marketCodeMap = {};
  krwMarketCodes.forEach((item) => {
    marketCodeMap[item.market] = item.korean_name;
  });

  return (
    <>
      {socketData ? (
        <RealTimePriceTable
          socketData={socketData}
          marketCodeMap={marketCodeMap}
          setCode={setCode}
          setRate={setRate}
          setPrevPrice={setPrevPrice}
          setCurrPrice={setCurrPrice}
        />
      ) : (
        <LinearProgress color="primary" />
      )}
    </>
  );
}
export default memo(MarketListBox);

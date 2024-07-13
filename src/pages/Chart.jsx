import React, { useState } from 'react';
import RealTimePriceCard from '../components/upbit/RealTimePriceCard';
import MarketCard from '../components/upbit/MarketCard';
import OrderbookCard from '../components/upbit/OrderbookCard';
import TradeHistoryCard from '../components/upbit/TradeHistoryCard';
import ChartCard from '../components/upbit/ChartCard';
import Order from '../components/upbit/Order';
import { Box, Grid, Button } from '@mui/material';
import { DescTypography, theme } from '../defaultTheme';

/** 전체 차트 페이지
 * - code : 실시간 금액에서 선택한 마켓의 티커
 */
export default function Chart() {
  const [code, setCode] = useState('KRW-BTC');
  const [rate, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Grid
        container
        spacing={0}
        sx={{
          width: 1200,
          height: 900,
          border: '1px',
          boxShadow: 3,
          marginBottom: 10,
        }}
        margin="auto"
      >
        <Grid item xs={3}>
          <RealTimePriceCard
            setCode={setCode}
            setPrice={setPrice}
            setPrevPrice={setPrevPrice}
          />
        </Grid>
        <Grid item xs={9}>
          <MarketCard code={code} />
          <ChartCard code={code} />
          <Grid container spacing={0} padding="0">
            <Grid item xs={7}>
              <TradeHistoryCard code={code} />
            </Grid>
            <Grid item xs={5}>
              <OrderbookCard code={code} rate={rate} prevPrice={prevPrice} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Button
        sx={{
          position: 'absolute',
          right: 180,
          top: '31%',
          '&:hover': { color: theme.palette.secondary.light },
        }}
        onClick={handleOpen}
      >
        <DescTypography>주문하기</DescTypography>
      </Button>
      <Order open={open} handleClose={handleClose} code={code} />
    </Box>
  );
}

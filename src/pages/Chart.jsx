import React, { useState } from 'react';
import MarketListBox from '../components/upbit/MarketListBox';
import MarketDetail from '../components/upbit/MarketDetail';
import OrderbookBox from '../components/upbit/OrderbookBox';
import TradeHistoryBox from '../components/upbit/TradeHistoryBox';
import ChartBox from '../components/upbit/ChartBox';
import OrderModal from '../components/upbit/OrderModal';
import { Box, Grid, Button } from '@mui/material';
import { DescTypography, theme } from '../defaultTheme';

export default function Chart() {
  const [code, setCode] = useState('KRW-BTC');
  const [rate, setRate] = useState(0);
  const [prevPrice, setPrevPrice] = useState(null);
  const [currPrice, setCurrPrice] = useState(null);
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
          <MarketListBox
            setCode={setCode}
            setRate={setRate}
            setPrevPrice={setPrevPrice}
            setCurrPrice={setCurrPrice}
          />
        </Grid>
        <Grid item xs={9}>
          <MarketDetail code={code} />
          <Box sx={{ position: 'relative' }}>
            <ChartBox code={code} />
            <Button
              sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                '&:hover': { color: theme.palette.secondary.light },
              }}
              onClick={handleOpen}
            >
              <DescTypography>주문하기</DescTypography>
            </Button>
          </Box>
          <Grid container spacing={0} padding="0">
            <Grid item xs={7}>
              <TradeHistoryBox code={code} />
            </Grid>
            <Grid item xs={5}>
              <OrderbookBox code={code} rate={rate} prevPrice={prevPrice} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OrderModal
        open={open}
        handleClose={handleClose}
        code={code}
        currPrice={currPrice}
      />
    </Box>
  );
}

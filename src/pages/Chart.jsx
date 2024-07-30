import React from 'react';
import MarketListBox from '../components/upbit/MarketListBox';
import MarketDetail from '../components/upbit/MarketDetail';
import OrderbookBox from '../components/upbit/OrderbookBox';
import TradeHistoryBox from '../components/upbit/TradeHistoryBox';
import ChartBox from '../components/upbit/ChartBox';
import OrderModal from '../components/upbit/OrderModal';
import { Box, Grid, Button } from '@mui/material';
import { DescriptionTypo, theme } from '../defaultTheme';
import { useDispatch } from 'react-redux';
import { setOpen } from '../redux/chartSlice';

export default function Chart() {
  const dispatch = useDispatch();
  const handleOpen = () => dispatch(setOpen(true));
  const handleClose = () => dispatch(setOpen(false));

  return (
    <Box>
      <Grid
        container
        spacing={0}
        sx={{
          width: '100%',
          maxWidth: 1200,
          height: '1005',
          border: '1px',
          boxShadow: 3,
          mb: 10,
          '@media (max-width:450px)': {
            mb: 0,
          },
        }}
        margin="auto"
      >
        <Grid item xs={12} md={3}>
          <MarketListBox />
        </Grid>
        <Grid item xs={12} md={9}>
          <MarketDetail />
          <Box sx={{ position: 'relative' }}>
            <ChartBox />
            <Button
              sx={{
                position: 'absolute',
                right: 5,
                top: 5,
                '&:hover': { color: theme.palette.secondary.light },
              }}
              onClick={handleOpen}
            >
              <DescriptionTypo>주문하기</DescriptionTypo>
            </Button>
          </Box>
          <Grid container spacing={0} padding="0">
            <Grid item xs={12} md={7}>
              <TradeHistoryBox />
            </Grid>
            <Grid item xs={12} md={5}>
              <OrderbookBox />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <OrderModal handleClose={handleClose} />
    </Box>
  );
}

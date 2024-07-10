import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
// import Account from '../components/upbit/Account';
// import Bid from '../components/upbit/Bid';

export default function Home() {
  return (
    <Box sx={{ width: '80%', margin: 'auto' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">계좌 잔고(전체 계좌 조회)</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">주문리스트</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

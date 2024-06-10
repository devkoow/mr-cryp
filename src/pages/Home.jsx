import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';

export default function Home() {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">내 잔고</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">주문리스트</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">수익률</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <Typography variant="h6">관심종목 대시보드</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

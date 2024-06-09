import React from 'react';
import Videos from '../components/Videos';
import { Grid, Typography } from '@mui/material';
import Information from '../components/Information';
import Articles from '../components/Articles';

export default function Vision() {
  return (
    <>
      <Typography>가상자산 관련 정보</Typography>
      <Information />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Videos />
        </Grid>
        <Grid item xs={12} md={6}>
          <Articles />
        </Grid>
      </Grid>
    </>
  );
}

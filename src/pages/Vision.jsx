import React from 'react';
import Information from '../components/vision/Information';
import Videos from '../components/vision/Videos';
import Articles from '../components/vision/Articles';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { DescriptionTypo, SubTitle } from '../defaultTheme';

export default function Vision() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <Grid container spacing={2} width="80%">
        <Grid item xs={12} md={12}>
          <SubTitle>가상자산 관련 정보</SubTitle>
          <DescriptionTypo>
            코인에 대한 정보와 크립토 서비스 이용 방법을 확인하세요 😊
          </DescriptionTypo>
          <Information />
        </Grid>
        <Grid item xs={12} md={6}>
          <Videos />
        </Grid>
        <Grid item xs={12} md={6}>
          <Articles />
        </Grid>
      </Grid>
    </Box>
  );
}

import React from 'react';
import Videos from '../components/Videos';
import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import Information from '../components/Information';
import Articles from '../components/Articles';
import { DescTypography } from '../defaultTheme';
import { globalColors } from '../globalColors';

export default function Vision() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={2} width="80%">
        <Grid item xs={12} md={12}>
          <DescTypography
            sx={{
              color: globalColors.white,
              textShadow: '1px 1px 2px black',
              fontWeight: 'bold',
              fontSize: '2rem',
            }}
          >
            가상자산 관련 정보
          </DescTypography>
          <DescTypography
            sx={{
              color: globalColors.white,
              textShadow: '1px 1px 2px black',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            코인에 대한 정보와 크립토 서비스 이용 방법을 확인하세요 😊
          </DescTypography>
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

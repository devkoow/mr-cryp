import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IMG_BG from '../assets/images/logo_mustache.png';
import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { DescTypography, theme } from '../defaultTheme';
import { globalColors } from '../globalColors';
import AccountBox from '../components/upbit/AccountBox';
import AccountDetail from '../components/upbit/AccountDetail';

export default function Home() {
  const [balance, setBalance] = useState([]);

  useEffect(() => {
    const handleData = async () => {
      try {
        const response = await axios.get('/data/balance.json');
        setBalance(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    handleData();
  }, []);

  return (
    <Box sx={{ width: '80%', marginBottom: 10, marginX: 'auto' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12} marginBottom={4}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '500px',
              backgroundColor: globalColors.skyblue['300'],
              overflow: 'hidden',
              gap: '2rem',
            }}
          >
            <img src={IMG_BG} width={300} height={100}></img>
            <Typography
              fontSize={36}
              fontWeight={'bold'}
              color={theme.palette.secondary.light}
              fontFamily={'CWDangamAsac-Bold'}
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                textAlign: 'center',
              }}
            >
              실시간으로 가상화폐의 시세를 확인할 수 있고 <br />
              최신 소식도 확인 가능한 크립토 비서입니다!
            </Typography>
            {/* <img src={IMG_TEXT} width={1100} height={150}></img> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <DescTypography fontSize={32} marginBottom={2}>
            내 계좌 현황
          </DescTypography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              borderRadius: '30px',
              paddingY: 5,
              boxShadow: 4,
            }}
          >
            <AccountBox balance={balance} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box marginTop={12}>
            <AccountDetail balance={balance} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

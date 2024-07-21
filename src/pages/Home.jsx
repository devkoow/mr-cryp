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
              height: 'auto',
              backgroundColor: globalColors.skyblue['300'],
              overflow: 'hidden',
              gap: '1rem',
            }}
          >
            <Box
              component="img"
              alt="logo"
              src={IMG_BG}
              sx={{
                width: 420,
                height: 140,
                '@media (max-width:600px)': {
                  width: 150,
                  height: 50,
                },
              }}
            ></Box>
            <Typography
              fontSize={48}
              fontWeight={'bold'}
              color={globalColors.white}
              fontFamily={'CWDangamAsac-Bold'}
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                textAlign: 'center',
                '@media (max-width:1200px)': {
                  fontSize: 32,
                  lineHeight: 1.2,
                },
                '@media (max-width:900px)': {
                  fontSize: 24,
                  lineHeight: 1.2,
                },
                '@media (max-width:600px)': {
                  fontSize: 18,
                  lineHeight: 1.2,
                },
                '@media (max-width:450px)': {
                  fontSize: 15,
                  lineHeight: 1.2,
                },
              }}
            >
              실시간으로 가상화폐의 시세를 확인할 수 있고
            </Typography>
            <Typography
              fontSize={48}
              fontWeight={'bold'}
              color={globalColors.white}
              fontFamily={'CWDangamAsac-Bold'}
              sx={{
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                textAlign: 'center',
                '@media (max-width:1200px)': {
                  fontSize: 32,
                  lineHeight: 1.2,
                },
                '@media (max-width:900px)': {
                  fontSize: 24,
                  lineHeight: 1.2,
                },
                '@media (max-width:600px)': {
                  fontSize: 18,
                  lineHeight: 1.2,
                },
                '@media (max-width:450px)': {
                  fontSize: 15,
                  lineHeight: 1.2,
                },
              }}
            >
              최신 소식도 확인 가능한 크립토 비서입니다!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <DescTypography
            fontSize={32}
            marginBottom={2}
            sx={{
              '@media (max-width:900px)': {
                fontSize: 24,
                lineHeight: 1.2,
              },
            }}
          >
            내 계좌 현황
          </DescTypography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              backgroundColor: globalColors.white['400'],
              borderRadius: '30px',
              paddingY: 5,
              boxShadow: 4,
            }}
          >
            <AccountBox balance={balance} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ margin: 'auto' }}>
          <AccountDetail balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
}

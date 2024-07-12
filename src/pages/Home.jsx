import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DescTypography } from '../defaultTheme';
import { globalColors } from '../globalColors';
import IMG_BG from '../assets/images/logo_mustache.png';
import IMG_TEXT from '../assets/images/img_home_text.png';
import BalanceCard from '../components/upbit/BalanceCard';
import OrderCard from '../components/upbit/OrderCard';

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
          <Paper sx={{ margin: 0, padding: 0, borderRadius: '30px' }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '500px',
                backgroundColor: globalColors.vanilla['200'],
                borderRadius: '30px',
                overflow: 'hidden',
                gap: '2rem',
              }}
            >
              <img src={IMG_BG} width={300} height={100}></img>
              <img src={IMG_TEXT} width={1100} height={150}></img>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <DescTypography variant="h6" marginBottom={2}>
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
            <BalanceCard balance={balance} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <DescTypography variant="h6" marginBottom={2}>
            계좌 상세정보
          </DescTypography>
          <OrderCard balance={balance} />
        </Grid>
      </Grid>
    </Box>
  );
}

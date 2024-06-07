import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { loginGoogle } from '../api/firebase';
import { useNavigate } from 'react-router-dom';
import ButtonKakao from '../components/ButtonKakao';
import LOGO_GOOGLE from '../assets/images/logo_google.png';
import LOGO_BG from '../assets/images/logo_normal.png';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyrights All reserved © '}
      <Link color="inherit" href="https://github.com/devkoow">
        Mr.Cryp
      </Link>{' '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const handleLogin = () => {
    loginGoogle()
      .then(() => {
        navigate('/home');
      })
      .catch(console.error);
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* 로그인 폼 */}
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              로그인
            </Typography>
            <Button
              variant="contained"
              sx={{
                mt: 3,
                px: 3,
                gap: 1,
                display: 'flex',
                alignItems: 'center',
                '&:hover': {
                  backgroundColor: '#ffffff',
                  color: '#000000',
                },
              }}
              onClick={handleLogin}
            >
              <img src={LOGO_GOOGLE} alt="구글 로고" width="20" height="20" />
              <span>구글 로그인</span>
            </Button>
            <ButtonKakao />
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Grid>
        {/* 포스터 사이드 */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${LOGO_BG})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

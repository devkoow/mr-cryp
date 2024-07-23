import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { DescriptionTypo, NGTypo, LogoTypo, theme } from '../defaultTheme';
import { globalColors } from '../globalColors';
import { loginGoogle } from '../api/firebase';
import ButtonKakao from '../components/ButtonKakao';
import LOGO_BG from '../assets/images/logo_mustache.png';
import LOGO_GOOGLE from '../assets/images/logo_google.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function Copyright(props) {
  return (
    <NGTypo variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyrights All reserved © '}
      <Link color="inherit" href="https://github.com/devkoow">
        Mr.Cryp
      </Link>{' '}
      {new Date().getFullYear()}
    </NGTypo>
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
            <Avatar sx={{ m: 1, backgroundColor: theme.palette.primary.main }}>
              <LockOutlinedIcon />
            </Avatar>
            <DescriptionTypo
              fontSize={30}
              sx={{ color: theme.palette.primary.main, mb: 1 }}
            >
              로그인
            </DescriptionTypo>
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
              <NGTypo>구글 로그인</NGTypo>
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
            display: { xs: 'none', sm: 'block' },
            backgroundColor: globalColors.skyblue['400'],
          }}
        >
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'100vh'}
          >
            <Box
              component="img"
              src={LOGO_BG}
              width={450}
              height={150}
              sx={{
                '@media (max-width: 900px)': {
                  width: 210,
                  height: 70,
                },
              }}
            />
            <LogoTypo
              noWrap
              component="a"
              fontWeight="bold"
              fontSize={'50px'}
              sx={{
                letterSpacing: '.3rem',
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                textShadow: globalColors.shadow_text,
                mr: 2,

                '@media (max-width: 900px)': {
                  fontSize: 24,
                },
              }}
            >
              Mr.Cryp
            </LogoTypo>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

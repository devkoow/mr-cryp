import Button from '@mui/material/Button';
import LOGO_KAKAO from '../assets/images/logo_kakao.png';

export default function ButtonKakao() {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = 'http://localhost:3000/auth';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const handleLogin = () => {
    try {
      window.location.href = kakaoURL;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          mt: 3,
          gap: 1,
          backgroundColor: '#fddc3f',
          color: '#000000',
          display: 'flex',
          alignItems: 'center',
          '&:hover': {
            backgroundColor: '#ffffff',
            color: '#000000',
          },
        }}
        onClick={handleLogin}
      >
        <img src={LOGO_KAKAO} alt="카카오 로고" width="20" height="20" />
        <span>카카오 로그인</span>
      </Button>
    </>
  );
}

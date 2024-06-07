import { createTheme } from '@mui/material';
import { globalColors } from './globalColors';

/** 컬러 팔레트, 기본 컴포넌트 세팅
 * 배경 : skyblue,
 * primary : hotpink, secondary : vanilla
 - main : 400
 - light : 300
 - dark : 500
 - contrastText: 서로 반대 컬러 & 200
 */
export let theme = createTheme({
  palette: {
    primary: {
      main: globalColors.hotpink['400'],
      light: globalColors.hotpink['300'],
      dark: globalColors.hotpink['500'],
      contrastText: globalColors.vanilla['200'],
    },
    secondary: {
      main: globalColors.vanilla['400'],
      light: globalColors.vanilla['300'],
      dark: globalColors.vanilla['500'],
      constrastText: globalColors.hotpink['200'],
    },
  },
  components: {
    // 버튼
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'medium',
        color: 'primary',
        disableRipple: true,
      },
      styleOverride: {
        root: {
          fontSize: '2rem',
          marginTop: '10px',
        },
      },
    },
  },
});

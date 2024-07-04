import { createTheme, TableCell, Typography } from '@mui/material';
import { globalColors } from './globalColors';
import { fontFamily, styled } from '@mui/system';

/** 컬러 팔레트, 기본 컴포넌트 세팅
 * 배경 : skyblue,
 * primary : hotpink / secondary : vanilla
- light : 300
- main : 400
- dark : 500
 - contrastText: primary와 secondary의 서로 반대 컬러['200']
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
    // 스크롤바
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
          background: #888;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        * {
          scrollbar-width: thin;
          scrollbar-color: #888 #f1f1f1;
        }
      `,
    },
    // 타이포그래피
    MuiTypography: {
      defaultProps: {
        fontFamily: 'ChoseonGu',
      },
    },
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
    // 테이블 컨테이너
    MuiTableContainer: {
      styleOverrides: {
        root: {},
      },
    },
    // 테이블
    MuiTable: {
      defaultProps: {},
    },
    // 테이블 헤드
    MuiTableHead: {
      defaultProps: {
        color: globalColors.vanilla['300'],
      },
      styleOverrides: {
        root: {
          backgroundColor: globalColors.hotpink['400'],
        },
      },
    },
    // 테이블 셀
    MuiTableCell: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          // fontFamily: 'ChoseonGu',
          fontSize: 12,
          whiteSpace: 'nowrap',
          padding: 2,
          verticalAlign: 'middle',
        },
        head: {
          color: 'white',
        },
      },
    },
  },
});

/** 스틱키 헤드 셀 */
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'sticky',
  top: 0,
  zIndex: 100,
}));

/** 금액 타이포그래피 */
export const PriceTypography = styled(Typography)(() => ({
  fontFamily: 'ONE-Mobile-Title',
}));

/** 네비게이션바 타이포그래피 */
export const NavTypography = styled(Typography)(() => ({
  fontFamily: 'SBAggroB',
  fontWeight: 500,
  fontSize: '20px',
}));

/** 네비게이션바 로고 타이포그래피 */
export const LogoTypography = styled(Typography)(() => ({
  fontFamily: 'SDSamliphopangche_Outline',
  fontWeight: 'bold',
  fontSize: '50px',
}));

/** 본문 타이포그래피 */
export const DescTypography = styled(Typography)(() => ({
  fontFamily: 'NEXON Lv1 Gothic OTF',
}));

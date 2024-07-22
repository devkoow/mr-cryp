import React, { useState, useEffect } from 'react';
import LOGO_APPBAR from '../assets/images/logo_circle.png';
import { useNavigate } from 'react-router-dom';
import User from './User';
import { logoutGoogle } from '../api/firebase';
import logoutKakao from '../api/logoutKakao';
import { LogoTypography, NavTypography } from '../defaultTheme';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { globalColors } from '../globalColors';

const pages = ['대시보드', '비전', '거래'];
const settings = ['프로필 정보', '로그아웃'];
const subMenus = ['실시간 오더북', '실시간 거래 내역', '차트'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePage, setActivePage] = useState('대시보드');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const activePage = localStorage.getItem('activePage');
    if (activePage) setActivePage(activePage);
  }, []);

  const handleLogout = () => {
    try {
      const socialType = localStorage.getItem('socialType');
      if (socialType === 'Google') {
        logoutGoogle();
        navigate('/');
      } else if (socialType === 'Kakao') {
        logoutKakao();
        navigate('/');
      } else {
        return;
      }
    } catch (error) {
      console.error('로그아웃 에러');
    }
  };

  /** 로그아웃 혹은 프로필 정보 모달 열기 */
  const handleCloseUserMenu = (action) => {
    setAnchorElUser(null);
    if (action === '로그아웃') handleLogout();
    if (action === '프로필 정보') {
      handleOpen();
    }
  };

  /** 페이지 메뉴 토글 */
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setActivePage(page);
    localStorage.setItem('activePage', page);
    if (page === '대시보드') navigate('/home');
    if (page === '거래') navigate('/trade');
    if (page === '비전') navigate('/vision');
  };

  /** 서브메뉴 토글 */
  const handleToggleSubMenu = (subMenu) => {
    setActiveSubMenu(subMenu);
    if (subMenu === '실시간 거래 내역') navigate('/trade/tradeHistory');
    if (subMenu === '실시간 오더북') navigate('/trade/orderbook');
    if (subMenu === '차트') navigate('/trade/chart');
  };

  /** 반응형 xs 메뉴바 클릭 -> 드롭다운 */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  /** 유저 프로필 사진 클릭 -> 드롭다운 */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{ top: 0, left: 0, right: 0, marginBottom: 4 }}
    >
      {/* 네비게이션바 */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* md 로고 타이포 */}
          <LogoTypography
            noWrap
            component="a"
            fontWeight="bold"
            fontSize={'50px'}
            sx={{
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              textShadow: globalColors.shadow_text,
              mr: 2,
            }}
          >
            Mr.Cryp
          </LogoTypography>
          {/* xs 네브바 메뉴 : 아이콘으로 활성화 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{
                color: globalColors.white,
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => handleCloseNavMenu(page)}>
                  <NavTypography textAlign="center" fontSize={'18px'}>
                    {page}
                  </NavTypography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* xs 로고 타이포 */}
          <LogoTypography
            fontSize={'32px'}
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.3rem',
              color: 'inherit',
              textShadow: globalColors.shadow_text,
              textDecoration: 'none',
              mr: 2,
            }}
          >
            Mr.Cryp
          </LogoTypography>
          {/* md 네브바 메뉴 */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleCloseNavMenu(page)}
                sx={{
                  my: 2,
                  mr: 2,
                  color: 'white',
                  display: 'block',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <NavTypography
                  sx={{
                    textShadow: globalColors.shadow_text,
                    fontSize: '32px',
                    '@media (max-width:1100px)': {
                      fontSize: '24px',
                    },
                  }}
                >
                  {page}
                </NavTypography>
              </Button>
            ))}
          </Box>
          {/* 유저 메뉴 */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="내 프로필 / 로그아웃">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NavTypography
                  onClick={handleOpenUserMenu}
                  fontSize={32}
                  sx={{
                    p: 0,
                    color: globalColors.white['400'],
                    textShadow: globalColors.shadow_text,
                    '&:hover': {
                      opacity: '50%',
                      cursor: 'pointer',
                      transition: 'opacity 0.3s ease',
                    },
                    '@media (max-width:900px)': {
                      fontSize: 18,
                      lineHeight: 1.2,
                    },
                    my: 4,
                  }}
                >
                  내 프로필
                </NavTypography>
              </Box>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
        {/* '거래' 하위 탭*/}
        {activePage === '거래' && (
          <Box
            sx={{
              display: 'flex',
              marginLeft: 37,
              '@media (max-width:900px)': {
                marginLeft: 0,
                justifyContent: 'center',
              },
            }}
          >
            {subMenus.map((subMenu) => (
              <Button
                key={subMenu}
                onClick={() => handleToggleSubMenu(subMenu)}
                sx={{
                  my: 2,
                  mr: 2,
                  color:
                    activeSubMenu === subMenu ? 'secondary.light' : 'white',
                  display: 'block',
                  border: 'none',
                  boxShadow: 'none',
                }}
              >
                <NavTypography
                  fontSize={32}
                  sx={{
                    textShadow: globalColors.shadow_text,
                    '&:hover': {
                      textShadow: 'none',
                    },
                    '@media (max-width:1100px)': {
                      fontSize: '24px',
                    },
                    '@media (max-width:900px)': {
                      fontSize: '16px',
                    },
                    '@media (max-width:450px)': {
                      fontSize: '14px',
                    },
                  }}
                >
                  {subMenu}
                </NavTypography>
              </Button>
            ))}
          </Box>
        )}
      </Container>
      <User open={open} handleClose={handleClose} />
    </AppBar>
  );
}

import React, { useState } from 'react';
import logoutKakao from '../api/logoutKakao';
import { useNavigate } from 'react-router-dom';
import { logoutGoogle } from '../api/firebase';
import LOGO_APPBAR from '../assets/images/logo_appbar.png';
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
import Avatar from '@mui/material/Avatar';
import User from './User';
import { LogoTypography, NavTypography } from '../defaultTheme';

const pages = ['대시보드', '거래', '비전'];
const settings = ['프로필 정보', '로그아웃'];
const subMenus = ['실시간 오더북', '실시간 거래 내역', '전체 차트', '주문하기'];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [activePage, setActivePage] = useState('대시보드');
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const nickname = localStorage.getItem('nickname');
  const socialType = localStorage.getItem('socialType');
  /** 소셜 타입 판단 후 함수 호출
   * - Google : logoutGoogle
   * - Kakao : logoutKakao
   */
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

  /** 로그아웃 혹은 프로필 수정 페이지 이동 */
  const handleCloseUserMenu = (action) => {
    setAnchorElUser(null);
    if (action === '로그아웃') handleLogout();
    if (action === '프로필 정보') navigate('/profile');
  };

  /** 페이지 메뉴 토글 */
  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    setActivePage(page);
    if (page === '대시보드') navigate('/home');
    if (page === '거래') navigate('/trade');
    if (page === '비전') navigate('/vision');
  };

  /** 서브메뉴 토글 */
  const handleToggleSubMenu = (subMenu) => {
    setActiveSubMenu(subMenu);
    if (subMenu === '실시간 거래 내역') navigate('/trade/tradeHistory');
    if (subMenu === '실시간 오더북') navigate('/trade/orderbook');
    if (subMenu === '전체 차트') navigate('/trade/charts');
    if (subMenu === '주문하기') navigate('/trade/orders');
  };

  /** xs일 때 드롭다운 메뉴를 여는 함수 */
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  /** 유저를 클릭하면 드롭다운 메뉴를 여는 함수 */
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      sx={{ top: 0, left: 0, right: 0, marginBottom: 4 }}
    >
      {/* 메인 네비게이션바 : xs, md일 때 반응형 디자인 구분 */}
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* md */}
          <Avatar
            src={LOGO_APPBAR}
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              width: '100px',
              height: '100px',
            }}
          />
          <LogoTypography
            variant="h6"
            noWrap
            component="a"
            fontWeight="bold"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Mr.Cryp
          </LogoTypography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
                  <NavTypography textAlign="center">{page}</NavTypography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* xs */}
          <Avatar
            src={LOGO_APPBAR}
            sx={{
              display: { xs: 'flex', md: 'none' },
              mr: 1,
              width: '100px',
              height: '100px',
            }}
          />
          <LogoTypography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Mr.Cryp
          </LogoTypography>
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
                <NavTypography>{page}</NavTypography>
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip
              title={socialType === 'Kakao' ? '카카오 계정' : '구글 계정'}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 2 }}>
                  <User />
                </IconButton>
                <NavTypography>반갑습니다, {nickname}님</NavTypography>
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
        {/* 서브 네비게이션바 : 거래 탭의 하위 탭을 활성화 */}
        {activePage === '거래' && (
          <Box sx={{ display: 'flex', marginLeft: 42 }}>
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
                <NavTypography>{subMenu}</NavTypography>
              </Button>
            ))}
          </Box>
        )}
      </Container>
    </AppBar>
  );
}

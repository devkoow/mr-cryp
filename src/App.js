import './App.css';
import ResponsiveAppBar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './defaultTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from './context/YoutubeContext';

const queryClient = new QueryClient();
export default function App() {
  const location = useLocation();
  const isSignIn = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  return (
    <ThemeProvider theme={theme}>
      {!isSignIn && !isAuth && <ResponsiveAppBar />}
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </ThemeProvider>
  );
}

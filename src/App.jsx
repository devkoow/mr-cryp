import './App.css';
import ResponsiveAppBar from './components/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './defaultTheme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OpenApiProvider } from './context/OpenApiContext';

const queryClient = new QueryClient();
export default function App() {
  const location = useLocation();
  const isSignIn = location.pathname === '/';
  const isAuth = location.pathname === '/auth';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        {!isSignIn && !isAuth && <ResponsiveAppBar />}
        <OpenApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </OpenApiProvider>
      </CssBaseline>
    </ThemeProvider>
  );
}

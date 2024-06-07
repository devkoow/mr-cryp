import './App.css';
import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { theme } from './defaultTheme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Outlet />
    </ThemeProvider>
  );
}

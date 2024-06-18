import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Vision from './pages/Vision';
import AuthKakao from './pages/AuthKakao';
import Trade from './pages/Trade';
import Orderbook from './components/upbit/Orderbook';
import TradeHistory from './components/upbit/TradeHistory';
import RealTimePrice from './components/upbit/RealTimePrice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <SignIn /> },
      { path: '/auth', element: <AuthKakao /> },
      { path: '/home', element: <Home /> },
      { path: '/trade', element: <Trade /> },
      { path: '/trade/orderbook', element: <Orderbook /> },
      { path: '/trade/tradeHistory', element: <TradeHistory /> },
      { path: '/trade/realTimePrice', element: <RealTimePrice /> },
      { path: '/vision', element: <Vision /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import Vision from './pages/Vision';
import AuthKakao from './pages/AuthKakao';
import Trade from './pages/Trade';
import Orderbook from './pages/Orderbook';
import TradeHistory from './pages/TradeHistory';
import Order from './pages/Order';
import Chart from './pages/Chart';

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
      { path: '/trade/charts', element: <Chart /> },
      { path: '/trade/orders', element: <Order /> },
      { path: '/vision', element: <Vision /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

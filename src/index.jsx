import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import Vision from './pages/Vision';
import AuthKakao from './pages/AuthKakao';
import Trade from './pages/Trade';
import Orderbook from './pages/Orderbook';
import TradeHistory from './pages/TradeHistory';
import Chart from './pages/Chart';
import ProtectedRoute from './pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <SignIn /> },
      { path: '/auth', element: <AuthKakao /> },
      {
        path: '/home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trade',
        element: (
          <ProtectedRoute>
            <Trade />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trade/orderbook',
        element: (
          <ProtectedRoute>
            <Orderbook />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trade/tradeHistory',
        element: (
          <ProtectedRoute>
            <TradeHistory />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trade/chart',
        element: (
          <ProtectedRoute>
            <Chart />
          </ProtectedRoute>
        ),
      },
      {
        path: '/vision',
        element: (
          <ProtectedRoute>
            <Vision />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);

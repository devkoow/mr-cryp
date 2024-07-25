import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';

export default function ProtectedRoute({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken && !refreshToken) {
      setOpen(true);
      setMessage('로그인을 해주세요');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else if (!accessToken && refreshToken) {
      setOpen(true);
      setMessage('다시 로그인 해주세요');
    }
  }, [accessToken, refreshToken, navigate]);

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}

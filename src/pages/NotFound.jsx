import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>제작되지 않은 페이지입니다</h1>
      <button onClick={() => navigate(-1)}>
        <h1>이전 페이지</h1>
      </button>
    </Box>
  );
}

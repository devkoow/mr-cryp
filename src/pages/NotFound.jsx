import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { DescriptionTypo, NGTypo } from '../defaultTheme';

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
      <DescriptionTypo>제작되지 않은 페이지입니다</DescriptionTypo>
      <Button onClick={() => navigate(-1)}>
        <NGTypo>이전 페이지</NGTypo>
      </Button>
    </Box>
  );
}

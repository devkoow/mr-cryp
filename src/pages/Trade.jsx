import React from 'react';
import { Box } from '@mui/material';
import { DescTypography } from '../defaultTheme';

export default function Trade() {
  return (
    <Box display="flex" justifyContent="center">
      <DescTypography>위에서 거래 메뉴를 선택해주세요</DescTypography>
    </Box>
  );
}

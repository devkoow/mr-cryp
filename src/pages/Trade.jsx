import React from 'react';
import { Box } from '@mui/material';
import { DescTypography } from '../defaultTheme';
import { globalColors } from '../globalColors';

export default function Trade() {
  return (
    <Box display="flex" justifyContent="center">
      <DescTypography
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
        }}
      >
        위에서 거래 메뉴를 선택해주세요
      </DescTypography>
    </Box>
  );
}

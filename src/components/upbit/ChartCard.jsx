import React from 'react';
import { Box, Typography } from '@mui/material';

export default function ChartCard({ code }) {
  return (
    <Box sx={{ width: '610px', height: '400px' }}>
      <Typography variant="h6">{code}</Typography>
    </Box>
  );
}

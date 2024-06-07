import React from 'react';
import Videos from '../components/Videos';
import Typography from '@mui/material/Typography';
import Information from '../components/Information';

export default function Vision() {
  return (
    <>
      <Typography>가상자산 관련 정보</Typography>
      <Information />
      <Videos />
      {/* 기사 컴포넌트 */}
    </>
  );
}

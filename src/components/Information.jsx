import React, { memo } from 'react';
import Grid from '@mui/material/Grid';

/** 가상 자산 관련 정보 영상 
 - iFrame 사용
 - 코인 초보를 위한 자료 영상 첨부
*/
const Information = () => {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 4 }}>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/5dkaMkcTgNA"
          allowFullScreen
          title="초등학생도 이해하는 비트코인 원리"
        ></iframe>
      </Grid>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/V7moeujHDGY"
          allowFullScreen
          title="업비트 사용법"
        ></iframe>
      </Grid>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/KSsA92e0GK8"
          allowFullScreen
          title="코인 차트 보는법"
        ></iframe>
      </Grid>
    </Grid>
  );
};

export default memo(Information);

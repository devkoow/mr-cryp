import React from 'react';
import Grid from '@mui/material/Grid';

/** 가상 자산 관련 정보 영상 
 - iFrame을 사용한 고정 영상
*/
export default function Information() {
  return (
    <Grid container spacing={2} sx={{ marginTop: 2, marginBottom: 4 }}>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/5dkaMkcTgNA"
          allowFullScreen
          title="Video 1"
        ></iframe>
      </Grid>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/V7moeujHDGY"
          allowFullScreen
          title="Video 2"
        ></iframe>
      </Grid>
      <Grid item xs={12} sm={4}>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/KSsA92e0GK8"
          allowFullScreen
          title="Video 3"
        ></iframe>
      </Grid>
    </Grid>
  );
}

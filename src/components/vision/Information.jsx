import React, { memo } from 'react';
import Grid from '@mui/material/Grid';

function IFrame({ src, title }) {
  return (
    <iframe
      width="100%"
      height="315"
      src={src}
      allowFullScreen
      title={title}
    ></iframe>
  );
}

const Information = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
      <Grid item xs={12} sm={4}>
        <IFrame
          src={'https://www.youtube.com/embed/5dkaMkcTgNA'}
          title={'초등학생도 이해하는 비트코인 원리'}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <IFrame
          src={'https://www.youtube.com/embed/V7moeujHDGY'}
          title={'업비트 사용법'}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <IFrame
          src={'https://www.youtube.com/embed/KSsA92e0GK8'}
          title={'코인 차트 보는법'}
        />
      </Grid>
    </Grid>
  );
};

export default memo(Information);

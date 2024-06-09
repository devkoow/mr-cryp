import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOpenApi } from '../context/OpenApiContext';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

function VideoCard(props) {
  const { loading = false } = props; // 기본적으로 loading = false
  const { youtube } = useOpenApi();

  const {
    isPending,
    isError,
    data: videos,
    error,
  } = useQuery({
    queryKey: ['videos'],
    queryFn: () => {
      return youtube.useMock('코인 추천');
    },
    staleTime: 1000 * 60 * 10,
  });

  if (isPending) {
    // 로딩 애니메이션으로 교체
    return <span>Loading...</span>;
  }

  if (isError) {
    // 에러 메세지
    return <span>에러 발생 : {error}</span>;
  }

  return (
    <>
      <Grid container spacing={1}>
        {(loading ? Array.from(new Array(3)) : videos).map((video) => (
          <Grid item xs={4} key={video.id}>
            <Box key={video.id} sx={{ width: 100, marginRight: 0.5, my: 3 }}>
              {video ? (
                <img
                  style={{ width: 100, height: 65 }}
                  alt={video.snippet.title}
                  src={video.snippet.thumbnails.default.url}
                />
              ) : (
                <Skeleton variant="rectangular" width={210} height={118} />
              )}

              {video ? (
                <Box sx={{ pr: 2 }}>
                  <Typography gutterBottom variant="body2">
                    {video.snippet.title}
                  </Typography>
                  <Typography
                    display="block"
                    variant="caption"
                    color="text.secondary"
                  >
                    {video.snippet.channelTitle}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {`${video.snippet.publishTime}`}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ pt: 0.5 }}>
                  <Skeleton />
                  <Skeleton width="60%" />
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

VideoCard.propTypes = {
  loading: PropTypes.bool,
};

export default function Videos() {
  return (
    <>
      <Typography>최신 트렌드🔥</Typography>
      <VideoCard />
    </>
  );
}

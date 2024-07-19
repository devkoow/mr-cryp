import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOpenApi } from '../context/OpenApiContext';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { DescTypography } from '../defaultTheme';
import { globalColors } from '../globalColors';

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
      return youtube.search('코인 추천');
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
    <Grid container spacing={1}>
      {(loading ? Array.from(new Array(3)) : videos).map((video) => (
        <Grid item xs={4} md={6} key={video.id}>
          <Box
            key={video.id}
            sx={{ width: 350, marginRight: 0.5, marginTop: 3 }}
          >
            {video ? (
              <img
                style={{ width: 350, height: 210 }}
                alt={video.snippet.title}
                src={video.snippet.thumbnails.default.url}
                onClick={() => {
                  console.log(video.id.videoId);
                  window.open(
                    `https://www.youtube.com/watch?v=${video.id}`,
                    '_blank'
                  );
                }}
              />
            ) : (
              <Skeleton variant="rectangular" width={210} height={130} />
            )}
            {video ? (
              <Box sx={{ pr: 2 }}>
                <DescTypography
                  gutterBottom
                  variant="body2"
                  fontWeight={'bold'}
                >
                  {video.snippet.title
                    .replace(/&quot;/g, '')
                    .replace(/&#39;/g, '')}
                </DescTypography>
                <DescTypography
                  display="block"
                  variant="caption"
                  color={globalColors.white}
                  fontWeight={'bold'}
                  sx={{ textShadow: '1px 1px 2px black' }}
                >
                  {video.snippet.channelTitle}
                </DescTypography>
                <DescTypography variant="caption" color="text.secondary">
                  {`${video.snippet.publishTime}`}
                </DescTypography>
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
  );
}

VideoCard.propTypes = {
  loading: PropTypes.bool,
};

export default function Videos() {
  return (
    <Box sx={{ marginBottom: 10 }}>
      <DescTypography
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        TREND 🔥
      </DescTypography>
      <DescTypography
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        코인에 대한 실시간 트렌드를 확인해보세요!
      </DescTypography>
      <VideoCard />
    </Box>
  );
}

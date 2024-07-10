import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOpenApi } from '../context/OpenApiContext';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  Grid,
} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import IosShareIcon from '@mui/icons-material/IosShare';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import { DescTypography, theme } from '../defaultTheme';
import { globalColors } from '../globalColors';

export default function Articles() {
  const { naver } = useOpenApi();
  const {
    isPending,
    isError,
    data: articles,
    error,
  } = useQuery({
    queryKey: ['articles'],
    queryFn: () => {
      return naver.useMock('비트코인');
    },
    staleTime: 1000 * 60 * 10,
  });
  const [open, setOpen] = useState(false);

  if (isPending) {
    // 로딩 애니메이션으로 교체
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>에러 발생 : {error}</span>;
  }

  const handleOpen = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <DescTypography
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
          fontSize: '24px',
        }}
      >
        TODAY NEWS
      </DescTypography>
      <DescTypography
        sx={{
          color: globalColors.white,
          textShadow: '1px 1px 2px black',
          fontWeight: 'bold',
          fontSize: '16px',
        }}
      >
        오늘은 어떤 뉴스가 올라왔을까요?
      </DescTypography>
      <Grid container spacing={2}>
        {articles.map((article) => {
          const title = article.title
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');
          const description = article.description
            .replace(/<b>|<\/b>/g, '')
            .replace(/&quot;/g, '');
          return (
            <Grid item xs={12} sm={6} key={article.link}>
              <Card
                key={article.link}
                sx={{
                  marginTop: 3,
                  backgroundColor: globalColors.vanilla['200'],
                  height: '250px',
                  position: 'relative',
                }}
              >
                <CardHeader
                  avatar={<ArticleRoundedIcon sx={{ fontSize: 30 }} />}
                  title={
                    <DescTypography
                      sx={{
                        color: globalColors.black,
                        textShadow: '1px 1px 2px black',
                        fontWeight: 'bold',
                      }}
                    >
                      {title}
                    </DescTypography>
                  }
                />
                <CardContent>
                  <DescTypography
                    variant="body2"
                    color="text.secondary"
                    fontSize="12px"
                  >
                    {description}
                  </DescTypography>
                </CardContent>
                <CardActions
                  sx={{ position: 'absolute', bottom: 0, width: '100%' }}
                >
                  <Tooltip title="기사로 이동">
                    <IconButton aria-label="add to favorites">
                      <IosShareIcon
                        sx={{ color: theme.palette.primary.dark }}
                        onClick={() => window.open(article.link, '_blank')}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="링크 복사">
                    <IconButton aria-label="share">
                      <LinkIcon
                        sx={{ color: globalColors.skyblue['500'] }}
                        onClick={() => handleOpen(article.link)}
                      />
                    </IconButton>
                  </Tooltip>

                  <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                  >
                    <Alert
                      onClose={handleClose}
                      severity="success"
                      variant="filled"
                    >
                      링크가 클립보드에 복사되었습니다!
                    </Alert>
                  </Snackbar>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

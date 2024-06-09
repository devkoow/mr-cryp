import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useOpenApi } from '../context/OpenApiContext';

import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from '@mui/material';

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
      <Typography>코인 관련 기사들</Typography>
      {articles.map((article) => (
        <Card key={article.link}>
          <CardHeader title={article.title} subheader={article.pubDate} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {article.description}
            </Typography>
          </CardContent>
          <Button href={article.link} target="_blank" rel="noopener noreferrer">
            기사 읽기
          </Button>
        </Card>
      ))}
    </>
  );
}

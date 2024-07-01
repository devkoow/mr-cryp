import React from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { useQuery } from '@tanstack/react-query';

export default function MarketCode() {
  const { upbit } = useOpenApi();
  const {
    isPending,
    isError,
    data: tickers,
    error,
  } = useQuery({
    queryKey: ['tickers'],
    queryFn: () => {
      return upbit.marketCode();
    },
    staleTime: 1000 * 60 * 5,
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
      <table>
        <tbody>
          {tickers.length > 0 &&
            tickers.map((ticker, idx) => {
              return (
                <tr key={ticker.market}>
                  <td>{idx + 1}</td>
                  <td>{ticker.market}</td>
                  <td>{ticker.korean_name}</td>
                  <td>{ticker.english_name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

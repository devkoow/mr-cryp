import React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { theme } from '../../defaultTheme';
import { globalColors } from '../../globalColors';

export default function AccountBox({ balance }) {
  const palette = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    globalColors.jade['400'],
  ];
  const pieParams = { width: 500, height: 250 };

  return (
    <PieChart
      colors={palette}
      series={[
        {
          data:
            balance &&
            balance.map((item, index) => {
              if (index === 0) {
                return {
                  id: item.currency,
                  value: item.balance,
                  label: '현금(원화)',
                };
              } else {
                return {
                  id: item.unit_currency + '-' + item.currency,
                  value: item.balance * item.avg_buy_price,
                  label: item.unit_currency + '-' + item.currency,
                };
              }
            }),
          highlightScope: { faded: 'global', highlighted: 'item' },
          faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
        },
      ]}
      {...pieParams}
    />
  );
}

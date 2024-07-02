import React, { useState, useEffect } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { Box } from '@mui/material';
import { globalColors } from '../../globalColors';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
indicators(Highcharts);
Highcharts.setOptions({
  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '',
  },
  time: {
    useUTC: false,
  },
});

export default function ChartCard({ code }) {
  const { upbit } = useOpenApi();
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const fetchCandles = async (type, count) => {
      const candles = await upbit.candleWeeks(code, 200);
      if (candles) {
        candles.sort((a, b) => a.timestamp - b.timestamp);
        const ohlc = candles.map((candle) => [
          candle.timestamp,
          candle.opening_price,
          candle.high_price,
          candle.low_price,
          candle.trade_price,
        ]);
        const minTimestamp = ohlc[0][0];
        const maxTimestamp = ohlc[ohlc.length - 1][0];
        const volume = candles.map((candle) => ({
          x: candle.timestamp,
          y: candle.candle_acc_trade_volume,
          color:
            candle.opening_price <= candle.trade_price
              ? globalColors.color_neg
              : globalColors.color_pos,
        }));
        setOptions((prevOptions) => ({
          ...prevOptions,
          chart: {
            width: 520,
            height: 400,
            zooming: {
              mouseWheel: false,
            },
          },
          lang: {
            thousandsSep: ',',
          },
          accessibility: {
            enabled: false,
          },
          credits: {
            enabled: false,
          },
          navigator: {
            enabled: false,
          },
          rangeSelector: {
            allButtonsEnabled: true,
            inputEnabled: false,
            buttons: [
              {
                text: '1분봉',
                events: {
                  click: () => fetchCandles('1min', 200),
                },
              },
              {
                text: '5분봉',
                events: {
                  click: () => fetchCandles('5min', 200),
                },
              },
              {
                text: '일봉',
                events: {
                  click: () => fetchCandles('days', 200),
                },
              },
              {
                text: '주봉',
                events: {
                  click: () => fetchCandles('weeks', 200),
                },
              },
              {
                text: '월봉',
                events: {
                  click: () => fetchCandles('months', 200),
                },
              },
            ],
          },
          yAxis: [
            {
              // y축 레이블
              labels: {
                align: 'right',
                x: -3,
                formatter: function () {
                  return Highcharts.numberFormat(
                    Number(this.value),
                    0,
                    '',
                    ','
                  );
                },
              },
              height: '80%',
              lineWidth: 2,
              // 십자선
              crosshair: {
                snap: false,
              },
            },
            {
              labels: {
                align: 'right',
                x: -3,
              },
              top: '80%',
              height: '20%',
              offset: 0,
              lineWidth: 2,
            },
          ],
          xAxis: {
            min: minTimestamp,
            max: maxTimestamp,
          },
          plotOptions: {
            candlestick: {
              color: globalColors.color_neg['400'],
              upColor: globalColors.color_pos['400'],
            },
            sma: {
              linkedTo: 'upbit',
              lineWidth: 0.8,
              zIndex: 1,
              marker: {
                enabled: false,
              },
              enableMouseTracking: false,
            },
          },
          series: [
            {
              type: 'candlestick',
              name: code,
              id: 'upbit',
              data: ohlc,
            },
            {
              type: 'sma',
              params: {
                period: 15,
              },
              color: 'red',
            },
            {
              type: 'sma',
              params: {
                period: 50,
              },
              color: 'lightGreen',
            },
            {
              type: 'column',
              name: 'Volume',
              data: volume,
              yAxis: 1,
            },
          ],
          tooltip: {
            style: {
              fontSize: '10px',
            },
            backgroundColor: globalColors.tooltip_bgColor,
            borderWidth: 0,
            shadow: false,
          },
        }));
      }
    };
    fetchCandles();
  }, [code, upbit]);

  return (
    <Box>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </Box>
  );
}

import React, { useEffect, useState } from 'react';
import { useOpenApi } from '../../context/OpenApiContext';
import { globalColors } from '../../globalColors';
import { Box } from '@mui/material';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
indicators(Highcharts);

Highcharts.setOptions({
  global: {
    useUTC: false,
    buttonTheme: {
      fill: '#f788bc',
      stroke: 'ffffff',
    },
  },

  lang: {
    thousandsSep: ',',
    rangeSelectorZoom: '',
  },
});

const initialOptions = {
  chart: {
    width: 520,
    height: 400,
    zooming: {
      mouseWheel: false,
    },
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
  },

  yAxis: [
    {
      labels: {
        align: 'right',
        x: -3,
        formatter: function () {
          return Highcharts.numberFormat(Number(this.value), 0, '', ',');
        },
      },
      height: '80%',
      lineWidth: 2,
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

  plotOptions: {
    candlestick: {
      color: globalColors.color_neg['400'],
      upColor: globalColors.color_pos['400'],
    },
    // sma = 이동평균선
    sma: {
      linkedTo: 'aapl',
      lineWidth: 0.8, // 두께
      zIndex: 1,
      color: globalColors.hotpink['300'],
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
    },
  },
  // 툴팁
  tooltip: {
    style: {
      fontSize: '10px',
    },
    backgroundColor: globalColors.tooltip_bgColor,
    borderWidth: 0,
    shadow: false,
  },
};

export default function ChartCard({ code }) {
  const { upbit } = useOpenApi();
  const [options, setOptions] = useState(initialOptions);
  const [candles, setCandles] = useState([]);
  // 캔들 범위 셀렉터에 따라 데이터 선택
  // 1분봉, 5분봉, 10분봉, 일봉, 주봉, 월봉
  const handlePeriod = (period) => async () => {
    let fetchedCandle;
    switch (period) {
      case '1min':
      case '5min':
      case '10min':
        const unit = period.replace('min', '');
        fetchedCandle = await upbit.candleMinutes(unit, code, 120);
        setCandles(fetchedCandle);
        break;
      case 'days':
        fetchedCandle = await upbit.candleDays(code, 120);
        setCandles(fetchedCandle);
        break;
      case 'weeks':
        fetchedCandle = await upbit.candleWeeks(code, 120);
        setCandles(fetchedCandle);
        break;
      case 'months':
        fetchedCandle = await upbit.candleMonths(code, 120);
        setCandles(fetchedCandle);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    setOptions({
      rangeSelector: {
        buttons: [
          {
            text: '1분봉',
            events: {
              click: handlePeriod('1min'),
            },
          },
          {
            text: '5분봉',
            events: {
              click: handlePeriod('5min'),
            },
          },
          {
            text: '10분봉',
            events: {
              click: handlePeriod('10min'),
            },
          },
          {
            text: '일봉',
            events: {
              click: handlePeriod('days'),
            },
          },
          {
            text: '주봉',
            events: {
              click: handlePeriod('weeks'),
            },
          },
          {
            text: '월봉',
            events: {
              click: handlePeriod('months'),
            },
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    console.log('캔들 데이터', candles);
    if (candles.length > 0) {
      const ohlc = [];
      const volume = [];
      candles.forEach((candle) => {
        ohlc.push([
          Date.parse(candle.candle_date_time_kst),
          candle.opening_price,
          candle.high_price,
          candle.low_price,
          candle.trade_price,
        ]);

        volume.push({
          x: Date.parse(candle.dateTimeKst),
          y: candle.candle_acc_trade_volume,
          color:
            candle.opening_price === candle.trade_price
              ? globalColors.black
              : candle.opening_price > candle.trade_price
              ? globalColors.color_pos['400']
              : globalColors.color_neg['400'],
        });
      });

      setOptions({
        series: [
          {
            type: 'candlestick',
            name: code,
            id: 'aapl',
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
      });
    }
  }, [code, upbit, candles]);

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

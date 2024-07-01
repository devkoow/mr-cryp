import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import indicators from 'highcharts/indicators/indicators';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCandleData, loadPrevCandleData } from '../../store/modules/coin';
import styled from 'styled-components';

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
const initialOptions = {
  chart: {
    width: 990,
    height: 450,
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
      color: '#1976d2',
      upColor: '#c84a31',
    },
    sma: {
      linkedTo: 'aapl',
      lineWidth: 0.8,
      zIndex: 1,
      marker: {
        enabled: false,
      },
      enableMouseTracking: false,
    },
  },
  tooltip: {
    style: {
      fontSize: '10px',
    },
    backgroundColor: 'rgba(255,255,255, 0.8)',
    borderWidth: 0,
    shadow: false,
  },
};

export default function MainChart() {
  const dispatch = useDispatch();
  const chartComponentRef = useRef(null);
  const [options, setOptions] = useState(initialOptions);
  const market = useSelector((state) => state.coin.selectedCoin.market);
  const candles = useSelector((state) => state.coin.candles);
  const loadCandleDataLoading = useSelector(
    (state) => state.coin.loadCandleDataLoading
  );

  const loadPrevCandleDataLoading = useSelector(
    (state) => state.coin.loadPrevCandleDataLoading
  );

  const handleClick = (type) => (e) => {
    dispatch(changeCandleData({ type }));
    return false;
  };

  useEffect(() => {
    setOptions({
      rangeSelector: {
        buttons: [
          {
            text: '일봉',
            events: {
              click: handleClick('days'),
            },
          },
          {
            text: '주봉',
            events: {
              click: handleClick('weeks'),
            },
          },
          {
            text: '월봉',
            events: {
              click: handleClick('months'),
            },
          },
          {
            text: '1분봉',
            events: {
              click: handleClick('1minutes'),
            },
          },
          {
            text: '5분봉',
            events: {
              click: handleClick('5minutes'),
            },
          },
          {
            text: '10분봉',
            events: {
              click: handleClick('10minutes'),
            },
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    if (chartComponentRef.current) {
      if (loadPrevCandleDataLoading || loadCandleDataLoading) {
        chartComponentRef.current.chart.showLoading();
        return;
      }
      chartComponentRef.current.chart.hideLoading();
    }
  }, [loadPrevCandleDataLoading, loadCandleDataLoading]);

  useEffect(() => {
    if (chartComponentRef.current && candles.datas.length > 0) {
      if (candles.datas.length < 120) {
        chartComponentRef.current.chart.xAxis[0].setExtremes(
          undefined,
          undefined
        );
        return;
      }
      chartComponentRef.current.chart.xAxis[0].setExtremes(
        Date.parse(candles.datas[candles.datas.length - 120].dateTimeKst),
        undefined
      );
    }
  }, [candles]);

  useEffect(() => {
    if (candles.datas.length > 0) {
      const ohlc = [];
      const volume = [];
      candles.datas.forEach((candle) => {
        ohlc.push([
          Date.parse(candle.dateTimeKst),
          candle.openingPrice,
          candle.highPrice,
          candle.lowPrice,
          candle.tradePrice,
        ]);

        volume.push({
          x: Date.parse(candle.dateTimeKst),
          y: candle.accTradeVolume,
          color:
            candle.openingPrice <= candle.tradePrice ? '#c84a31' : '#1976d2',
        });
      });

      setOptions({
        xAxis: {
          events: {
            setExtremes: function (e) {
              if (e.min === Date.parse(candles.datas[0].dateTimeKst)) {
                dispatch(loadPrevCandleData());
              }
            },
          },
        },
        series: [
          {
            type: 'candlestick',
            name: market,
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
  }, [candles]);

  return (
    <Wrapper>
      <HighchartsReact
        ref={chartComponentRef}
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={options}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-bottom: 10px;
`;

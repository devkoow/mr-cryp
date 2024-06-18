import axios from 'axios';

/** 업비트 REST API, WebSocket API 사용
 - REST API
      - QUOTATION 
      - tickers : 거래 가능한 마켓 코드
      - candleMinutes : 분봉 데이터
      - candleDays : 일봉 데이터
      - candleWeeks : 주봉 데이터
      - candleMonths : 월봉 데이터
 
      - EXCHANGE
      - myAccounts : 내 계좌 조회
      - orderedOne : 개별 주문 조회

 - WebSocket API
      - realTimePrice : 실시간 현재가 정보 -> useWsTicker
      - tradeHistory : 실시간 체결 내역 -> useWsTrade
      - orderbook : 실시간 오더북(호가정보 조회) -> useWsOrderbook
 */
export default class Upbit {
  constructor() {
    this.getData = axios.create({
      baseURL: 'https://api.upbit.com/v1',
      headers: { accept: 'application/json' },
    });
  }

  async marketCode() {
    try {
      const response = await this.getData.get('/market/all?isDetails=false');
      return response.data.slice(0, 100);
    } catch (error) {
      console.log('거래 가능 마켓 코드 다운로드 중 에러 : ', error);
    }
  }

  async realTimePrice(market) {
    try {
      const response = await this.getData.get(`/ticker/?markets=${market}`);
      return response.data[0];
    } catch (error) {
      console.log('실시간 가격 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async tradeHistory(market) {
    try {
      const response = await this.getData.get(
        `/trades/ticks?market=${market}`,
        {
          params: {
            count: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('실시간 체결 내역 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async orderbook(markets) {
    try {
      const marketParam = markets.join('&markets=');
      const response = await this.getData.get(
        `/orderbook?markets=${marketParam}`
      );
      return response.data;
    } catch (error) {
      console.log('실시간 오더북 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async candleMinutes(unit, market) {
    try {
      const response = await this.getData.get(
        `/candles/minutes/${unit}?market=${market}`,
        {
          params: {
            count: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('분봉 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async candleDays(market) {
    try {
      const response = await this.getData.get(
        `/candles/days?market=${market}`,
        {
          params: {
            count: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('일봉 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async candleWeeks(market) {
    try {
      const response = await this.getData.get(
        `/candles/weeks?market=${market}`,
        {
          params: {
            count: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('주봉 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async candleMonths(market) {
    try {
      const response = await this.getData.get(
        `/candles/months?market=${market}`,
        {
          params: {
            count: 1,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.log('월봉 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }
}

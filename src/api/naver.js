import axios from 'axios';

/** 네이버 검색 API를 이용하여 뉴스 데이터 검색
 - getArticle() : 실제 API 사용
 - useMock() : 따로 저장해놓은 데이터 사용
 */
export default class Naver {
  constructor() {
    this.getData = axios.create({
      baseURL: '/v1/search/news.json?',
      params: {
        display: 15,
        start: 1,
        sort: 'sim',
      },
    });
  }

  async getArticle(keyword) {
    try {
      const response = await axios.get({
        params: {
          query: encodeURIComponent(keyword),
        },
        headers: {
          'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET,
          Accept: '*/*',
        },
      });
      console.log(response.data.items);
      return response.data.items;
    } catch (error) {
      console.error('네이버 API 호출 오류 : ', error);
      return Promise.reject(error);
    }
  }

  async useMock() {
    try {
      const response = await axios.get('/data/article.json');
      return response.data.items;
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

import axios from 'axios';

/** 네이버 검색 API를 사용
 - getArticle() : 실제 API 사용
 - useMock() : 따로 저장해놓은 데이터 'article.json' 사용
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
          'X-Naver-Client-Id': import.meta.env.VITE_NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': import.meta.env.VITE_NAVER_CLIENT_SECRET,
          Accept: '*/*',
        },
      });
      console.log(response.data.items);
      return response.data.items;
    } catch (error) {
      console.log('네이버 뉴스 기사 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async useMock() {
    try {
      const response = await axios.get('/data/article.json');
      return response.data.items;
    } catch (error) {
      console.log('네이버 json 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }
}

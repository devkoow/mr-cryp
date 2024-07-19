import axios from 'axios';

/** 유튜브 데이터 API 클래스
 - search() : 실제 API 사용
 - useMock() : 따로 저장해놓은 데이터 'trend.json' 사용
 */
export default class Youtube {
  constructor() {
    this.getData = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: import.meta.env.VITE_YOUTUBE_DATA_API_KEY,
      },
    });
  }

  async search(keyword) {
    try {
      const response = await this.getData.get('search', {
        params: {
          part: 'snippet',
          maxResults: 12,
          type: 'video',
          q: keyword,
        },
      });
      const items = response.data.items;
      return items.map((item) => ({ ...item, id: item.id.videoId }));
    } catch (error) {
      console.log('유튜브 검색 결과 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }

  async useMock() {
    try {
      const response = await axios.get('/data/trend.json');
      const items = response.data.items;
      return items.map((item) => ({ ...item, id: item.id.videoId }));
    } catch (error) {
      console.log('유튜브 목데이터 다운로드 중 에러 : ', error);
      return Promise.reject(error);
    }
  }
}

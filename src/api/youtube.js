import axios from 'axios';

/** 유튜브 데이터 API 클래스
 - search() : 실제 API 사용
 - useMock() : 따로 저장해놓은 데이터 사용
 */
export default class Youtube {
  constructor() {
    this.getData = axios.create({
      baseURL: 'https://www.googleapis.com/youtube/v3',
      params: {
        key: process.env.REACT_APP_YOUTUBE_DATA_API_KEY,
      },
    });
  }

  async search(keyword) {
    try {
      const response = await this.getData.get('search', {
        params: {
          part: 'snippet',
          maxResults: 18,
          type: 'video',
          q: keyword,
        },
      });
      const items = response.data.items;
      return items.map((item) => ({ ...item, id: item.id.videoId }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async useMock() {
    try {
      const response = await axios.get('/data/trend.json');
      const items = response.data.items;
      return items.map((item) => ({ ...item, id: item.id.videoId }));
    } catch (e) {
      return Promise.reject(e);
    }
  }
}

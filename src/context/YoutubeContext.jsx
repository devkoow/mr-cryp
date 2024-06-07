import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';

const youtube = new Youtube();

export const YoutubeApiContext = createContext();
export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}

export function useYoutubeApi() {
  return useContext(YoutubeApiContext);
}

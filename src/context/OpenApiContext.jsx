import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import Naver from '../api/naver';

const youtube = new Youtube();
const naver = new Naver();

export const OpenApiContext = createContext();
export function OpenApiProvider({ children }) {
  return (
    <OpenApiContext.Provider value={{ youtube, naver }}>
      {children}
    </OpenApiContext.Provider>
  );
}

export function useOpenApi() {
  return useContext(OpenApiContext);
}

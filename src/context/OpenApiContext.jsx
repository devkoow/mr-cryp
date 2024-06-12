import { createContext, useContext } from 'react';
import Youtube from '../api/youtube';
import Naver from '../api/naver';
import Upbit from '../api/upbit';

const youtube = new Youtube();
const naver = new Naver();
const upbit = new Upbit();

export const OpenApiContext = createContext();
export function OpenApiProvider({ children }) {
  return (
    <OpenApiContext.Provider value={{ youtube, naver, upbit }}>
      {children}
    </OpenApiContext.Provider>
  );
}

export function useOpenApi() {
  return useContext(OpenApiContext);
}

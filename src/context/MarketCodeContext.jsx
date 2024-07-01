import React, { createContext, useState, useEffect } from 'react';

export const MarketCodeContext = createContext();

export function MarketCodeProvider({ children }) {
  const [marketCode, setMarketCode] = useState('KRW-BTC');

  useEffect(() => {
    console.log(
      'Current marketCode:',
      marketCode,
      ', Type:',
      typeof marketCode
    );
  }, [marketCode]);

  return (
    <MarketCodeContext.Provider value={{ marketCode, setMarketCode }}>
      {children}
    </MarketCodeContext.Provider>
  );
}

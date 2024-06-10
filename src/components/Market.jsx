import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Market() {
  let [coins, setCoins] = useState([]);
  const baseURL = 'https://api.upbit.com/v1/market/all?isDetails=false';

  useEffect(() => {
    const getMarket = async () => {
      try {
        const response = await axios.get(baseURL, {
          headers: { accept: 'application/json' },
        });
        console.log(response.data.slice(0, 100));
        setCoins(response.data.slice(0, 100));
      } catch (error) {
        console.error(error);
      }
    };
    getMarket();
  }, []);

  return (
    <>
      거래 가능한 종목 상위 100개
      <table>
        <tbody>
          {coins.length > 0 &&
            coins.map((coin, idx) => {
              return (
                <tr key={coin.market}>
                  <td>{idx + 1}</td>
                  <td>{coin.market}</td>
                  <td>{coin.korean_name}</td>
                  <td>{coin.english_name}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

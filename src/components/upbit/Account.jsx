import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@mui/system';
import { KJUR } from 'jsrsasign';

export default function Account() {
  const [account, setAccount] = useState([]);
  const accessKey = process.env.REACT_APP_UPBIT_OPEN_API_ACCESS_KEY;
  const secretKey = process.env.REACT_APP_UPBIT_OPEN_API_SECRET_KEY;
  const payload = {
    access_key: accessKey,
    nonce: uuidv4(),
  };

  const header = { alg: 'HS256', typ: 'JWT' };
  const sHeader = JSON.stringify(header);
  const sPayload = JSON.stringify(payload);
  const sSecret = secretKey;

  const sJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sSecret);

  useEffect(() => {
    // console.log('토큰 헤더: ', sHeader);
    // console.log('토큰 페이로드: ', sPayload);
    // console.log('토큰 시크릿: ', sSecret);
    // console.log('JWT: ', sJWT);
    const myAccount = async () => {
      try {
        const response = await axios.get('https://api.upbit.com/v1/accounts', {
          headers: {
            Authorization: `Bearer ${sJWT}`,
          },
        });
        if (response) {
          console.log(response);
          setAccount(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    myAccount();
  }, [sJWT]);

  return <Box>{account}</Box>;
}

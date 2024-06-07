import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <h1>제작되지 않은 페이지입니다</h1>
      <button onClick={() => navigate('/home')}>홈으로 이동</button>
    </>
  );
}

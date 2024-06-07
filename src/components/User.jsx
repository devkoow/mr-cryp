import React from 'react';
import Avatar from '@mui/material/Avatar';

export default function User() {
  const imgUrl = localStorage.getItem('imgUrl');
  return (
    <Avatar
      alt="프로필 이미지"
      src={imgUrl}
      sx={{ '&:hover': { opacity: 0.5, transition: 'opacity 0.3s ease' } }}
    />
  );
}

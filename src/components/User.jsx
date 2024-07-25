import React from 'react';
import { Avatar, Box, Modal } from '@mui/material';
import { NGTypo } from '../defaultTheme';

export default function User({ open, handleClose }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          '@media (max-width:1000px)': {
            width: '80%',
          },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Avatar
          alt="프로필 이미지"
          src={localStorage.getItem('imgUrl')}
          sx={{
            width: '100px',
            height: '100px',
            '&:hover': { opacity: 0.5, transition: 'opacity 0.3s ease' },
            '@media (max-width:450px)': {
              width: '60px',
              height: '60px',
            },
            '@media (max-width:175px)': {
              display: 'none',
            },
          }}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center ',
            marginRight: 5,
            gap: 4,
          }}
        >
          <NGTypo
            fontSize={24}
            fontWeight={'bold'}
            sx={{
              '@media (max-width:450px)': {
                fontSize: 16,
              },
            }}
          >
            {localStorage.getItem('nickname')}
          </NGTypo>
          <NGTypo
            sx={{
              '@media (max-width:200px)': {
                display: 'none',
              },
            }}
          >
            {localStorage.getItem('socialType') === 'Google'
              ? '구글 계정'
              : '카카오 계정'}
          </NGTypo>
        </Box>
      </Box>
    </Modal>
  );
}

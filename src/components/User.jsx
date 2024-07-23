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
          <NGTypo fontSize={24} fontWeight={'bold'}>
            {localStorage.getItem('nickname')}
          </NGTypo>
          <NGTypo>
            {localStorage.getItem('socialType') === 'Google'
              ? '구글 계정'
              : '카카오 계정'}
          </NGTypo>
        </Box>
      </Box>
    </Modal>
  );
}

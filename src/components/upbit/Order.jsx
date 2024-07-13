import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Tab,
  Radio,
  TextField,
  IconButton,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { NGTypography } from '../../defaultTheme';

function TabPanels({ value, code }) {
  const [price, setPrice] = useState(0);
  const [balance, setBalance] = useState(0);
  const [accPrice, setAccPrice] = useState(0);
  const [selectedValue, setSelectedValue] = useState('a');
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState('');

  const handleRadio = (event) => {
    setSelectedValue(event.target.value);
  };
  const handlePriceIncrement = () => {
    setPrice((prevPrice) => Math.max(0, parseFloat(prevPrice) + 1000));
  };
  const handlePriceDecrement = () => {
    setPrice((prevPrice) => Math.max(0, parseFloat(prevPrice) - 1000));
  };
  const handlePriceChange = (event) => {
    if (!isNaN(event.target.value)) {
      setPrice(Math.max(0, parseFloat(event.target.value)));
    }
    if (event.target.value.length === 0) setPrice(0);
  };

  const handleBalanceIncrement = () => {
    setBalance((prevBalance) => parseFloat(prevBalance) + 1);
  };
  const handleBalanceDecrement = () => {
    setBalance((prevBalance) => parseFloat(prevBalance) - 1);
  };
  const handleBalanceChange = (event) => {
    if (!isNaN(event.target.value)) {
      setBalance(Math.max(0, parseFloat(event.target.value)));
    }
    if (event.target.value.length === 0) setBalance(0);
  };

  const handleOpen = async () => {
    try {
      if (price > 0 && balance > 0 && accPrice) {
        setSuccess('success');
      } else {
        setSuccess('error');
      }
      setOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setAccPrice(price * balance);
  }, [price, balance]);

  return (
    <>
      <TabPanel value={value}>
        <Box sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NGTypography>주문유형</NGTypography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <NGTypography>지정가</NGTypography>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <NGTypography>시장가</NGTypography>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <NGTypography>예약-지정가</NGTypography>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <NGTypography>주문가능</NGTypography>
            <NGTypography>
              {parseFloat(3000000).toLocaleString()} KRW
            </NGTypography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <NGTypography>
                {value === '1' ? '매수가격' : '매도가격'}
              </NGTypography>
              <NGTypography>(KRW)</NGTypography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                value={price}
                sx={{ width: 150 }}
                onChange={handlePriceChange}
              />
              <IconButton onClick={handlePriceDecrement}>-</IconButton>
              <IconButton onClick={handlePriceIncrement}>+</IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <NGTypography>주문수량</NGTypography>
              <NGTypography>({code})</NGTypography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                value={balance}
                sx={{ width: 150 }}
                onChange={handleBalanceChange}
              />
              <IconButton onClick={handleBalanceDecrement}>-</IconButton>
              <IconButton onClick={handleBalanceIncrement}>+</IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <NGTypography>주문총액</NGTypography>
              <NGTypography>(KRW)</NGTypography>
            </Box>
            <TextField sx={{ width: 203 }} value={accPrice} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 3,
            }}
          >
            <NGTypography fontSize={12}>최소주문 금액: 5,000 KRW</NGTypography>
            <NGTypography fontSize={12}>
              수수료(부가세 포함): 0.05%
            </NGTypography>
          </Box>
          <Button onClick={() => handleOpen()}>
            {value === '1' ? (
              <NGTypography fontWeight={'bold'}>매수</NGTypography>
            ) : (
              <NGTypography fontWeight={'bold'}>매도</NGTypography>
            )}
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={success} variant="filled">
              {success === 'success'
                ? '주문을 성공했습니다'
                : '최소주문 금액을 확인해주세요'}
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
    </>
  );
}

export default function Order({ open, handleClose, code }) {
  const [value, setValue] = useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
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
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="매수 매도 주문">
              <Tab label="매수" value="1" />
              <Tab label="매도" value="2" />
              <Tab label="거래내역" value="3" />
            </TabList>
          </Box>
          <TabPanels value="1" code={code} />
          <TabPanels value="2" code={code} />
        </TabContext>
      </Box>
    </Modal>
  );
}

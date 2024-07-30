import React, { useState, useEffect, Fragment } from 'react';
import {
  Alert,
  Radio,
  Box,
  Button,
  IconButton,
  Modal,
  Snackbar,
  Tab,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { styled } from '@mui/system';
import RestoreIcon from '@mui/icons-material/Restore';
import { NGTypo, theme, MobModalTypo } from '../../defaultTheme';
import { globalColors } from '../../globalColors';
import { useSelector } from 'react-redux';

const StyledTab = styled(Tab)({
  fontFamily: 'NEXON Lv1 Gothic OTF',
});

const textFieldStyle = {
  width: 150,
  '@media (max-width:500px)': {
    width: 80,
  },
};

const flexCenter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const resetStyle = {
  width: '100px',
  '@media (max-width:500px)': {
    width: 80,
  },
  color: theme.palette.primary.main,
  backgroundColor: globalColors.white_retro,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
  },
};

const cellStyle = {
  textAlign: 'center',
  '@media (max-width: 500px)': { fontSize: '10px' },
};

function Panel({ value, addOrder, askablePrice }) {
  const code = useSelector((state) => state.chart.code);
  const currPrice = useSelector((state) => state.chart.currPrice);
  const [selectedValue, setSelectedValue] = useState('a');
  const [price, setPrice] = useState(currPrice || 0);
  const [balance, setBalance] = useState(1);
  const [accPrice, setAccPrice] = useState(0);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState('');
  const bidableCash = 3000000;

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
    setBalance((prevBalance) => Math.max(0, parseFloat(prevBalance) + 1));
  };

  const handleBalanceDecrement = () => {
    setBalance((prevBalance) => Math.max(0, parseFloat(prevBalance) - 1));
  };

  const handleBalanceChange = (event) => {
    if (!isNaN(event.target.value)) {
      setBalance(Math.max(0, parseFloat(event.target.value)));
    }
    if (event.target.value.length === 0) setBalance(0);
  };

  const handleOpen = async () => {
    try {
      if (bidableCash > accPrice && accPrice > 0) {
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

  const handleReset = () => {
    setPrice(0);
    setBalance(1);
    setAccPrice(0);
  };

  const handleOrder = () => {
    try {
      if (bidableCash > accPrice && accPrice > 0) {
        const orderType = value === '1' ? '매수' : '매도';
        const newOrder = {
          orderTime: new Date().toLocaleString(),
          marketName: code,
          type: orderType,
          unitPrice: price,
          orderPrice: accPrice,
          orderQuantity: balance,
          unfilledQuantity: balance,
        };
        addOrder(newOrder);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    handleOrder();
    handleOpen();
    handleReset();
  };

  useEffect(() => {
    setAccPrice(price * balance);
  }, [price, balance]);

  return (
    <>
      <TabPanel value={value}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* 모바일 주문유형 */}
          <Box
            sx={{
              display: 'none',
              '@media (max-width:500px)': {
                display: 'block',
              },
            }}
          >
            <Box sx={{ ...flexCenter, flexDirection: 'column' }}>
              <Box sx={{ ...flexCenter, gap: 2 }}>
                <MobModalTypo>지정가</MobModalTypo>
                <MobModalTypo>시장가</MobModalTypo>
                <MobModalTypo>예약-지정가</MobModalTypo>
              </Box>
              <Box sx={{ ...flexCenter, gap: 2 }}>
                <Radio
                  checked={selectedValue === 'a'}
                  onChange={handleRadio}
                  value="a"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '지정가' }}
                />
                <Radio
                  checked={selectedValue === 'b'}
                  onChange={handleRadio}
                  value="b"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '시장가' }}
                />
                <Radio
                  checked={selectedValue === 'c'}
                  onChange={handleRadio}
                  value="c"
                  name="radio-buttons"
                  inputProps={{ 'aria-label': '예약-지정가' }}
                />
              </Box>
            </Box>
          </Box>
          {/* 데스크탑 주문유형 */}
          <Box
            sx={{
              ...flexCenter,
              gap: 2,
              '@media (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            <NGTypo>주문유형</NGTypo>
            <Box sx={flexCenter}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <NGTypo>지정가</NGTypo>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <NGTypo>시장가</NGTypo>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <NGTypo>예약-지정가</NGTypo>
            </Box>
          </Box>
          {/* 주문가능 금액 */}
          <Box sx={flexCenter}>
            <MobModalTypo>주문가능</MobModalTypo>
            <MobModalTypo>
              {value === '1'
                ? parseFloat(bidableCash).toLocaleString()
                : parseFloat(askablePrice).toLocaleString()}{' '}
              KRW
            </MobModalTypo>
          </Box>
          {/* 매수가격 / 매도가격 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>
                {value === '1' ? '매수가격' : '매도가격'}
              </MobModalTypo>
              <MobModalTypo>(KRW)</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={price}
                sx={textFieldStyle}
                onChange={handlePriceChange}
              />
              <IconButton onClick={handlePriceDecrement}>-</IconButton>
              <IconButton onClick={handlePriceIncrement}>+</IconButton>
            </Box>
          </Box>
          {/* 주문수량 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>주문수량</MobModalTypo>
              <MobModalTypo>({code})</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={balance}
                sx={textFieldStyle}
                onChange={handleBalanceChange}
              />
              <IconButton onClick={handleBalanceDecrement}>-</IconButton>
              <IconButton onClick={handleBalanceIncrement}>+</IconButton>
            </Box>
          </Box>
          {/* 주문총액 */}
          <Box sx={flexCenter}>
            <Box>
              <MobModalTypo>주문총액</MobModalTypo>
              <MobModalTypo>(KRW)</MobModalTypo>
            </Box>
            <TextField
              sx={{
                width: 203,
                '@media (max-width:500px)': {
                  width: 120,
                },
              }}
              value={accPrice}
            />
          </Box>
          {/* 안내문 */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              gap: 3,
            }}
          >
            <NGTypo fontSize={12}>최소주문 금액: 5,000 KRW</NGTypo>
            <NGTypo fontSize={12}>수수료(부가세 포함): 0.05%</NGTypo>
          </Box>
          {/* 버튼 */}
          <Box sx={flexCenter}>
            <Tooltip title="초기화">
              <Button
                sx={resetStyle}
                onClick={() => {
                  handleReset();
                }}
              >
                <RestoreIcon />
              </Button>
            </Tooltip>
            <Tooltip title="주문">
              <Button
                sx={{
                  width: '250px',
                  '@media (max-width:500px)': {
                    width: 80,
                  },
                }}
                onClick={() => handleButtonClick()}
              >
                {value === '1' ? (
                  <NGTypo fontWeight={'bold'}>매수</NGTypo>
                ) : (
                  <NGTypo fontWeight={'bold'}>매도</NGTypo>
                )}
              </Button>
            </Tooltip>
          </Box>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={success} variant="filled">
              {success === 'success'
                ? '주문했습니다'
                : '주문총액을 다시 확인해주세요'}
            </Alert>
          </Snackbar>
        </Box>
      </TabPanel>
    </>
  );
}

function OrderHistory({ value, orders, removeOrder }) {
  const [selectedValue, setSelectedValue] = useState('a');
  const [open, setOpen] = useState(false);

  const handleRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleOpen = async () => {
    try {
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

  const handleCancel = (index) => {
    removeOrder(index);
    handleOpen();
  };

  return (
    <TabPanel value={value}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ ...flexCenter, justifyContent: 'start' }}>
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleRadio}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': '미체결' }}
          />
          <NGTypo>미체결</NGTypo>
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleRadio}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': '체결' }}
          />
          <NGTypo>체결</NGTypo>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>
                  <NGTypo sx={cellStyle}>주문시간</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>마켓명</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>단위가격</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>주문량</NGTypo>
                </TableCell>
                <TableCell rowSpan={2}>
                  <NGTypo sx={cellStyle}>취소</NGTypo>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NGTypo sx={cellStyle}>구분</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>주문가격</NGTypo>
                </TableCell>
                <TableCell>
                  <NGTypo sx={cellStyle}>미체결량</NGTypo>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => {
                const spliting = order.orderTime.indexOf('오');
                const date = order.orderTime.substring(0, spliting - 1);
                const time = order.orderTime.substring(spliting);
                return (
                  <Fragment key={index}>
                    <TableRow>
                      <TableCell rowSpan={2}>
                        <NGTypo sx={cellStyle}>
                          {date}
                          <br />
                          {time}
                        </NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.marketName}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.unitPrice}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.orderQuantity}</NGTypo>
                      </TableCell>
                      <TableCell rowSpan={2}>
                        <Button
                          sx={{
                            backgroundColor: globalColors.white_retro,
                            color: theme.palette.primary.light,
                            '&:hover': {
                              color: theme.palette.secondary.main,
                            },
                          }}
                          onClick={() => handleCancel(index)}
                        >
                          취소
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <NGTypo
                          sx={{
                            ...cellStyle,
                            color:
                              order.type === '매도'
                                ? globalColors.color_neg['400']
                                : globalColors.color_pos['400'],
                          }}
                        >
                          {order.type}
                        </NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.orderPrice}</NGTypo>
                      </TableCell>
                      <TableCell>
                        <NGTypo sx={cellStyle}>{order.unfilledQuantity}</NGTypo>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                );
              })}
            </TableBody>
          </Table>
        </Box>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            주문을 취소했습니다
          </Alert>
        </Snackbar>
      </Box>
    </TabPanel>
  );
}

export default function OrderModal({ handleClose }) {
  const [value, setValue] = useState('1');
  const [orders, setOrders] = useState([]);
  const open = useSelector((state) => state.chart.open);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const removeOrder = (index) => {
    setOrders((prevOrders) => prevOrders.filter((order, i) => i !== index));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const askablePrice = orders
    .filter((order) => order.type === '매수')
    .reduce((acc, order) => acc + parseFloat(order.orderPrice), 0);
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
          '@media (max-width:500px)': {
            width: '300px',
          },
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="매수 매도 주문">
              <StyledTab label="매수" value="1" />
              <StyledTab label="매도" value="2" />
              <StyledTab label="거래내역" value="3" />
            </TabList>
          </Box>
          <Panel value="1" addOrder={addOrder} />
          <Panel value="2" addOrder={addOrder} askablePrice={askablePrice} />
          <OrderHistory value="3" orders={orders} removeOrder={removeOrder} />
        </TabContext>
      </Box>
    </Modal>
  );
}

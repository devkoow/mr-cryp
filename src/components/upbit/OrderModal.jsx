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
  TableRow,
  TableCell,
  Tooltip,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  NGTypography,
  theme,
  flexCenter,
  MobModalTypo,
} from '../../defaultTheme';
import RestoreIcon from '@mui/icons-material/Restore';
import { globalColors } from '../../globalColors';

function Panel({ value, code, addOrder, currPrice, askablePrice }) {
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
          <Box
            sx={{
              ...flexCenter,
              gap: 2,
              '@media (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            <MobModalTypo>주문유형</MobModalTypo>
            <Box sx={flexCenter}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <MobModalTypo>지정가</MobModalTypo>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <MobModalTypo>시장가</MobModalTypo>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <MobModalTypo>예약-지정가</MobModalTypo>
            </Box>
          </Box>
          <Box>
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
          <Box
            sx={{
              ...flexCenter,
              gap: 2,
              '@media (max-width:500px)': {
                display: 'none',
              },
            }}
          >
            <MobModalTypo>주문유형</MobModalTypo>
            <Box sx={flexCenter}>
              <Radio
                checked={selectedValue === 'a'}
                onChange={handleRadio}
                value="a"
                name="radio-buttons"
                inputProps={{ 'aria-label': '지정가' }}
              />
              <MobModalTypo>지정가</MobModalTypo>
              <Radio
                checked={selectedValue === 'b'}
                onChange={handleRadio}
                value="b"
                name="radio-buttons"
                inputProps={{ 'aria-label': '시장가' }}
              />
              <MobModalTypo>시장가</MobModalTypo>
              <Radio
                checked={selectedValue === 'c'}
                onChange={handleRadio}
                value="c"
                name="radio-buttons"
                inputProps={{ 'aria-label': '예약-지정가' }}
              />
              <MobModalTypo>예약-지정가</MobModalTypo>
            </Box>
          </Box>
          <Box
            sx={{
              ...flexCenter,
              justifyContent: 'space-between',
            }}
          >
            <MobModalTypo>주문가능</MobModalTypo>
            <MobModalTypo>
              {value === '1'
                ? parseFloat(bidableCash).toLocaleString()
                : parseFloat(askablePrice).toLocaleString()}{' '}
              KRW
            </MobModalTypo>
          </Box>
          <Box
            sx={{
              ...flexCenter,
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <MobModalTypo>
                {value === '1' ? '매수가격' : '매도가격'}
              </MobModalTypo>
              <MobModalTypo>(KRW)</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={price}
                sx={{
                  width: 150,
                  '@media (max-width:500px)': {
                    width: 80,
                  },
                }}
                onChange={handlePriceChange}
              />
              <IconButton onClick={handlePriceDecrement}>-</IconButton>
              <IconButton onClick={handlePriceIncrement}>+</IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              ...flexCenter,
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <MobModalTypo>주문수량</MobModalTypo>
              <MobModalTypo>({code})</MobModalTypo>
            </Box>
            <Box sx={flexCenter}>
              <TextField
                value={balance}
                sx={{
                  width: 150,
                  '@media (max-width:500px)': {
                    width: 80,
                  },
                }}
                onChange={handleBalanceChange}
              />
              <IconButton onClick={handleBalanceDecrement}>-</IconButton>
              <IconButton onClick={handleBalanceIncrement}>+</IconButton>
            </Box>
          </Box>
          <Box
            sx={{
              ...flexCenter,
              justifyContent: 'space-between',
            }}
          >
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
          <Box sx={{ ...flexCenter, justifyContent: 'space-between' }}>
            <Tooltip title="초기화">
              <Button
                sx={{
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
                }}
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
                  <NGTypography fontWeight={'bold'}>매수</NGTypography>
                ) : (
                  <NGTypography fontWeight={'bold'}>매도</NGTypography>
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
        <Box sx={flexCenter}>
          <Radio
            checked={selectedValue === 'a'}
            onChange={handleRadio}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': '미체결' }}
          />
          <NGTypography>미체결</NGTypography>
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleRadio}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': '체결' }}
          />
          <NGTypography>체결</NGTypography>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    주문시간
                  </NGTypography>
                </TableCell>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    마켓명
                  </NGTypography>
                </TableCell>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    단위가격
                  </NGTypography>
                </TableCell>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    주문량
                  </NGTypography>
                </TableCell>
                <TableCell rowSpan={2}>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    취소
                  </NGTypography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    구분
                  </NGTypography>
                </TableCell>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    주문가격
                  </NGTypography>
                </TableCell>
                <TableCell>
                  <NGTypography
                    sx={{
                      textAlign: 'center',
                      '@media (max-width: 500px)': { fontSize: '10px' },
                    }}
                  >
                    미체결량
                  </NGTypography>
                </TableCell>
              </TableRow>
            </TableHead>
            {orders.map((order, index) => {
              const spliting = order.orderTime.indexOf('오');
              const date = order.orderTime.substring(0, spliting - 1);
              const time = order.orderTime.substring(spliting);
              return (
                <Fragment key={index}>
                  <TableRow>
                    <TableCell rowSpan={2}>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {date}
                        <br />
                        {time}
                      </NGTypography>
                    </TableCell>
                    <TableCell>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.marketName}
                      </NGTypography>
                    </TableCell>
                    <TableCell>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.unitPrice}
                      </NGTypography>
                    </TableCell>
                    <TableCell>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.orderQuantity}
                      </NGTypography>
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
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          color:
                            order.type === '매도'
                              ? globalColors.color_neg['400']
                              : globalColors.color_pos['400'],
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.type}
                      </NGTypography>
                    </TableCell>
                    <TableCell>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.orderPrice}
                      </NGTypography>
                    </TableCell>
                    <TableCell>
                      <NGTypography
                        sx={{
                          textAlign: 'center',
                          '@media (max-width: 500px)': { fontSize: '10px' },
                        }}
                      >
                        {order.unfilledQuantity}
                      </NGTypography>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
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

export default function OrderModal({ open, handleClose, code, currPrice }) {
  const [value, setValue] = useState('1');
  const [orders, setOrders] = useState([]);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    console.log(orders);
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
              <Tab label="매수" value="1" />
              <Tab label="매도" value="2" />
              <Tab label="거래내역" value="3" />
            </TabList>
          </Box>
          <Panel
            value="1"
            code={code}
            addOrder={addOrder}
            currPrice={currPrice}
          />
          <Panel
            value="2"
            code={code}
            addOrder={addOrder}
            askablePrice={askablePrice}
          />
          <OrderHistory value="3" orders={orders} removeOrder={removeOrder} />
        </TabContext>
      </Box>
    </Modal>
  );
}

import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme, NGTypo } from '../../defaultTheme';
import { globalColors } from '../../globalColors';

export default function AccountDetail({ balance }) {
  const totalBalance = balance.reduce(
    (sum, item) => sum + parseFloat(item.balance) * item.avg_buy_price,
    0
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {balance &&
        balance.map((item, index) => {
          if (index === 0) {
            return (
              <Accordion
                key={item.currency}
                sx={{
                  width: '60%',
                  '&:hover': { backgroundColor: globalColors.white_retro },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <NGTypo fontWeight={'bold'}>원화</NGTypo>
                    <NGTypo
                      fontWeight={'bold'}
                      color={theme.palette.primary.main}
                    >
                      {item.currency}
                    </NGTypo>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypo>보유비중</NGTypo>
                      <NGTypo fontWeight={'bold'}>
                        {(
                          (parseFloat(item.balance) / totalBalance) *
                          100
                        ).toFixed(2)}
                        %
                      </NGTypo>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypo>보유수량(평가금액)</NGTypo>
                      <NGTypo fontWeight={'bold'}>
                        {parseFloat(
                          parseFloat(item.balance).toFixed(4)
                        ).toLocaleString()}{' '}
                        KRW
                      </NGTypo>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          } else {
            return (
              <Accordion
                key={item.currency}
                sx={{
                  width: '60%',
                  '&:hover': { backgroundColor: globalColors.white_retro },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box>
                    {item.currency === 'ETH' && (
                      <NGTypo fontWeight={'bold'}>이더리움</NGTypo>
                    )}
                    {item.currency === 'XRP' && (
                      <NGTypo fontWeight={'bold'}>리플</NGTypo>
                    )}
                    <NGTypo
                      fontWeight={'bold'}
                      color={theme.palette.primary.light}
                    >
                      {item.currency}
                    </NGTypo>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypo>보유비중</NGTypo>
                      <NGTypo fontWeight={'bold'}>
                        {(
                          ((parseFloat(item.avg_buy_price) * item.balance) /
                            totalBalance) *
                          100
                        ).toFixed(2)}
                        %
                      </NGTypo>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypo>보유수량(평가금액)</NGTypo>
                      <NGTypo fontWeight={'bold'}>
                        {item.balance} {item.currency}
                      </NGTypo>
                      <NGTypo fontWeight={'bold'}>
                        {parseFloat(
                          parseFloat(item.avg_buy_price) * item.balance
                        ).toLocaleString()}{' '}
                        KRW
                      </NGTypo>
                    </Box>
                  </Box>
                </AccordionDetails>
              </Accordion>
            );
          }
        })}
    </Box>
  );
}

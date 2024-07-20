import React from 'react';
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { theme, DescTypography, NGTypography } from '../../defaultTheme';
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
                  '&:hover': { backgroundColor: globalColors.white['500'] },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <DescTypography sx={{ color: globalColors.black['400'] }}>
                      원화
                    </DescTypography>
                    <NGTypography
                      fontWeight={'bold'}
                      color={theme.palette.primary.light}
                    >
                      {item.currency}
                    </NGTypography>
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
                      <NGTypography>보유비중</NGTypography>
                      <NGTypography fontWeight={'bold'}>
                        {(
                          (parseFloat(item.balance) / totalBalance) *
                          100
                        ).toFixed(2)}
                        %
                      </NGTypography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypography>보유수량(평가금액)</NGTypography>
                      <NGTypography fontWeight={'bold'}>
                        {parseFloat(
                          parseFloat(item.balance).toFixed(4)
                        ).toLocaleString()}{' '}
                        KRW
                      </NGTypography>
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
                  '&:hover': { backgroundColor: globalColors.white['500'] },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Box>
                    {item.currency === 'ETH' && (
                      <DescTypography sx={{ color: globalColors.black['400'] }}>
                        이더리움
                      </DescTypography>
                    )}
                    {item.currency === 'XRP' && (
                      <DescTypography sx={{ color: globalColors.black['400'] }}>
                        리플
                      </DescTypography>
                    )}
                    <NGTypography
                      fontWeight={'bold'}
                      color={theme.palette.primary.light}
                    >
                      {item.currency}
                    </NGTypography>
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
                      <NGTypography>보유비중</NGTypography>
                      <NGTypography fontWeight={'bold'}>
                        {(
                          ((parseFloat(item.avg_buy_price) * item.balance) /
                            totalBalance) *
                          100
                        ).toFixed(2)}
                        %
                      </NGTypography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <NGTypography>보유수량(평가금액)</NGTypography>
                      <NGTypography fontWeight={'bold'}>
                        {item.balance} {item.currency}
                      </NGTypography>
                      <NGTypography fontWeight={'bold'}>
                        {parseFloat(
                          parseFloat(item.avg_buy_price) * item.balance
                        ).toLocaleString()}{' '}
                        KRW
                      </NGTypography>
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

import React from 'react';
import {
  Grid,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DescTypography } from '../../defaultTheme';

export default function OrderCard({ balance }) {
  return (
    <Grid container spacing={1}>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {balance &&
          balance.map((item) => {
            return (
              <Box>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {item.unit_currency + '-' + item.currency}
                  </AccordionSummary>
                  <AccordionDetails>
                    <DescTypography></DescTypography>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
      </Grid>
    </Grid>
  );
}

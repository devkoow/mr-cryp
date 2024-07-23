import { Box, MenuItem, Select } from '@mui/material';
import { memo } from 'react';
import { DescriptionTypo, DescTypography } from '../../defaultTheme';
import { globalColors } from '../../globalColors';

/** 마켓 코드 셀렉터
  - Props 
        - curMarketCode
        - setCurMarketCode
        - isLoading
        - marketCode
 */
function MarketCodeSelector({
  curMarketCode,
  setCurMarketCode,
  isLoading,
  marketCodes,
}) {
  const handleMarket = (evt) => {
    setCurMarketCode(evt.target.value);
  };

  if (isLoading) {
    <DescTypography>마켓 코드 불러오는 중...</DescTypography>;
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <DescriptionTypo sx={{ mb: 1 }}>마켓 코드</DescriptionTypo>
      <Select name="marketcode" onChange={handleMarket} value={curMarketCode}>
        {marketCodes
          ? marketCodes.map((code) => (
              <MenuItem
                key={`${code.market}_${code.english_name}`}
                value={code.market}
              >
                {code.market}
              </MenuItem>
            ))
          : null}
      </Select>
    </Box>
  );
}

export default memo(MarketCodeSelector);

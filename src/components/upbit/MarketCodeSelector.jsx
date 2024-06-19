import { Box, MenuItem, Select, Typography } from '@mui/material';
import { memo } from 'react';

/** 마켓 코드를 선택하여 */
function MarketCodeSelector({
  curMarketCode,
  setCurMarketCode,
  isLoading,
  marketCodes,
}) {
  const handleMarket = (evt) => {
    setCurMarketCode(evt.target.value);
  };

  return (
    <>
      {!isLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography>마켓 코드</Typography>
          <Select
            name="marketcode"
            onChange={handleMarket}
            value={curMarketCode}
          >
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
      ) : (
        <Typography>마켓 코드 불러오는 중...</Typography>
      )}
    </>
  );
}

export default memo(MarketCodeSelector);

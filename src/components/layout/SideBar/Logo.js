import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import logo from '../../../assets/images/logo.svg';

const Logo = () => {
  return (
    <Stack mb={2} px={1} spacing={2} direction="row" alignItems="center">
      <img width={32} height={32} src={logo} alt={logo} />
      <Typography color="#fff" fontWeight={700} variant="h6">
        Company
      </Typography>
    </Stack>
  );
};

export default Logo;

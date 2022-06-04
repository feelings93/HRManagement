import React from 'react'
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingBox = () => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: `calc(100vh - 80px)` }}
    >
      <CircularProgress />
    </Stack>
  )
}

export default LoadingBox
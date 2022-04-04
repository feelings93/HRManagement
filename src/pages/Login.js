import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
const Login = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      bgcolor="#09101D"
      minHeight="100vh"
    >
      <Paper
        sx={{
          borderRadius: 2,
          px: 3,
          py: 4,
          minWidth: '320px',
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} direction="column">
            <Typography mb={3} textAlign="center" variant="h6">
              Đăng nhập website
            </Typography>
            <TextField
              {...register('email')}
              placeholder="Email / Tên đăng nhập"
              label="Email / Tên đăng nhập"
            />
            <TextField
              {...register('password')}
              type="password"
              placeholder="Mật khẩu"
              label="Mật khẩu"
            />
            <Box />
            <Button type="submit" size="large" variant="contained">
              Đăng nhập
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;

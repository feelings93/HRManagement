import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import registerLogo from '../assets/images/register.svg';
import registerSuccess from '../assets/images/registerSuccess.svg';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttp from '../hooks/use-http';
import { signup } from '../lib/api/auth';
import swal from 'sweetalert';

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { sendRequest, status, data, error } = useHttp(signup);
  const navigate = useNavigate();

  const onSubmit = (data) => sendRequest(data);

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  useEffect(() => {
    if (status === 'completed') {
      if (error) {
        swal('Đăng ký thất bại', 'Đã có lỗi xảy ra', 'error');
      }
    }
  }, [data, error, navigate, status]);
  if (status === 'completed' && data) {
    return (
      <Stack
        sx={{
          height: '100vh',
          width: {
            xs: '300px',
            md: '600px',
          },
          marginX: 'auto',
        }}
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <img src={registerSuccess} alt="register" width="300px" />
        <Typography variant="h4" textAlign="center" fontWeight="500">
          Đăng ký thành công
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          variant="body2"
          fontWeight="500"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolorum
          a eaque accusamus voluptate, sed dicta impedit, officiis autem
          aspernatur perspiciatis facilis. Delectus nihil totam vel amet
          assumenda maxime quos!
        </Typography>
        <Button href="/login" onClick={navigateToLogin} variant="outlined">
          Chuyển đến trang Đăng nhập
        </Button>
      </Stack>
    );
  }
  return (
    <Grid container minHeight="100vh">
      <Grid item xs={12} sm={6} md={5} lg={4} p={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight="700">
              Đăng ký
            </Typography>
            <Typography variant="body1">
              {'Đã có tài khoản? '}
              <Link
                sx={{ textDecoration: 'none' }}
                href="/login"
                onClick={navigateToLogin}
              >
                Đăng nhập
              </Link>
            </Typography>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }} htmlFor="username">
                Tên đăng nhập
              </InputLabel>
              <TextField {...register('username')} size="small" id="username" />
            </Stack>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }} htmlFor="email">
                Email
              </InputLabel>
              <TextField
                {...register('email')}
                id="email"
                size="small"
                type="email"
                required
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }} htmlFor="password">
                Mật khẩu
              </InputLabel>
              <TextField
                {...register('password')}
                id="password"
                size="small"
                type="password"
              />
            </Stack>
            <Button
              type="submit"
              size="large"
              variant="contained"
              disableElevation
              disabled={status === 'pending'}
              children={status === 'pending' ? 'Đang đăng ký...' : 'Đăng ký'}
            />
          </Stack>
          {status === 'pending' && <LinearProgress />}
        </form>
      </Grid>
      <Grid
        item
        xs={0}
        sm={6}
        md={7}
        lg={8}
        bgcolor="#F1F5FF"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <img src={registerLogo} alt="register" width="70%"></img>
      </Grid>
    </Grid>
  );
};

export default Register;

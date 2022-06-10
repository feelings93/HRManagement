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
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useHttp from '../hooks/use-http';
import { changePassword } from '../lib/api/auth';
import swal from 'sweetalert';

const ConfirmPassword = () => {
  const { register, handleSubmit } = useForm();
  const { sendRequest, status, data, error } = useHttp(changePassword);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = (data) => {
    if (data.password === data.confirmPassword) {
      sendRequest({ password: data.password, tkn: token});
    } else {
      swal('Đổi mật khẩu thất bại', 'Mật khẩu xác thực không trùng với mật khẩu mới', 'error');
    }
  };

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };
  useEffect(() => {
    if (status === 'completed') {
      if (error) {
        console.log(error);
        swal('Đổi mật khẩu thất bại', 'Đã có lỗi xảy ra', 'error');
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
          Đổi mật khẩu thành công
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          variant="body2"
          fontWeight="500"
        >
          Bạn đã đổi mật khẩu thành công!
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
              Đổi mật khẩu
            </Typography>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }} htmlFor="password">
                New password
              </InputLabel>
              <TextField
                {...register('password')}
                required="true"
                id="password"
                size="small"
                type="password"
              />
            </Stack>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }}>
                Confirm passowrd
              </InputLabel>
              <TextField 
                {...register('confirmPassword')}
                required="true"
                id="confirm-password"
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
              children={status === 'pending' ? 'Đang đổi mật khẩu...' : 'Đổi mật khẩu'}
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
        <img src={registerLogo} alt="register" width="50%"></img>
      </Grid>
    </Grid>
  );
};

export default ConfirmPassword;

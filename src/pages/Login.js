import React, { useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import LinearProgress from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import useHttp from '../hooks/use-http';
import { login, notifyChange } from '../lib/api/auth';
import swal from 'sweetalert';
import { AuthContext } from '../store/auth-context';
import loginLogo from '../assets/images/login.svg';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { sendRequest, status, data, error } = useHttp(login);
  const {
    sendRequest: sendChangeRequest,
    status: statusChange,
    error: errorChange,
  } = useHttp(notifyChange);
  
  const authCtx = useContext(AuthContext);
  const { setUser } = authCtx;
  const navigate = useNavigate();

  const navigateToRegister = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const [username, setUserName] = useState("");

  const handleChange = (e) => {
    setUserName(e.target.value);
  }

  const notifyChangeRequest = (e) => {
    e.preventDefault();
    sendChangeRequest(username);
  }

  useEffect(() => {
    if (statusChange === 'completed') {
      if (errorChange) {
        console.log(errorChange);
        swal(
          'Đã có lỗi xảy ra',
          errorChange,
          'error',
        );
      } else {
        swal(
          'Gửi đổi mật khẩu',
          'Đã gửi thư yêu cầu đổi mật khẩu đến email của bạn!',
          'success',
        );
      }
    }
  }, [errorChange, statusChange]);

  const onSubmit = (data) => sendRequest(data);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      } else if (error) {
        swal('Đăng nhập thất bại', 'Đã có lỗi xảy ra', 'error');
      }
    }
  }, [data, error, setUser, status]);

  return (
    <Grid flexDirection="row-reverse" container minHeight="100vh">
      <Grid item xs={12} sm={6} md={5} lg={4} p={8}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Typography variant="h4" fontWeight="700">
              Đăng nhập
            </Typography>
            <Typography variant="body1">
              {'Chưa có tài khoản? '}
              <Link
                sx={{ textDecoration: 'none' }}
                href="/register"
                onClick={navigateToRegister}
              >
                Đăng ký
              </Link>
            </Typography>
            <Stack spacing={1}>
              <InputLabel sx={{ fontWeight: '500' }} htmlFor="username">
                Tên đăng nhập
              </InputLabel>
              <TextField 
                {...register('username')} 
                size="small" 
                id="username" 
                required
                onChange={handleChange}
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
                required
              />
            </Stack>
            <Typography 
              variant="body1" 
              onClick={notifyChangeRequest} 
              color="#3aa3cc" 
              textAlign="right"
              style={{cursor:'pointer'}}>
              Đổi mật khẩu
            </Typography>
            <Button
              type="submit"
              size="large"
              variant="contained"
              disableElevation
              disabled={status === 'pending'}
              children={
                status === 'pending' ? 'Đang đăng nhập...' : 'Đăng nhập'
              }
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
        <img src={loginLogo} alt="login" width="70%"></img>
      </Grid>
    </Grid>
  );
};

export default Login;

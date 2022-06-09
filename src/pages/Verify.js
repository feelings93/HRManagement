import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import errorImg from '../assets/images/error.svg';
import registerSuccess from '../assets/images/registerSuccess.svg';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { verify } from '../lib/api/auth';

const Verify = () => {
  const { sendRequest, error, status } = useHttp(verify);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const navigateToLogin = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  useEffect(() => {
    sendRequest(searchParams.get("token"));
  }, [searchParams, sendRequest]);
  
  if (error) {
    return (
      <Grid container minHeight="100vh">
        <Stack
          sx={{
            height: '90vh',
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
          <img src={errorImg} alt="register" width="300px" />
          <Typography variant="h4" textAlign="center" fontWeight="500">
            Đã có lỗi xảy ra
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            variant="body2"
            fontWeight="500"
          >
            {error}<br/>
            Bạn đã <b>KHÔNG THÀNH CÔNG</b> xác thực tài khoản thành công!<br/>
            Bạn hãy tải trang này hoặc liên hệ developer để khắc phục lỗi này
          </Typography>
        </Stack>
      </Grid>
    );
  }
  else {
    return (
      <Grid container minHeight="100vh">
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
            Xác thực tài khoản thành công
          </Typography>
          <Typography
            color="text.secondary"
            textAlign="center"
            variant="body2"
            fontWeight="500"
          >
            Bạn đã xác thực tài khoản thành công!<br/>
            Bạn có thể tắt trang này hoặc chuyển đến trang đăng nhập
          </Typography>
          <Button href="/login" onClick={navigateToLogin} variant="outlined">
            Chuyển đến trang Đăng nhập
          </Button>
        </Stack>
      </Grid>
    );
  }
};

export default Verify;







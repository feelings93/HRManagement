import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/use-http';
import { getEmployee } from '../../../lib/api/employee';
import moment from 'moment';

const ProfileCard = () => {
  const params = useParams();
  const { sendRequest, status, data, error } = useHttp(getEmployee);
  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);
  if (status === 'pending') return <h1>Loading....</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <Card variant="outlined">
      <CardHeader
        title={<Typography variant="h6">Thông tin chung</Typography>}
      />
      <Divider />
      <CardContent>
        <Grid container rowGap={2} columnSpacing={2}>
          <Grid xs={12} md={6} item container rowGap={3} alignItems="center">
            <Grid xs={4} item>
              <Typography variant="subtitle1">Mã số</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.workID}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Họ</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.lastName}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Tên</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.firstName}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Email</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.email}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Số điện thoại</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.phone}
              </Typography>
            </Grid>
          </Grid>
          <Grid xs={12} md={6} item container rowGap={3} alignItems="center">
            <Grid xs={4} item>
              <Typography variant="subtitle1">Giới tính</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.gender === 0 ? 'Nam' : 'Nữ'}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Ngày bắt đầu</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {moment(data?.startDate).format('DD-MM-yyyy')}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Ngày kết thúc</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.resignDate
                  ? moment(data?.resignDate).format('DD-MM-yyyy')
                  : 'Chưa xác định'}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Chức vụ</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.role || 'Chưa xác định'}
              </Typography>
            </Grid>
            <Grid xs={4} item>
              <Typography variant="subtitle1">Hết hạn thanh toán</Typography>
            </Grid>
            <Grid xs={8} item>
              <Typography variant="subtitle1" fontWeight={600}>
                {data?.paymentDue || 'Chưa xác định'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;

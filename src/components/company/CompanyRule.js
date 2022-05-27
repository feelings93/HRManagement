import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';

const CompanyRule = ({ company }) => {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <Card variant="outlined">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader
          title={<Typography variant="h6">Quy định</Typography>}
          action={
            !edit ? (
              <Button
                variant="text"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <Stack direction="row">
                <Button
                  onClick={() => {
                    setEdit(false);
                  }}
                  variant="text"
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained">
                  Lưu
                </Button>
              </Stack>
            )
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Tên
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={company?.rule?.startWork}
                {...register('startWork')}
                fullWidth
                size="small"
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Địa chỉ
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={company?.rule?.endWork}
                {...register('endWork')}
                fullWidth
                size="small"
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Số điện thoại
              </Typography>
              <TextField
                disabled={!edit}
                defaultValue={company?.rule?.allowedLateTime}
                {...register('allowedLateTime')}
                fullWidth
                size="small"
              />
            </Stack>
          </Stack>
        </CardContent>
      </form>
    </Card>
  );
};

export default CompanyRule;

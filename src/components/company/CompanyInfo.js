import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import useHttp from '../../hooks/use-http';
import { updateCompanyInfo } from '../../lib/api/company';
import swal from 'sweetalert';
import { LinearProgress } from '@mui/material';
import { CompanyContext } from '../../store/company-context';
const CompanyInfo = () => {
  const { sendRequest, data, error, status } = useHttp(updateCompanyInfo);
  const [edit, setEdit] = useState(false);

  const { company, setCompany } = useContext(CompanyContext);
  const [name, setName] = useState(company?.name);
  const [phone, setPhone] = useState(company?.phone);
  const [address, setAddress] = useState(company?.address);
  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest({
      name,
      phone,
      address,
    });
  };

  useEffect(() => {
    setName(company?.name);
    setPhone(company?.phone);
    setAddress(company?.address);
  }, [company]);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Cập nhật thông tin công ty thành công', 'success');
        setCompany(data);
        setEdit(false);
      } else {
        swal('Thất bại', error, 'error');
      }
    }
  }, [data, error, setCompany, status]);

  return (
    <Card variant="outlined">
      <form onSubmit={handleSubmit}>
        {status === 'pending' && <LinearProgress />}
        <CardHeader
          title={<Typography variant="h6">Thông tin công ty</Typography>}
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
                    setName(company?.name);
                    setPhone(company?.phone);
                    setAddress(company?.address);
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
                required
                onChange={(event) => {
                  setName(event.target.value);
                }}
                value={name}
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
                required
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
                value={address}
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
                required
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
                value={phone}
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

export default CompanyInfo;

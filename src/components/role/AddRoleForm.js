import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { createRole } from '../../lib/api/role';
import { useForm } from 'react-hook-form';
import { RoleContext } from '../../store/role-context';

const paymentPeriods = [
  {
    id: 1,
    label: 'Theo giờ',
    register: 'Hourly',
  },
  {
    id: 2,
    label: 'Theo tháng',
    register: 'Monthly',
  },
];

const AddRoleForm = () => {
  const { register, handleSubmit } = useForm();
  const { handleAddRole, handleCloseAdd, openAdd } = useContext(RoleContext);
  const { data, error, sendRequest, status } = useHttp(createRole);
  const [paymentPeriod, setPaymentPeriod] = useState(paymentPeriods[0]);
  const onSubmit = (data) => {
    sendRequest({ ...data, paymentPeriod: paymentPeriod.register });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm chức vụ mới thành công',
          'success'
        );
        handleAddRole(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, handleAddRole]);

  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm chức vụ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('name')}
              label="Tên chức vụ"
              required
              placeholder="Tên chức vụ"
            />
            <TextField
              {...register('idPrefix')}
              label="Prefix"
              placeholder="Prefix"
            />
            <TextField
              {...register('idPostfix')}
              label="Postfix"
              placeholder="Postfix"
            />

            <TextField
              {...register('baseSalary')}
              label="Lương cơ bản"
              required
              type="number"
              inputProps={{
                min: 0,
              }}
              placeholder="Lương cơ bản"
            />
            <Autocomplete
              value={paymentPeriod}
              onChange={(event, newValue) => {
                setPaymentPeriod(newValue);
              }}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.label}
              options={paymentPeriods}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Cách tính lương"
                  placeholder="Cách tính lương"
                />
              )}
            />
            <TextField
              {...register('otMultiplier')}
              label="Hệ số"
              required
              type="number"
              inputProps={{
                min: 0,
                step: "0.01"
              }}
              onChange={(e) => {
                e.target.value = parseFloat(e.target.value).toFixed(2)
              }}
              placeholder="Hệ số"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang thêm' : 'Thêm'}
          </Button>
          <Button variant="text" onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddRoleForm;

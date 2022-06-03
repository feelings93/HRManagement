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
import { createEmployee } from '../../lib/api/employee';
import { EmployeeContext } from '../../store/employee-context';
import { useForm } from 'react-hook-form';

const options = [
  {
    id: 1,
    label: 'Admin',
  },
  {
    id: 2,
    label: 'Employee',
  },
];

const genders = [
  {
    id: 1,
    label: 'Nam',
  },
  {
    id: 2,
    label: 'Nữ',
  },
];

const AddEmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const employeeCtx = useContext(EmployeeContext);

  const { handleAddEmployee, handleCloseAdd, openAdd } = employeeCtx;
  const { data, error, sendRequest, status } = useHttp(createEmployee);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState(genders[0]);
  const onSubmit = (data) => {
    sendRequest({ ...data, gender: gender.id });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm nhân viên mới thành công', 'success');
        handleAddEmployee(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleAddEmployee, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('lastName')}
              label="Họ"
              required
              placeholder="Họ"
            />
            <TextField
              {...register('firstName')}
              label="Tên"
              required
              placeholder="Tên"
            />

            <TextField
              {...register('email')}
              type="email"
              label="Email"
              required
              placeholder="Email"
            />
            <TextField {...register('phone')} label="Số điện thoại" required />
            <Autocomplete
              value={gender}
              onChange={(event, newValue) => {
                setGender(newValue);
              }}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.label}
              options={genders}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Giới tính"
                  placeholder="Giới tính"
                />
              )}
            />
            <Autocomplete
              value={role}
              onChange={(event, newValue) => {
                setRole(newValue);
              }}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.label}
              options={options}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Vai trò"
                  placeholder="Vai trò"
                />
              )}
            />
            <TextField
              required
              {...register('startDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Ngày bắt đầu"
              placeholder="Ngày bắt đầu"
            />
            <TextField
              required
              {...register('resignDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Ngày nghỉ việc"
              placeholder="Ngày nghỉ việc"
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

export default AddEmployeeForm;

import React, { useContext, useState, useEffect } from 'react';
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
import { getRoles } from '../../lib/api/role';

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
  const {
    data: dataRole,
    error: errorRole,
    sendRequest: sendRequestRole,
    status: statusRole,
  } = useHttp(getRoles, true);

  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);

  const [gender, setGender] = useState(genders[0]);
  const onSubmit = (data) => {
    sendRequest({ ...data, gender: gender.id, roleID: role._id  });
  };

  useEffect(() => {
    sendRequestRole();
  }, [sendRequestRole]);

  useEffect(() => {
    if (statusRole === 'completed') {
      if (dataRole) {
        setRoles(dataRole);
      } else if (errorRole) {
        swal('Thất bại', errorRole, 'error');
        handleCloseAdd();
      }
    }
  }, [dataRole, errorRole, handleCloseAdd, statusRole]);

  useEffect(() => {
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
              loading={statusRole === 'pending'}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.name}
              options={roles}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Chức vụ"
                  placeholder="Chức vụ"
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

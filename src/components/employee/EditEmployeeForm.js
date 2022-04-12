import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Autocomplete from '@mui/material/Autocomplete';
import useHttp from '../../hooks/use-http';
import { editEmployee } from '../../lib/api/employee';
import { EmployeeContext } from '../../store/employee-context';
import { useForm } from 'react-hook-form';
import moment from 'moment';

const options = [
  { label: 'admin', id: 1 },
  { label: 'user', id: 2 },
];

const EditEmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const employeeCtx = useContext(EmployeeContext);
  const { editEmployeeObj, handleEditEmployee, handleCloseEdit, openEdit } =
    employeeCtx;
  const { data, error, sendRequest, status } = useHttp(editEmployee);
  const [role, setRole] = useState(null);

  const onSubmit = (data) => {
    console.log({ _id: editEmployeeObj._id, ...data });
    sendRequest({ _id: editEmployeeObj._id, ...data });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin nhân viên thành công',
          'success'
        );
        handleEditEmployee(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra rui', 'error');
    }
  }, [data, status, error, handleEditEmployee, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              id="id"
              label="Id"
              disabled
              value={editEmployeeObj._id}
            />
            <TextField
              {...register('lastName')}
              label="Họ"
              required
              placeholder="Họ"
              defaultValue={editEmployeeObj.lastName}
            />
            <TextField
              {...register('firstName')}
              label="Tên"
              required
              placeholder="Tên"
              defaultValue={editEmployeeObj.firstName}
            />

            <TextField
              {...register('email')}
              type="email"
              label="Email"
              required
              placeholder="Email"
              defaultValue={editEmployeeObj.email}
            />
            <TextField
              {...register('phone')}
              label="Số điện thoại"
              required
              defaultValue={editEmployeeObj.phone}
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
              {...register('resignDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Ngày nghỉ việc"
              placeholder="Ngày nghỉ việc"
              defaultValue={moment(editEmployeeObj.resignDate).format(
                'yyyy-MM-DD',
                true
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang lưu' : 'Xác nhận'}
          </Button>
          <Button variant="text" onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEmployeeForm;

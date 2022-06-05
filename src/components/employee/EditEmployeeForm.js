import React, { useContext, useState, useEffect } from 'react';
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

const EditEmployeeForm = () => {
  const { register, handleSubmit } = useForm();
  const employeeCtx = useContext(EmployeeContext);
  const { editEmployeeObj, handleEditEmployee, handleCloseEdit, openEdit } =
    employeeCtx;
  const { data, error, sendRequest, status } = useHttp(editEmployee);
  const {
    data: dataRole,
    error: errorRole,
    sendRequest: sendRequestRole,
    status: statusRole,
  } = useHttp(getRoles, true);
  const [role, setRole] = useState(null);
  const [roles, setRoles] = useState([]);

  const [gender, setGender] = useState(
    genders.find((x) => x.id === editEmployeeObj.gender)
  );

  const onSubmit = (data) => {
    if (
      data.resignDate &&
      !moment(data.startDate).isBefore(moment(data.resignDate))
    ) {
      swal('Thất bại', 'Ngày nghỉ việc phải sau ngày bắt đầu', 'error');
      return;
    }
    sendRequest({
      _id: editEmployeeObj._id,
      ...data,
      gender: gender.id,
      roleID: role._id,
    });
  };

  useEffect(() => {
    sendRequestRole();
  }, [sendRequestRole]);

  useEffect(() => {
    if (statusRole === 'completed') {
      if (dataRole) {
        setRoles(dataRole);
        setRole(dataRole.find((x) => x._id === editEmployeeObj.role?._id));
      } else if (errorRole) {
        swal('Thất bại', errorRole, 'error');
        handleCloseEdit();
      }
    }
  }, [
    dataRole,
    editEmployeeObj.role?._id,
    errorRole,
    handleCloseEdit,
    statusRole,
  ]);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin nhân viên thành công',
          'success'
        );
        handleEditEmployee(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
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
              loading={statusRole === 'pending'}
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
              defaultValue={moment(editEmployeeObj.startDate).format(
                'yyyy-MM-DD',
                true
              )}
            />
            <TextField
              {...register('resignDate')}
              type="date"
              InputLabelProps={{ shrink: true }}
              label="Ngày nghỉ việc"
              placeholder="Ngày nghỉ việc"
              defaultValue={
                editEmployeeObj.resignDate
                  ? moment(editEmployeeObj.resignDate).format(
                      'yyyy-MM-DD',
                      true
                    )
                  : ''
              }
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

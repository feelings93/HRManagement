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
//import { createEmployee } from '../../lib/api/employee';
import { RoleContext } from '../../store/role-context';
//import { AuthContext } from '../../store/auth-context';
import { useForm } from 'react-hook-form';

const options = [
  {
    id: 1,
    label: 'Theo tuần',
  },
  {
    id: 2,
    label: 'Theo tháng',
  },
];

const AddRoleForm = () => {
  const { register, handleSubmit } = useForm();
  const roleCtx = useContext(RoleContext);
  //const authCtx = useContext(AuthContext);

  const { /*handleAddEmployee,*/ handleCloseAdd, openAdd } = roleCtx;
  //const { user } = authCtx;
  //const { data, error, sendRequest, status } = useHttp(createEmployee);
  // const onSubmit = (data) => {
  //   console.log({ ...data, roleId: role.id, companyId: user.company._id });
  //   // sendRequest(data);
  // };

  // React.useEffect(() => {
  //   if (status === 'completed') {
  //     if (data) {
  //       swal('Thành công', 'Bạn đã thêm nhân viên mới thành công', 'success');
  //       handleAddEmployee(data);
  //       handleCloseAdd();
  //     } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
  //   }
  // }, [data, status, error, handleAddEmployee, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {/* {status === 'pending' && <LinearProgress />} */}
      <form /*onSubmit={handleSubmit(onSubmit)}*/>
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
              {...register('baseSalary')}
              label="Lương cơ bản"
              required
              placeholder="Lương cơ bản"
            />
            <Autocomplete
              // value={role}
              // onChange={(event, newValue) => {
              //   setRole(newValue);
              // }}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.label}
              options={options}
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
              {...register('OtMultiplier')}
              type="number"
              label="Hệ số"
              required
              placeholder="Hệ số"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            //disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {/* {status === 'pending' ? 'Đang thêm' : 'Thêm'} */}
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

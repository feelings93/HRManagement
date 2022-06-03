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
import { useForm } from 'react-hook-form';
import { RoleContext } from '../../store/role-context';
import { editRole } from '../../lib/api/role';

const paymentPeriods = [
  {
    id: 1,
    label: 'Theo tuần',
  },
  {
    id: 2,
    label: 'Theo tháng',
  },
];

const EditRoleForm = () => {
  const { register, handleSubmit } = useForm();
  const roleCtx = useContext(RoleContext);
  const { editRoleObj, setRoles, handleCloseEdit, openEdit } = roleCtx;
  const { data, error, sendRequest, status } = useHttp(editRole);
  const [paymentPeriod, setPaymentPeriod] = useState(
    paymentPeriods.find((x) => x.id === editRoleObj.paymentPeriod)
  );

  const onSubmit = (data) => {
    sendRequest({ _id: editRoleObj._id, ...data });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin chức vụ thành công',
          'success'
        );
        setRoles(data || []);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, setRoles, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin chức vụ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id="id" label="Id" disabled value={editRoleObj._id} />
            <TextField
              {...register('name')}
              label="Tên chức vụ"
              required
              placeholder="Tên chức vụ"
              defaultValue={editRoleObj.name}
            />
            <TextField
              {...register('idPrefix')}
              label="Prefix"
              required
              placeholder="Prefix"
              defaultValue={editRoleObj.idPrefix}
            />
            <TextField
              {...register('idPostfix')}
              label="Postfix"
              required
              placeholder="Postfix"
              defaultValue={editRoleObj.idPostfix}
            />

            <TextField
              {...register('baseSalary')}
              label="Lương cơ bản"
              required
              type="number"
              placeholder="Lương cơ bản"
              defaultValue={editRoleObj.baseSalary}
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
              placeholder="Hệ số"
              defaultValue={editRoleObj.otMultiplier}
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

export default EditRoleForm;

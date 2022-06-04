import React, { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useForm } from 'react-hook-form';
import useHttp from '../../../hooks/use-http';
import moment from 'moment';
import { EmployeeSalariesContext } from '../../../store/employee-salaries-context';
import { editSalary } from '../../../lib/api/salary';

const EditSalaryForm = () => {
  const { register, handleSubmit } = useForm();
  const salaryCtx = useContext(EmployeeSalariesContext);
  const { handleEditSalary, handleCloseEdit, openEdit, editSalaryObj } =
    salaryCtx;

  const { data, error, sendRequest, status } = useHttp(editSalary);

  const onSubmit = (data) => {
    sendRequest({
      _id: editSalaryObj._id,
      employeeID: editSalaryObj.employeeID,
      ...data,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa lịch sử lương thành công',
          'success'
        );
        handleEditSalary(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseEdit, handleEditSalary]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa lịch sử lương</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('payday')}
              label="Ngày trả"
              disabled
              required
              defaultValue={moment(editSalaryObj.payday).format('yyyy-MM-DD')}
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày trả"
              type="date"
            />
            <TextField
              {...register('otSalary')}
              defaultValue={editSalaryObj.otSalary}
              label="Lương OT"
              required
              type="number"
              placeholder="Lương OT"
            />
            <TextField
              {...register('salary')}
              defaultValue={editSalaryObj.salary}
              label="Lương chính"
              required
              type="number"
              placeholder="Lương chính"
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

export default EditSalaryForm;

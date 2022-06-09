import React, { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/use-http';
import { createSalary } from '../../../lib/api/salary';
import { EmployeeSalariesContext } from '../../../store/employee-salaries-context';

const AddSalaryForm = () => {
  const { register, handleSubmit } = useForm();
  const salaryCtx = useContext(EmployeeSalariesContext);
  const params = useParams();
  const { handleAddSalary, handleCloseAdd, openAdd } = salaryCtx;
  const { data, error, sendRequest, status } = useHttp(createSalary);

  const onSubmit = (data) => {
    if (data.otSalary < 0 || data.salary < 0) {
      swal('Thất bại', 'Lương không được âm', 'error');
      return;
    }
    sendRequest({ ...data, employeeID: params.id });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm lịch sử lương mới thành công',
          'success'
        );
        handleAddSalary(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, handleAddSalary]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm lịch sử lương</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('payday')}
              label="Ngày trả"
              required
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày trả"
              type="date"
            />
            <TextField
              {...register('otSalary')}
              label="Lương OT"
              required
              type="number"
              placeholder="Lương OT"
            />
            <TextField
              {...register('salary')}
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

export default AddSalaryForm;

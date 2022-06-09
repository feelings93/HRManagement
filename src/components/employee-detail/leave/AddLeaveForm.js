import React, { useContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/use-http';
import { EmployeeLeavesContext } from '../../../store/employee-leaves-context';
import { createLeave } from '../../../lib/api/leave';

const leaveTypes = [
  { name: 'Unpaid', label: 'Nghỉ không lương' },
  { name: 'Sabbatical', label: 'Nghỉ phép' },
  { name: 'Compensatory', label: 'Nghỉ bù' },
  { name: 'Bereavement', label: 'Nghỉ tang' },
  { name: 'Paternity', label: 'Nghỉ thai sản (cha)' },
  { name: 'Maternity', label: 'Nghỉ thai sản (mẹ)' },
  { name: 'ReligiousHolidays', label: 'Ngày lễ tôn giáo' },
  { name: 'PublicHolidays', label: 'Ngày lễ' },
  { name: 'Casual', label: 'Nghỉ bình thường' },
  { name: 'Sick', label: 'Nghỉ ốm' },
];

const AddLeaveForm = () => {
  const { register, handleSubmit } = useForm();
  const leaveCtx = useContext(EmployeeLeavesContext);
  const params = useParams();
  const { handleAddLeave, setHolidays, handleCloseAdd, openAdd } = leaveCtx;
  const { data, error, sendRequest, status } = useHttp(createLeave);
  const [leaveType, setLeaveType] = useState(null);
  const onSubmit = (data) => {
    if (data.numberOfDays <= 0) {
      swal('Thất bại', 'Số ngày nghỉ phải lớn hơn 0', 'error');
      return;
    }
    sendRequest({ ...data, leaveType: leaveType.name, employeeID: params.id });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm ngày nghỉ mới thành công', 'success');
        handleAddLeave(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, setHolidays, handleAddLeave]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm ngày nghỉ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <Autocomplete
              value={leaveType}
              onChange={(event, newValue) => {
                setLeaveType(newValue);
              }}
              id="controllable-states-demo"
              getOptionLabel={(option) => option.label}
              options={leaveTypes}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Loại ngày nghỉ"
                  placeholder="Loại ngày nghỉ"
                />
              )}
            />

            <TextField
              {...register('startDate')}
              label="Ngày bắt đầu"
              required
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày bắt đầu"
              type="date"
            />
            <TextField
              {...register('numberOfDays')}
              label="Số ngày nghỉ"
              required
              type="number"
              placeholder="Số ngày nghỉ"
            />
            <TextField
              {...register('reason')}
              label="Lý do"
              required
              type="text"
              multiline
              minRows={4}
              placeholder="Lý do"
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

export default AddLeaveForm;

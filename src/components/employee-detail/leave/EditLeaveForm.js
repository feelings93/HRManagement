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
import { useForm } from 'react-hook-form';
import useHttp from '../../../hooks/use-http';
import moment from 'moment';
import { EmployeeLeavesContext } from '../../../store/employee-leaves-context';
import { editLeave } from '../../../lib/api/leave';

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

const EditLeaveForm = () => {
  const { register, handleSubmit } = useForm();
  const leaveCtx = useContext(EmployeeLeavesContext);
  const { handleEditLeave, handleCloseEdit, openEdit, editLeaveObj } = leaveCtx;
  const [leaveType, setLeaveType] = useState(
    leaveTypes.find((x) => x.name === editLeaveObj.leaveType)
  );

  const { data, error, sendRequest, status } = useHttp(editLeave);

  const onSubmit = (data) => {
    sendRequest({
      _id: editLeaveObj._id,
      employeeID: editLeaveObj.employeeID,
      leaveType: leaveType.name,
      ...data,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin ngày nghỉ thành công',
          'success'
        );
        handleEditLeave(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseEdit, handleEditLeave]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin ngày nghỉ</DialogTitle>
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
              defaultValue={moment(editLeaveObj.startDate).format('yyyy-MM-DD')}
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày bắt đầu"
              type="date"
            />
            <TextField
              {...register('numberOfDays')}
              defaultValue={editLeaveObj.numberOfDays}
              label="Số ngày nghỉ"
              required
              type="number"
              placeholder="Số ngày nghỉ"
            />
            <TextField
              {...register('reason')}
              defaultValue={editLeaveObj.reason}
              label="Lý do"
              required
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

export default EditLeaveForm;

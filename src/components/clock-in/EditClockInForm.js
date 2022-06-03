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
import useHttp from '../../hooks/use-http';
import moment from 'moment';
import { ClockInsContext } from '../../store/clock-ins-context';
import { AuthContext } from '../../store/auth-context';
import { editClockIn } from '../../lib/api/clockIn';

const EditClockInForm = () => {
  const { register, handleSubmit } = useForm();
  const clockInsCtx = useContext(ClockInsContext);
  const { handleEditClockIn, handleCloseEdit, openEdit, editClockInObj } =
    clockInsCtx;
  const { user } = useContext(AuthContext);

  const { data, error, sendRequest, status } = useHttp(editClockIn);

  const onSubmit = (data) => {
    sendRequest({
      employeeID: editClockInObj.employeeID,
      userID: user._id,
      clockIn: {
        clockedOut: moment(
          moment(new Date()).format('yyyy-MM-DD') + ' ' + data.clockedOut,
          'yyyy-MM-DD HH:mm'
        ).toISOString(),
      },
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã check out cho nhân viên thành công',
          'success'
        );
        handleEditClockIn(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseEdit, handleEditClockIn]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Check out</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('clockedOut')}
              label="Giờ checkout"
              required
              defaultValue={moment(editClockInObj.clockedOut).format('HH:mm')}
              InputLabelProps={{ shrink: true }}
              placeholder="Giờ checkout"
              type="time"
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

export default EditClockInForm;

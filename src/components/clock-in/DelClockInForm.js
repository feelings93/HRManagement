import React, { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import useHttp from '../../hooks/use-http';
import { ClockInsContext } from '../../store/clock-ins-context';
import { delClockIn } from '../../lib/api/clockIn';

const DelClockInForm = () => {
  const clockInsCtx = useContext(ClockInsContext);
  const { handleDelClockIn, handleCloseDel, openDel, delClockInObj } = clockInsCtx;
  const { data, error, sendRequest, status } = useHttp(delClockIn);

  const onSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      _id: delClockInObj.clockIn?._id,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã xóa chấm công thành công', 'success');
        handleDelClockIn(delClockInObj._id, data);
        handleCloseDel();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleDelClockIn, handleCloseDel, delClockInObj._id]);
  return (
    <Dialog open={openDel}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={onSubmit}>
        <DialogTitle>Check in</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa chấm công cho nhân viên này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang xóa' : 'Xác nhận'}
          </Button>
          <Button variant="text" onClick={handleCloseDel}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DelClockInForm;

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
import { createClockIn } from '../../lib/api/clockIn';
import { ClockInsContext } from '../../store/clock-ins-context';

const AddClockInForm = () => {
  const clockInsCtx = useContext(ClockInsContext);
  const { handleAddClockIn, handleCloseAdd, openAdd, addClockInObj } = clockInsCtx;
  const { data, error, sendRequest, status } = useHttp(createClockIn);

  const onSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      employeeID: addClockInObj.employeeID,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã check in thành công', 'success');
        handleAddClockIn(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, handleAddClockIn]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={onSubmit}>
        <DialogTitle>Check in</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn check in cho nhân viên này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang xử lý' : 'Xác nhận'}
          </Button>
          <Button variant="text" onClick={handleCloseAdd}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddClockInForm;

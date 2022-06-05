import React from 'react';
import { useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

import LinearProgress from '@mui/material/LinearProgress';

import swal from 'sweetalert';
import useHttp from '../../hooks/use-http';
import { delHoliday } from '../../lib/api/holiday';
import { HolidayContext } from '../../store/holiday-context';

const DelHolidayForm = () => {
  const { sendRequest, status, data, error } = useHttp(delHoliday);
  const { handleCloseDel, setHolidays, delHolidayObj } =
    useContext(HolidayContext);
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        handleCloseDel();
        swal('Xóa thành công!', 'Bạn đã xóa ngày lễ thành công', 'success');
        setHolidays(data?.company?.holidays || []);
      } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
    }
  }, [data, error, handleCloseDel, setHolidays, status]);
  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest({ _id: delHolidayObj._id });
  };
  return (
    <div>
      <Dialog
        open
        onClose={handleCloseDel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit}>
          {status === 'pending' && <LinearProgress />}
          <DialogTitle id="alert-dialog-title">Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn xóa ngày lễ này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant="contained"
              type="submit"
              autoFocus
            >
              {status === 'pending' ? 'Đang xóa...' : 'Xác nhận'}
            </Button>
            <Button onClick={handleCloseDel}>Hủy</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DelHolidayForm;

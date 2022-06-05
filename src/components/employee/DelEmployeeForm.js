import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import { delEmployee } from '../../lib/api/employee';
import { EmployeeContext } from '../../store/employee-context';
import useHttp from '../../hooks/use-http';


const DelEmployeeForm = () => {
  const { sendRequest, status, data, error } = useHttp(delEmployee);
  const userCtx = useContext(EmployeeContext);
  const { handleCloseDelete, handleDelEmployee, delEmployeeObj } = userCtx;
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        handleCloseDelete();
        swal('Xóa thành công!', 'Bạn đã xóa nhân viên thành công', 'success');
        handleDelEmployee(delEmployeeObj);
      } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
    }
  }, [data, error, status, handleCloseDelete, handleDelEmployee, delEmployeeObj]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const request = {
      _id: delEmployeeObj._id,
    };
    sendRequest(request);
  };
  return (
    <div>
      <Dialog
        open
        onClose={handleCloseDelete}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <form onSubmit={handleSubmit}>
          {status === 'pending' && <LinearProgress />}
          <DialogTitle id='alert-dialog-title'>Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Bạn có muốn xóa nhân viên này không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={status === 'pending'}
              variant='contained'
              type='submit'
              autoFocus
            >
              {status === 'pending' ? 'Đang xóa...' : 'Xác nhận'}
            </Button>
            <Button onClick={handleCloseDelete}>Hủy</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default DelEmployeeForm;

import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import useHttp from '../../../hooks/use-http';
import { UserContext } from '../../../store/admin/user-context';
import { delUser } from '../../../lib/api/user';


const DelUserForm = () => {
  const { sendRequest, status, data, error } = useHttp(delUser);
  const userCtx = useContext(UserContext);
  const { handleCloseDelete, handleDelUser, delUserObj } = userCtx;
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        handleCloseDelete();
        swal('Xóa thành công!', 'Bạn đã xóa người dùng thành công', 'success');
        handleDelUser(delUserObj);
      } else if (error) swal('Đã có lỗi xảy ra', error, 'error');
    }
  }, [data, error, status, handleCloseDelete, handleDelUser, delUserObj]);
  const deleteUsersSubmitHandler = (event) => {
    event.preventDefault();
    const request = {
      id: delUserObj.id,
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
        <form onSubmit={deleteUsersSubmitHandler}>
          {status === 'pending' && <LinearProgress />}
          <DialogTitle id='alert-dialog-title'>Cảnh báo</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Bạn có muốn xóa người dùng này không?
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

export default DelUserForm;

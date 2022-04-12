import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import useHttp from '../../hooks/use-http';
import { editEmployee } from '../../lib/api/employee';
import { EmployeeContext } from '../../store/employee-context';

const options = [
  { label: 'admin', id: 1 },
  { label: 'user', id: 2 },
];

const EditEmployeeForm = () => {
  const employeeCtx = useContext(EmployeeContext);
  const { editEmployeeObj, handleEditEmployee, handleCloseEdit, openEdit } = employeeCtx;
  const { data, error, sendRequest, status } = useHttp(editEmployee);


  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin nhân viên thành công',
          'success'
        );
        handleEditEmployee(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleEditEmployee, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Chỉnh sửa thông tin nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id='id' label='Id' disabled value={editEmployeeObj.id} />
            
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant='contained'
            type='submit'
          >
            {status === 'pending' ? 'Đang lưu' : 'Xác nhận'}
          </Button>
          <Button variant='text' onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEmployeeForm;

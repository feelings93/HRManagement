import React, { useContext } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { createEmployee } from '../../lib/api/employee';
import { EmployeeContext } from '../../store/employee-context';

const AddEmployeeForm = () => {
  const employeeCtx = useContext(EmployeeContext);
  const { handleAddEmployee, handleCloseAdd, openAdd } = employeeCtx;
  const { data, error, sendRequest, status } = useHttp(createEmployee);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã thêm người dùng mới thành công', 'success');
        handleAddEmployee(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', 'Đã có lỗi xảy ra', 'error');
    }
  }, [data, status, error, handleAddEmployee, handleCloseAdd]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit}>
        <DialogTitle>Thêm nhân viên</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id="name" label="Họ tên" required />
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

export default AddEmployeeForm;

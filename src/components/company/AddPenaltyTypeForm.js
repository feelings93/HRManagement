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
import { createPenaltyType } from '../../lib/api/company';
import { useForm } from 'react-hook-form';
import { CompanyContext } from '../../store/company-context';

const AddPenaltyTypeForm = () => {
  const { register, handleSubmit } = useForm();
  const { handleChangeType, handleCloseAdd } = useContext(CompanyContext);

  const { data, error, sendRequest, status } = useHttp(createPenaltyType);
  const onSubmit = (data) => {
    sendRequest(data.name);
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm ngày nghỉ lễ mới thành công',
          'success'
        );
        handleChangeType(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, handleChangeType]);
  return (
    <Dialog open={true}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm loại vi phạm</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('name')}
              label="Tên loại vi phạm"
              required
              placeholder="Tên loại vi phạm"
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

export default AddPenaltyTypeForm;

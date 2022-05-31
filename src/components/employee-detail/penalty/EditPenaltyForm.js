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
import { EmployeePenaltiesContext } from '../../../store/employee-penalties-context';
import { editPenalty } from '../../../lib/api/penalty';
import { getProfile } from '../../../lib/api/auth';
import useHttp from '../../../hooks/use-http';
import moment from 'moment';

const EditPenaltyForm = () => {
  const { register, handleSubmit } = useForm();
  const penaltyCtx = useContext(EmployeePenaltiesContext);
  const { handleEditPenalty, handleCloseEdit, openEdit, editPenaltyObj } =
    penaltyCtx;
  const [type, setType] = useState(null);
  const [types, setTypes] = useState([]);
  const { data, error, sendRequest, status } = useHttp(editPenalty);
  const {
    data: dataUser,
    error: errorUser,
    sendRequest: sendRequestUser,
    status: statusUser,
  } = useHttp(getProfile, true);

  const onSubmit = (data) => {
    sendRequest({
      _id: editPenaltyObj._id,
      employeeID: editPenaltyObj.employeeID,
      type,
      ...data,
    });
  };

  useEffect(() => {
    sendRequestUser();
  }, [sendRequestUser]);

  useEffect(() => {
    if (dataUser && statusUser === 'completed') {
      setTypes(dataUser?.company?.rule?.penaltyTypes || []);
      setType(editPenaltyObj.type);
    } else if (errorUser && statusUser === 'completed') {
      swal('Thất bại', errorUser, 'error');
    }
  }, [dataUser, editPenaltyObj.type, errorUser, statusUser]);

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin vi phạm thành công',
          'success'
        );
        handleEditPenalty(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseEdit, handleEditPenalty]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin vi phạm</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <Autocomplete
              value={type}
              onChange={(event, newValue) => {
                setType(newValue);
              }}
              loading={statusUser === 'pending'}
              id="controllable-states-demo"
              getOptionLabel={(option) => option}
              options={types}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  required
                  {...params}
                  label="Loại vi phạm"
                  placeholder="Loại vi phạm"
                />
              )}
            />

            <TextField
              {...register('occurredAt')}
              label="Thời điểm vi phạm"
              required
              defaultValue={moment(editPenaltyObj.occurredAt).format(
                'yyyy-MM-DDThh:mm'
              )}
              InputLabelProps={{ shrink: true }}
              placeholder="Thời điểm vi phạm"
              type="datetime-local"
            />
            <TextField
              {...register('deduction')}
              defaultValue={editPenaltyObj.deduction}
              label="Số tiền phạt"
              required
              type="number"
              placeholder="Số tiền phạt"
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

export default EditPenaltyForm;

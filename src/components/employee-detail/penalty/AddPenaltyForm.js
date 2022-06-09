import React, { useContext, useState, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { EmployeePenaltiesContext } from '../../../store/employee-penalties-context';
import { createPenalty } from '../../../lib/api/penalty';
import { getProfile } from '../../../lib/api/auth';
import { useParams } from 'react-router-dom';
import useHttp from '../../../hooks/use-http';

const AddPenaltyForm = () => {
  const { register, handleSubmit } = useForm();
  const penaltyCtx = useContext(EmployeePenaltiesContext);
  const params = useParams();
  const { handleAddPenalty, setHolidays, handleCloseAdd, openAdd } = penaltyCtx;
  const { data, error, sendRequest, status } = useHttp(createPenalty);
  const {
    data: dataUser,
    error: errorUser,
    sendRequest: sendRequestUser,
    status: statusUser,
  } = useHttp(getProfile, true);
  const [type, setType] = useState(null);
  const [types, setTypes] = useState([]);
  const onSubmit = (data) => {
    if (data.deduction < 0) {
      swal('Thất bại', 'Số tiền phạt không thể là số âm', 'error');
      return;
    }
    sendRequest({ ...data, type, employeeID: params.id });
  };

  useEffect(() => {
    sendRequestUser();
  }, [sendRequestUser]);

  useEffect(() => {
    if (dataUser && statusUser === 'completed') {
      setTypes(dataUser?.company?.rule?.penaltyTypes || []);
    } else if (errorUser && statusUser === 'completed') {
      swal('Thất bại', errorUser, 'error');
    }
  }, [dataUser, errorUser, statusUser]);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm ngày nghỉ lễ mới thành công',
          'success'
        );
        handleAddPenalty(data);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, setHolidays, handleAddPenalty]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm vi phạm</DialogTitle>
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
              InputLabelProps={{ shrink: true }}
              placeholder="Thời điểm vi phạm"
              type="datetime-local"
            />
            <TextField
              {...register('deduction')}
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

export default AddPenaltyForm;

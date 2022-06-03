import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import useHttp from '../../hooks/use-http';
import { createHoliday } from '../../lib/api/holiday';
import { useForm } from 'react-hook-form';
import { HolidayContext } from '../../store/holiday-context';

const AddHolidayForm = () => {
  const { register, handleSubmit } = useForm();
  const holidayCtx = useContext(HolidayContext);

  const { setHolidays, handleCloseAdd, openAdd } = holidayCtx;
  const { data, error, sendRequest, status } = useHttp(createHoliday);
  const [repeatYearly, setRepeatYearly] = useState(true);
  const onSubmit = (data) => {
    // console.log({ ...data, repeatYearly });
    sendRequest({ ...data, repeatYearly });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã thêm ngày nghỉ lễ mới thành công',
          'success'
        );
        setHolidays(data?.company?.holidays);
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, setHolidays]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Thêm ngày nghỉ lễ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('name')}
              label="Tên dịp lễ"
              required
              placeholder="Tên dịp lễ"
            />
            <TextField
              {...register('startDate')}
              label="Ngày bắt đầu nghỉ"
              required
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày bắt đầu nghỉ"
              type="date"
            />
            <TextField
              {...register('numberOfDaysOff')}
              label="Số ngày nghỉ"
              required
              type="number"
              placeholder="Số ngày nghỉ"
            />

            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  checked={repeatYearly}
                  onChange={(e) => {
                    setRepeatYearly(!repeatYearly);
                  }}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              label="Lặp lại hằng năm"
              labelPlacement="start"
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

export default AddHolidayForm;

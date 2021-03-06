import React, { useContext, useState } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Checkbox from '@mui/material/Checkbox';
import useHttp from '../../hooks/use-http';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import { HolidayContext } from '../../store/holiday-context';
import { editHoliday } from '../../lib/api/holiday';

const EditHolidayForm = () => {
  const { register, handleSubmit } = useForm();
  const holidayCtx = useContext(HolidayContext);
  const { editHolidayObj, setHolidays, handleCloseEdit, openEdit } =
    holidayCtx;
  const { data, error, sendRequest, status } = useHttp(editHoliday);
  const [repeatYearly, setRepeatYearly] = useState(editHolidayObj.repeatYearly);

  const onSubmit = (data) => {
    if (data.numberOfDaysOff <= 0) {
      swal('Thất bại', 'Số ngày nghỉ phải lớn hơn 0', 'error');
      return;
    }
    sendRequest({ _id: editHolidayObj._id, ...data, repeatYearly });
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal(
          'Thành công',
          'Bạn đã chỉnh sửa thông tin ngày nghỉ lễ thành công',
          'success'
        );
        setHolidays(data || []);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, setHolidays, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Chỉnh sửa thông tin ngày nghỉ lễ</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField id="id" label="Id" disabled value={editHolidayObj._id} />
            <TextField
              {...register('name')}
              label="Tên dịp lễ"
              required
              placeholder="Tên dịp lễ"
              defaultValue={editHolidayObj.name}
            />
            <TextField
              {...register('startDate')}
              label="Ngày bắt đầu nghỉ"
              required
              InputLabelProps={{ shrink: true }}
              placeholder="Ngày bắt đầu nghỉ"
              type="date"
              defaultValue={moment(editHolidayObj.startDate).format(
                'yyyy-MM-DD',
                true
              )}
            />
            <TextField
              {...register('numberOfDaysOff')}
              label="Số ngày nghỉ"
              required
              type="number"
              defaultValue={editHolidayObj.numberOfDaysOff}
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

export default EditHolidayForm;

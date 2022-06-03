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
import { useForm } from 'react-hook-form';
import { ReportContext } from '../../store/report-context';
import { createReport } from '../../lib/api/report';
import moment from 'moment';

const AddReportForm = ({ applyFilter }) => {
  const { register, handleSubmit } = useForm();
  const reportCtx = useContext(ReportContext);

  const { setReports, handleCloseAdd, openAdd } = reportCtx;
  const { data, error, sendRequest, status } = useHttp(createReport);
  const onSubmit = (data) => {
    if (data.startDate && data.endDate) {
      if (!moment(data.startDate).isBefore(moment(data.endDate))) {
        swal('Thất bại', 'Ngày bắt đầu phải trước ngày kết thúc', 'error');
        return;
      }
    } else if (
      (data.startDate && !data.endDate) ||
      (data.startDate && !data.endDate)
    ) {
      swal('Thất bại', 'Vui lòng nhập cả 2 hoặc không nhập', 'error');
      return;
    }

    sendRequest(data);
  };

  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã tạo báo cáo mới thành công', 'success');
        applyFilter();
        handleCloseAdd();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleCloseAdd, setReports, applyFilter]);
  return (
    <Dialog open={openAdd}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Tạo báo cáo</DialogTitle>
        <DialogContent>
          <Stack mt={1} spacing={2}>
            <TextField
              {...register('startDate')}
              label="Từ ngày"
              InputLabelProps={{ shrink: true }}
              placeholder="Từ ngày"
              type="date"
            />
            <TextField
              {...register('endDate')}
              label="Đến ngày"
              InputLabelProps={{ shrink: true }}
              placeholder="Đến ngày"
              type="date"
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

export default AddReportForm;

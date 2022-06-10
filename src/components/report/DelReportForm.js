import React, { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import LinearProgress from '@mui/material/LinearProgress';
import DialogContentText from '@mui/material/DialogContentText';
import useHttp from '../../hooks/use-http';
import { ReportContext } from '../../store/report-context';
import { delReport } from '../../lib/api/report';

const DelReportForm = () => {
  const reportCtx = useContext(ReportContext);
  const { handleDelReport, handleCloseDel, openDel, delReportObj } = reportCtx;
  const { data, error, sendRequest, status } = useHttp(delReport);

  const onSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      _id: delReportObj._id,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã xóa báo cáo thành công', 'success');
        handleDelReport(data);
        handleCloseDel();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleDelReport, handleCloseDel]);
  return (
    <Dialog open={openDel}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={onSubmit}>
        <DialogTitle>Cảnh báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn xóa báo cáo này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang xóa' : 'Xác nhận'}
          </Button>
          <Button variant="text" onClick={handleCloseDel}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default DelReportForm;

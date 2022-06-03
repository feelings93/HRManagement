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
import { editReport } from '../../lib/api/report';

const EditReportForm = () => {
  const reportCtx = useContext(ReportContext);
  const { handleEditReport, handleCloseEdit, openEdit, editReportObj } =
    reportCtx;
  const { data, error, sendRequest, status } = useHttp(editReport);

  const onSubmit = (e) => {
    e.preventDefault();
    sendRequest({
      _id: editReportObj._id,
    });
  };

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Bạn đã cập nhật báo cáo thành công', 'success');
        handleEditReport(data);
        handleCloseEdit();
      } else if (error) swal('Thất bại', error, 'error');
    }
  }, [data, status, error, handleEditReport, handleCloseEdit]);
  return (
    <Dialog open={openEdit}>
      {status === 'pending' && <LinearProgress />}
      <form onSubmit={onSubmit}>
        <DialogTitle>Check in</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có muốn cập nhật báo cáo này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={status === 'pending'}
            variant="contained"
            type="submit"
          >
            {status === 'pending' ? 'Đang cập nhật' : 'Xác nhận'}
          </Button>
          <Button variant="text" onClick={handleCloseEdit}>
            Hủy bỏ
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditReportForm;

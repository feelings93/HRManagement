import React, { useContext, useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import useHttp from '../hooks/use-http';

import { getReports } from '../lib/api/report';
import { ReportContext } from '../store/report-context';
import ReportGrid from '../components/report/ReportGrid';
import AddReportForm from '../components/report/AddReportForm';
import EditReportForm from '../components/report/EditReportForm';
import DelReportForm from '../components/report/DelReportForm';
import moment from 'moment';
import swal from 'sweetalert';
import LoadingBox from '../components/UI/LoadingBox';
const types = [
  { id: 1, label: 'Theo khoảng thời gian' },
  { id: 2, label: 'Theo tháng' },
];

const months = [
  { id: 1, label: 'Tháng 1' },
  { id: 2, label: 'Tháng 2' },
  { id: 3, label: 'Tháng 3' },
  { id: 4, label: 'Tháng 4' },
  { id: 5, label: 'Tháng 5' },
  { id: 6, label: 'Tháng 6' },
  { id: 7, label: 'Tháng 7' },
  { id: 8, label: 'Tháng 8' },
  { id: 9, label: 'Tháng 9' },
  { id: 10, label: 'Tháng 10' },
  { id: 11, label: 'Tháng 11' },
  { id: 12, label: 'Tháng 12' },
];

const Holiday = () => {
  const { data, error, status, sendRequest } = useHttp(getReports, true);
  const reportCtx = useContext(ReportContext);
  const { setReports, openAdd, openEdit, openDel, handleOpenAdd } = reportCtx;
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [type, setType] = useState(types[1]);
  const [month, setMonth] = useState(
    months.find((x) => x.id === new Date().getMonth() + 1)
  );
  const applyFilter = () => {
    if (type.id === 1) {
      if (!startDate || !endDate) {
        swal('Thất bại', 'Vui lòng nhập đầy đủ thông tin', 'error');
        return;
      }
      if (!moment(startDate).isBefore(moment(endDate))) {
        swal('Thất bại', 'Ngày bắt đầu phải trước ngày kết thúc', 'error');
        return;
      }
    }

    sendRequest(type.id === 1 ? { startDate, endDate } : { month: month.id });
  };

  useEffect(() => {
    sendRequest({ month: new Date().getMonth() + 1 });
  }, [sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setReports(data);
    }
  }, [data, status, setReports]);

  if (status === 'pending') return <LoadingBox />;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Autocomplete
            value={type}
            onChange={(event, newValue) => {
              setType(newValue);
            }}
            disableClearable
            id="controllable-states-demo"
            getOptionLabel={(option) => option.label}
            options={types}
            sx={{ width: 300 }}
            size="small"
            renderInput={(params) => (
              <TextField
                size="small"
                required
                {...params}
                label="Lọc theo"
                placeholder="Lọc theo"
              />
            )}
          />
          {type.id === 1 && (
            <>
              <TextField
                InputLabelProps={{ shrink: true }}
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
                size="small"
                type="date"
                label="Từ ngày"
              />
              <Typography>-</Typography>
              <TextField
                InputLabelProps={{ shrink: true }}
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
                size="small"
                type="date"
                label="Đến ngày"
              />
            </>
          )}
          {type.id === 2 && (
            <>
              <Autocomplete
                value={month}
                onChange={(event, newValue) => {
                  setMonth(newValue);
                }}
                id="controllable-states-demo"
                getOptionLabel={(option) => option.label}
                options={months}
                disableClearable
                sx={{ width: 150 }}
                size="small"
                renderInput={(params) => (
                  <TextField
                    size="small"
                    required
                    {...params}
                    label="Tháng"
                    placeholder="tháng"
                  />
                )}
              />
            </>
          )}
          <Button onClick={applyFilter} variant="outlined" color="primary">
            Áp dụng
          </Button>
        </Stack>
        <Stack spacing={1} alignItems="center" direction="row">
          <Button
            onClick={handleOpenAdd}
            sx={{ color: '#fff' }}
            variant="contained"
            color="success"
          >
            Thêm
          </Button>
        </Stack>
      </Stack>
      <ReportGrid />
      {openAdd && <AddReportForm applyFilter={applyFilter} />}
      {openEdit && <EditReportForm />}
      {openDel && <DelReportForm />}
    </>
  );
};

export default Holiday;

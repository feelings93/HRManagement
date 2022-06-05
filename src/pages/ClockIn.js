import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { getClockIns } from '../lib/api/clockIn';
import { ClockInsContext } from '../store/clock-ins-context';
import AddClockInForm from '../components/clock-in/AddClockInForm';
import EditClockInForm from '../components/clock-in/EditClockInForm';
import DelClockInForm from '../components/clock-in/DelClockInForm';
import ClockInGrid from '../components/clock-in/ClockInGrid';
import LoadingBox from '../components/UI/LoadingBox';

const ClockIn = () => {
  const { data, error, status, sendRequest } = useHttp(getClockIns, true);
  const holidayCtx = useContext(ClockInsContext);
  const { setClockIns, openAdd, openEdit, openDel, setQuery, query } =
    holidayCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setClockIns(data.map((x, index) => ({ ...x, stt: index + 1 })));
    }
  }, [data, status, setClockIns]);

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
        <h3>Chấm công ngày</h3>
        <Stack spacing={1} alignItems="center" direction="row">
          <TextField
            size="small"
            id="search"
            label="Tìm kiếm nhân viên"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
      <ClockInGrid />
      {openAdd && <AddClockInForm />}
      {openEdit && <EditClockInForm />}
      {openDel && <DelClockInForm />}
    </>
  );
};

export default ClockIn;

import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';

import { getHolidays } from '../lib/api/holiday';
import { HolidayContext } from '../store/holiday-context';
import AddHolidayForm from '../components/holiday/AddHolidayForm';
import HolidayGrid from '../components/holiday/HolidayGrid';
import EditHolidayForm from '../components/holiday/EditHolidayForm';
import DelHolidayForm from '../components/holiday/DelHolidayForm';
import LoadingBox from '../components/UI/LoadingBox';

const Holiday = () => {
  const { data, error, status, sendRequest } = useHttp(getHolidays, true);
  const holidayCtx = useContext(HolidayContext);
  const {
    setHolidays,
    openAdd,
    openEdit,
    openDel,
    handleOpenAdd,
    setQuery,
    query,
  } = holidayCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setHolidays(data);
    }
  }, [data, status, setHolidays]);

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
        <h3>Ngày nghỉ lễ</h3>
        <Stack spacing={1} alignItems="center" direction="row">
          <TextField
            size="small"
            id="search"
            label="Tìm kiếm"
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
      <HolidayGrid />
      {openAdd && <AddHolidayForm />}
      {openEdit && <EditHolidayForm />}
      {openDel && <DelHolidayForm />}
    </>
  );
};

export default Holiday;

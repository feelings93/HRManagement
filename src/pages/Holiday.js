import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
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

const Holiday = () => {
  const { data, error, status, sendRequest } = useHttp(getHolidays, true);
  const holidayCtx = useContext(HolidayContext);
  const { setHolidays, openAdd, openEdit, handleOpenAdd, setQuery, query } =
    holidayCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setHolidays(data.map((x, index) => ({ ...x, stt: index + 1 })));
    }
  }, [data, status, setHolidays]);

  if (status === 'pending') return <h1>Loading...</h1>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Typography>Ngày nghỉ lễ</Typography>
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
    </>
  );
};

export default Holiday;

import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { HolidayContext } from '../../store/holiday-context';
import moment from 'moment';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const HolidayGrid = () => {
  const holidayCtx = useContext(HolidayContext);
  const { searchHolidays, handleChangeEditHoliday, handleChangeDelHoliday } =
    holidayCtx;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Tên dịp lễ',
      width: 200,
      editable: false,
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      valueGetter: (params) => {
        return moment(params.row.startDate).format('DD-MM-yyyy', true);
      },
      width: 200,
      editable: false,
    },
    {
      field: 'repeatYearly',
      headerName: 'Lặp lại hằng năm',
      valueGetter: (params) => (params.row.repeatYearly ? 'Có' : 'Không'),
      width: 200,
      editable: false,
    },
    {
      field: 'numberOfDaysOff',
      headerName: 'Số ngày nghỉ',
      width: 130,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 150,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton onClick={partial(handleChangeEditHoliday, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelHoliday, params.row)}>
              <Delete />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <div style={{ height: 500, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyleGrid
            getRowId={(row) => row._id}
            columns={columns}
            rows={searchHolidays.map((x, index) => ({ ...x, stt: index + 1 }))}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};
export default HolidayGrid;

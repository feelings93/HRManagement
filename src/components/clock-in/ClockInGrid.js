import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';

import { Delete, Login, Logout } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { ClockInsContext } from '../../store/clock-ins-context';
import moment from 'moment';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const ClockInGrid = () => {
  const {
    clockIns,
    handleChangeDelClockIn,
    handleChangeEditClockIn,
    handleChangeAddClockIn,
  } = useContext(ClockInsContext);
  const columns = [
    {
      field: '_id',
      headerName: 'Id',
      editable: false,
      width: 70,
    },
    {
      field: 'name',
      headerName: 'Tên nhân viên',
      editable: false,
      width: 200,
    },
    {
      field: 'late',
      headerName: 'Đi muộn',

      renderCell: (params) => {
        return (
          <Chip
            color={params.row.late ? 'error' : 'info'}
            variant="outlined"
            label={params.row.late ? 'Có' : 'Không'}
          />
        );
      },
      editable: false,
      width: 120,
    },
    {
      field: 'clockedIn',
      headerName: 'Giờ checkin',
      valueGetter: (params) => {
        if (!params.row.clockedIn) return 'Chưa checkin';
        return moment(params.row.clockedIn).format('HH:mm');
      },
      width: 150,
      editable: false,
    },
    {
      field: 'clockedOut',
      headerName: 'Giờ checkout',
      valueGetter: (params) => {
        if (!params.row.clockedOut) return 'Chưa checkout';
        return moment(params.row.clockedOut).format('HH:mm');
      },
      width: 150,
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
            <IconButton onClick={partial(handleChangeAddClockIn, params.row)}>
              <Login color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeEditClockIn, params.row)}>
              <Logout color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelClockIn, params.row)}>
              <Delete color="primary" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <div style={{ height: '450px', width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <StyleGrid
            getRowId={(row) => row._id}
            columns={columns}
            rows={clockIns}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};
export default ClockInGrid;

import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import moment from 'moment';
import { ReportContext } from '../../store/report-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const ReportGrid = () => {
  const reportCtx = useContext(ReportContext);
  const { searchReports, handleChangeEditReport, handleChangeDelReport } =
    reportCtx;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
    },
    {
      field: 'compileDate',
      headerName: 'Từ ngày',
      valueGetter: (params) => {
        return moment(params.row.compileDate).format('DD-MM-yyyy', true);
      },
      width: 150,
      editable: false,
    },
    {
      field: 'compiledUpTo',
      headerName: 'Đến ngày',
      valueGetter: (params) => {
        return moment(params.row.compiledUpTo).format('DD-MM-yyyy', true);
      },
      width: 150,
      editable: false,
    },
    {
      field: 'late',
      headerName: 'Lượt trễ',
      width: 100,
      editable: false,
    },
    {
      field: 'leaves',
      headerName: 'Lượt nghỉ',
      width: 100,
      editable: false,
    },
    {
      field: 'absent',
      headerName: 'Lượt vắng',
      width: 100,
      editable: false,
    },
    {
      field: 'newHires',
      headerName: 'Mới vào làm',
      width: 100,
      editable: false,
    },
    {
      field: 'resignations',
      headerName: 'Từ chức',
      width: 80,
      editable: false,
    },
    {
      field: 'totalStaff',
      headerName: 'Tổng nhân viên',
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
            <IconButton onClick={partial(handleChangeEditReport, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelReport, params.row)}>
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
            rows={searchReports.map((x, index) => ({ ...x, stt: index + 1 }))}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};
export default ReportGrid;

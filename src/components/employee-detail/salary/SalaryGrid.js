import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../../UI/StyleGrid/StyleGrid';
import moment from 'moment';
import { EmployeeSalariesContext } from '../../../store/employee-salaries-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const SalaryGrid = () => {
  const salaryContext = useContext(EmployeeSalariesContext);
  const { salaries, handleChangeEditSalary, handleChangeDelSalary } =
    salaryContext;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
    },
    {
      field: 'payday',
      headerName: 'Ngày trả',
      valueGetter: (params) => {
        return moment(params.row.payday).format('DD-MM-yyyy');
      },
      width: 200,
      editable: false,
    },
    {
      field: 'otSalary',
      headerName: 'Lương OT',
      width: 150,
      editable: false,
    },
    {
      field: 'salary',
      headerName: 'Lương chính',
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
            <IconButton onClick={partial(handleChangeEditSalary, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelSalary, params.row)}>
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
            rows={salaries.map((item, index) => ({
              ...item,
              stt: index + 1,
            }))}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};
export default SalaryGrid;

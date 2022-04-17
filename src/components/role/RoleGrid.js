import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Switch from '@mui/material/Switch';
import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
//import { EmployeeContext } from '../../store/employee-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const RoleGrid = () => {
  //const employeeCtx = useContext(EmployeeContext);
  // const {
  //   searchEmployees,
  //   handleChangeEditEmployee,
  //   handleChangeDelEmployee,
  //   handleChangeActiveEmployee,
  // } = employeeCtx;
  const columns = [
    {
      field: 'id',
      headerName: 'Id',
      editable: false,
    },
    {
      field: 'name',
      headerName: 'Tên chức vụ',
      width: 200,
      editable: false,
    },
    {
      field: 'baseSalary',
      headerName: 'Lương cơ bản',
      width: 200,
      editable: false,
    },
    {
      field: 'paymentMethod',
      headerName: 'Cách tính lương',
      width: 200,
      editable: false,
    },
    {
      field: 'OtMultiplier',
      headerName: 'Hệ số',
      width: 100,
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
            {/* <IconButton onClick={partial(handleChangeEditEmployee, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <Switch
              checked={params.row.actived}
              onChange={handleChangeActiveEmployee.bind(null, params.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            /> */}
            {/* <IconButton onClick={partial(handleChangeDelEmployee, params.row)}>
              <Delete />
            </IconButton> */}
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
            columns={columns}
            //rows={searchEmployees}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
          />
        </div>
      </div>
    </div>
  );
};

export default RoleGrid;

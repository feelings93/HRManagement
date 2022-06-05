import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { EmployeeContext } from '../../store/employee-context';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const EmployeeGrid = () => {
  const navigate = useNavigate();
  const employeeCtx = useContext(EmployeeContext);
  const { searchEmployees, handleChangeEditEmployee, handleChangeDelEmployee } =
    employeeCtx;
  const columns = [
    {
      field: 'workID',
      valueGetter: (params) =>
        (params.row.role?.idPrefix || '') +
        params.row.workID +
        (params.row.role?.idPostfix || ''),
      headerName: 'Id',
      editable: false,
      width: 100,
    },
    {
      field: 'name',
      headerName: 'Họ tên',
      valueGetter: (params) => params.row.lastName + ' ' + params.row.firstName,
      width: 200,
      editable: false,
    },
    {
      field: 'role',
      headerName: 'Chức vụ',
      valueGetter: (params) => params.row.role?.name || 'Chưa có',
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'gender',
      headerName: 'Giới tính',
      valueGetter: (params) => (params.row.gender === 1 ? 'Nam' : 'Nữ'),
      width: 80,
      editable: false,
      sortable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 200,
      editable: false,
      sortable: false,
    },
    {
      field: 'phone',
      headerName: 'SĐT',
      width: 130,
      editable: false,
      sortable: false,
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      valueGetter: (params) => {
        return moment(params.row.startDate).format('DD-MM-yyyy', true);
      },
      width: 150,
      editable: false,
      sortable: false,
    },
    {
      field: 'paymentDue',
      headerName: 'Đến hạn trả lương',
      renderCell: (params) => {
        return (
          <Chip
            color={params.row.paymentDue === false ? 'error' : 'info'}
            variant="outlined"
            label={params.row.paymentDue === false ? 'Chưa' : 'Đã đến'}
          />
        );
      },
      width: 170,
      editable: false,
      sortable: false,
    },
    {
      field: 'resignDate',
      headerName: 'Ngày thôi việc',
      valueGetter: (params) => {
        if (!params.row.resignDate) return 'Chưa xác định';
        return moment(params.row.resignDate).format('DD-MM-yyyy', true);
      },
      width: 150,
      editable: false,
      sortable: false,
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
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleChangeEditEmployee(params.row);
              }}
            >
              <Edit color="primary" />
            </IconButton>
            {/* <Switch
              checked={params.row.actived}
              onChange={handleChangeActiveEmployee.bind(null, params.row)}
              inputProps={{ 'aria-label': 'controlled' }}
            /> */}
            <IconButton
              onClick={(event) => {
                event.stopPropagation();
                handleChangeDelEmployee(params.row);
              }}
            >
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
            rows={searchEmployees}
            disableSelectionOnClick
            disableColumnMenu
            rowsPerPageOptions={[5, 25, 50]}
            onCellClick={(params, event) => {
              event.stopPropagation();
              navigate(params.row._id);
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default EmployeeGrid;

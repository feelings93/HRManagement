import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { RoleContext } from '../../store/role-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const RoleGrid = () => {
  const roleCtx = useContext(RoleContext);
  const {
    searchRoles,
    handleChangeEditRole,
    handleChangeDelRole,
  } = roleCtx;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
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
      field: 'paymentPeriod',
      headerName: 'Cách tính lương',
      valueGetter: (params) => (params.row.paymentPeriod === 1 ? 'Theo tuần' : 'Theo tháng'),
      width: 200,
      editable: false,
    },
    {
      field: 'otMultiplier',
      headerName: 'Hệ số',
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
            <IconButton onClick={partial(handleChangeEditRole, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelRole, params.row)}>
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
            rows={searchRoles}
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

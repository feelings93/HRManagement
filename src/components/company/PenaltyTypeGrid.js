import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete } from '@mui/icons-material';
import StyleGrid from '../UI/StyleGrid/StyleGrid';
import { CompanyContext } from '../../store/company-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const PenaltyTypeGrid = () => {
  const { company, handleChangeDelType } = useContext(CompanyContext);
  const columns = [
    {
      field: '_id',
      headerName: 'Id',
      editable: false,
      width: 50,
    },
    {
      field: 'name',
      headerName: 'Tên loại vi phạm',
      width: 150,
      editable: false,
    },
    {
      field: 'action',
      headerName: 'Thao tác',
      headerAlign: 'center',
      align: 'center',
      sortable: false,
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <Stack direction="row">
            <IconButton onClick={partial(handleChangeDelType, params.row)}>
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
            rows={(company?.rule?.penaltyTypes || []).map((type, index) => ({
              _id: index + 1,
              name: type,
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
export default PenaltyTypeGrid;

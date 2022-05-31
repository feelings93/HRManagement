import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../../UI/StyleGrid/StyleGrid';
import moment from 'moment';
import { EmployeePenaltiesContext } from '../../../store/employee-penalties-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const PenaltyGrid = () => {
  const penaltyContext = useContext(EmployeePenaltiesContext);
  const { searchPenalties, handleChangeEditPenalty, handleChangeDelPenalty } =
    penaltyContext;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
    },
    {
      field: 'type',
      headerName: 'Loại vi phạm',
      width: 200,
      editable: false,
    },
    {
      field: 'occurredAt',
      headerName: 'Thời điểm vi phạm',
      valueGetter: (params) => {
        return moment(params.row.occurredAt).format('DD-MM-yyyy HH:mm', true);
      },
      width: 200,
      editable: false,
    },
    {
      field: 'deduction',
      headerName: 'Tiền phạt',
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
            <IconButton onClick={partial(handleChangeEditPenalty, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelPenalty, params.row)}>
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
            rows={searchPenalties.map((item, index) => ({
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
export default PenaltyGrid;

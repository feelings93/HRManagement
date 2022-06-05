import React, { useContext } from 'react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { Delete, Edit } from '@mui/icons-material';
import StyleGrid from '../../UI/StyleGrid/StyleGrid';
import moment from 'moment';
import { EmployeeLeavesContext } from '../../../store/employee-leaves-context';

function partial(fn, ...args) {
  return fn.bind(fn, ...args);
}

const LeaveGrid = () => {
  const leaveContext = useContext(EmployeeLeavesContext);
  const { searchLeaves, handleChangeEditLeave, handleChangeDelLeave } =
    leaveContext;
  const columns = [
    {
      field: 'stt',
      headerName: 'STT',
      editable: false,
      width: 100,
    },
    {
      field: 'leaveType',
      headerName: 'Loại ngày nghỉ',
      valueGetter: (params) => {
        switch (params.row.leaveType) {
          case 'Unpaid':
            return 'Nghỉ không lương';
          case 'Sabbatical':
            return 'Nghỉ phép';
          case 'Compensatory':
            return 'Nghỉ bù';
          case 'Bereavement':
            return 'Nghỉ tang';
          case 'Paternity':
            return 'Nghỉ thai sản (cha)';
          case 'Maternity':
            return 'Nghỉ thai sản (mẹ)';
          case 'ReligiousHolidays':
            return 'Ngày lễ tôn giáo';
          case 'PublicHolidays':
            return 'Ngày lễ';
          case 'Casual':
            return 'Nghỉ bình thường';
          case 'Sick':
            return 'Nghỉ ốm';
          default:
            return '';
        }
      },
      width: 200,
      editable: false,
    },
    {
      field: 'startDate',
      headerName: 'Ngày bắt đầu',
      valueGetter: (params) => {
        return moment(params.row.occurredAt).format('DD-MM-yyyy');
      },
      width: 200,
      editable: false,
    },
    {
      field: 'numberOfDays',
      headerName: 'Số ngày nghỉ',
      width: 130,
      editable: false,
    },
    {
      field: 'reason',
      headerName: 'Lý do',
      width: 200,
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
            <IconButton onClick={partial(handleChangeEditLeave, params.row)}>
              <Edit color="primary" />
            </IconButton>
            <IconButton onClick={partial(handleChangeDelLeave, params.row)}>
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
            rows={searchLeaves.map((item, index) => ({
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
export default LeaveGrid;

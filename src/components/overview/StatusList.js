import React from 'react';
import Grid from '@mui/material/Grid';
import StatusCard from './StatusCard';
import moment from 'moment';

const StatusList = ({ data, role }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon="fa-solid fa-user"
          title="Nhân viên"
          count={data.length}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon="fa-solid fa-user-gear"
          title="Vị trí công việc"
          count={role.length}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon="fa-solid fa-user-check"
          title="Đang làm việc"
          count={
            data.filter(
              (x) =>
                moment(x.startDate).isBefore(moment(new Date())) &&
                (moment(x.resignDate).isBefore(moment(new Date())) ||
                  !x.resignDate)
            ).length
          }
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusCard
          icon="fa-solid fa-user-slash"
          title="Nghỉ việc"
          count={
            data.filter((x) => moment(x.resignDate).isAfter(moment(new Date())))
              .length
          }
        />
      </Grid>
    </Grid>
  );
};

export default StatusList;

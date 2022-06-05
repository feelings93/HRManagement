import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import StatusList from '../components/overview/StatusList';
import ReportChart from '../components/overview/ReportChart';
import GenderDonut from '../components/overview/GenderDonut';
import { getEmployees } from '../lib/api/employee';
import { getRoles } from '../lib/api/role';

import useHttp from '../hooks/use-http';
import LoadingBox from '../components/UI/LoadingBox';

const Overview = () => {
  const { sendRequest, status, error, data } = useHttp(getEmployees, true);
  const {
    sendRequest: sendRequestRole,
    status: statusRole,
    error: errorRole,
    data: dataRole,
  } = useHttp(getRoles, true);
  useEffect(() => {
    sendRequest();
    sendRequestRole();
  }, [sendRequest, sendRequestRole]);
  if (status === 'pending' || statusRole === 'pending') return <LoadingBox />;
  if (error || errorRole) return <h1>{error}</h1>;
  return (
    <Grid container spacing={4}>
      <Grid md={6} item>
        <StatusList data={data} role={dataRole} />
      </Grid>
      <Grid item md={6} sm={12}>
        <GenderDonut data={data} />
      </Grid>
      <Grid item sm={12}>
        <ReportChart />
      </Grid>
    </Grid>
  );
};

export default Overview;

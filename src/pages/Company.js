import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../store/auth-context';
import CompanyInfo from '../components/company/CompanyInfo';
import CompanyRule from '../components/company/CompanyRule';

const Company = () => {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12} md={6}>
        <CompanyInfo user={user} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CompanyRule user={user} />
      </Grid>
    </Grid>
  );
};

export default Company;

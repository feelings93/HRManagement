import React, { useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { AuthContext } from '../store/auth-context';
import CompanyInfo from '../components/company/CompanyInfo';
import CompanyRule from '../components/company/CompanyRule';
import useHttp from '../hooks/use-http';
import { getProfile } from '../lib/api/auth';
import { CompanyContext } from '../store/company-context';

const Company = () => {
  const {sendRequest, data, status, error} = useHttp(getProfile, true);
  const {setCompany} = useContext(CompanyContext);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (status === "completed" && data) {
      setCompany(data.company);
    }
  }, [data, setCompany, status])

  if (status === "pending") return <h1>Loading...</h1>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>
  return (
    <Grid spacing={2} container>
      <Grid item xs={12} md={6}>
        <CompanyInfo company={data?.company} />
      </Grid>
      <Grid item xs={12} md={6}>
        <CompanyRule company={data?.company} />
      </Grid>
    </Grid>
  );
};

export default Company;

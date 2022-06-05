import React, { useContext, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CompanyInfo from '../components/company/CompanyInfo';
import CompanyRule from '../components/company/CompanyRule';
import useHttp from '../hooks/use-http';
import { getProfile } from '../lib/api/auth';
import { CompanyContext } from '../store/company-context';
import CompanyPenaltyType from '../components/company/CompanyPenaltyType';
import LoadingBox from '../components/UI/LoadingBox';

const Company = () => {
  const { sendRequest, data, status, error } = useHttp(getProfile, true);
  const { setCompany } = useContext(CompanyContext);
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setCompany(data?.company);
    }
  }, [data, setCompany, status]);

  if (status === 'pending') return <LoadingBox />;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <Grid spacing={2} container>
      <Grid rowGap={2} item xs={12} md={6} container>
        <Grid item xs={12}>
          <CompanyInfo />
        </Grid>
        <Grid item xs={12}>
          <CompanyRule />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6}>
        <CompanyPenaltyType />
      </Grid>
    </Grid>
  );
};

export default Company;

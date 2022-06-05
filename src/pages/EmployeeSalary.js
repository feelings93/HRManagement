import React from 'react';
import { useContext, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useHttp from '../hooks/use-http';
import { useParams } from 'react-router-dom';

import LoadingBox from '../components/UI/LoadingBox';
import { getSalariesByEmployeeID } from '../lib/api/salary';
import { EmployeeSalariesContext } from '../store/employee-salaries-context';
import AddSalaryForm from '../components/employee-detail/salary/AddSalaryForm';
import SalaryGrid from '../components/employee-detail/salary/SalaryGrid';
import EditSalaryForm from '../components/employee-detail/salary/EditSalaryForm';
import DelSalaryForm from '../components/employee-detail/salary/DelSalaryForm';

const EmployeeSalary = () => {
  const params = useParams();
  const { sendRequest, data, error, status } = useHttp(getSalariesByEmployeeID);
  const { setSalaries, handleOpenAdd, openAdd, openDel, openEdit } = useContext(
    EmployeeSalariesContext
  );

  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setSalaries(data);
      console.log(data);
    }
  }, [data, setSalaries, status]);

  if (status === 'pending') return <LoadingBox />;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      <Fab
        onClick={handleOpenAdd}
        sx={{ position: 'fixed', bottom: '32px', right: '32px' }}
        color="primary"
        aria-label="add"
        size="large"
        title="Thêm lịch sử lương"
      >
        <AddIcon sx={{ color: '#fff' }} />
      </Fab>
      <SalaryGrid />
      {openAdd && <AddSalaryForm />}
      {openEdit && <EditSalaryForm />}
      {openDel && <DelSalaryForm />}
    </>
  );
};

export default EmployeeSalary;

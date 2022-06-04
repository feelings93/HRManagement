import React from 'react';
import { useContext, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useHttp from '../hooks/use-http';
import { useParams } from 'react-router-dom';
import { EmployeeLeavesContext } from '../store/employee-leaves-context';
import { getLeavesByEmployeeID } from '../lib/api/leave';
import LeaveGrid from '../components/employee-detail/leave/LeaveGrid';
import AddLeaveForm from '../components/employee-detail/leave/AddLeaveForm';
import DelLeaveForm from '../components/employee-detail/leave/DelLeaveForm';
import EditLeaveForm from '../components/employee-detail/leave/EditLeaveForm';
import LoadingBox from '../components/UI/LoadingBox';

const EmployeePenalties = () => {
  const params = useParams();
  const { sendRequest, data, error, status } = useHttp(getLeavesByEmployeeID);
  const { setLeaves, handleOpenAdd, openAdd, openDel, openEdit } = useContext(
    EmployeeLeavesContext
  );

  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setLeaves(data);
      console.log(data);
    }
  }, [data, setLeaves, status]);

  if (status === 'pending') return <LoadingBox/>;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      <Fab
        onClick={handleOpenAdd}
        sx={{ position: 'fixed', bottom: '32px', right: '32px' }}
        color="primary"
        aria-label="add"
        size="large"
        title="Thêm ngày nghỉ"
      >
        <AddIcon sx={{ color: '#fff' }} />
      </Fab>
      <LeaveGrid />
      {openAdd && <AddLeaveForm />}
      {openEdit && <EditLeaveForm />}
      {openDel && <DelLeaveForm />}
    </>
  );
};

export default EmployeePenalties;

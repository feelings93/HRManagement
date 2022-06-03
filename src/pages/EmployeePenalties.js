import React from 'react';
import { useContext, useEffect } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import useHttp from '../hooks/use-http';
import { getPenaltiesByEmployeeID } from '../lib/api/penalty';
import { EmployeePenaltiesContext } from '../store/employee-penalties-context';
import { useParams } from 'react-router-dom';
import PenaltyGrid from '../components/employee-detail/penalty/PenaltyGrid';
import AddPenaltyForm from '../components/employee-detail/penalty/AddPenaltyForm';
import EditPenaltyForm from '../components/employee-detail/penalty/EditPenaltyForm';
import DelPenaltyForm from '../components/employee-detail/penalty/DelPenaltyForm';

const EmployeePenalties = () => {
  const params = useParams();
  const { sendRequest, data, error, status } = useHttp(
    getPenaltiesByEmployeeID
  );
  const { setPenalties, handleOpenAdd, openAdd, openDel, openEdit } =
    useContext(EmployeePenaltiesContext);

  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);

  useEffect(() => {
    if (status === 'completed' && data) {
      setPenalties(data);
      console.log(data);
    }
  }, [data, setPenalties, status]);

  if (status === 'pending') return <h1>Loading....</h1>;
  if (error) return <h1>{error}</h1>;
  return (
    <>
      <Fab
        onClick={handleOpenAdd}
        sx={{ position: 'fixed', bottom: '32px', right: '32px' }}
        color="primary"
        aria-label="add"
        size="large"
        title="Thêm vi phạm"
      >
        <AddIcon sx={{ color: '#fff' }} />
      </Fab>
      <PenaltyGrid />
      {openAdd && <AddPenaltyForm />}
      {openEdit && <EditPenaltyForm />}
      {openDel && <DelPenaltyForm />}
    </>
  );
};

export default EmployeePenalties;

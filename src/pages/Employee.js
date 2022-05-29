import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { EmployeeContext } from '../store/employee-context';
import AddEmployeeForm from '../components/employee/AddEmployeeForm';
import EditEmployeeForm from '../components/employee/EditEmployeeForm';
import EmployeeGrid from '../components/employee/EmployeeGrid';
import { getEmployees } from '../lib/api/employee';
import DelEmployeeForm from '../components/employee/DelEmployeeForm';

const Employee = () => {
  const { data, error, status, sendRequest } = useHttp(getEmployees, true);
  const employeeCtx = useContext(EmployeeContext);
  const {
    setEmployees,
    openAdd,
    openEdit,
    openDelete,
    handleOpenAdd,
    setQuery,
    query,
  } = employeeCtx;
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  React.useEffect(() => {
    if (status === 'completed' && data) {
      setEmployees(data);
    }
  }, [data, status, setEmployees]);

  if (status === 'pending') return <h1>Loading...</h1>;
  if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Typography>Nhân viên</Typography>
        <Stack spacing={1} alignItems="center" direction="row">
          <TextField
            size="small"
            id="search"
            label="Tìm kiếm"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
          <Button
            onClick={handleOpenAdd}
            sx={{ color: '#fff' }}
            variant="contained"
            color="success"
          >
            Thêm
          </Button>
        </Stack>
      </Stack>
      <EmployeeGrid />
      {openAdd && <AddEmployeeForm />}
      {openEdit && <EditEmployeeForm />}
      {openDelete && <DelEmployeeForm />}
    </>
  );
};

export default Employee;

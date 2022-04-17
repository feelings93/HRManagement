import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Search from '@mui/icons-material/Search';
import useHttp from '../hooks/use-http';
import { RoleContext } from '../store/role-context';
import AddRoleForm from '../components/role/AddRoleForm';
//import EditEmployeeForm from '../components/employee/EditEmployeeForm';
import RoleGrid from '../components/role/RoleGrid';
//import { getEmployees } from '../lib/api/employee';

const Role = () => {
  //const { data, error, status, sendRequest } = useHttp(getEmployees, true);
  const roleCtx = useContext(RoleContext);
  const {
    //setEmployees,
    openAdd,
    //openEdit,
    //openDelete,
    //openActive,
    handleOpenAdd,
    //setQuery,
    //query,
  } = roleCtx;
  // React.useEffect(() => {
  //   sendRequest();
  // }, [sendRequest]);

  // React.useEffect(() => {
  //   if (status === 'completed' && data) {
  //     setEmployees(data);
  //   }
  // }, [data, status, setEmployees]);

  // if (status === 'pending') return <h1>Loading...</h1>;
  // if (error) return <h1>Đã có lỗi xảy ra</h1>;
  return (
    <>
      <Stack
        mb={2}
        justifyContent="space-between"
        alignItems="center"
        direction="row"
      >
        <Typography>Chức vụ</Typography>
        <Stack spacing={1} alignItems="center" direction="row">
          <TextField
            size="small"
            id="search"
            label="Tìm kiếm"
            //value={query}
            onChange={(e) => {
              //setQuery(e.target.value);
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
      <RoleGrid />
      
      {openAdd && <AddRoleForm />}
      {/* {openEdit && <EditEmployeeForm />} */}
    </>
  );
};

export default Role;

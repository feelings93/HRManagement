import React, { useContext } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, green } from '@mui/material/colors';
import Login from './pages/Login';
import MainLayout from './pages/MainLayout';
import Overview from './pages/Overview';
import Employee from './pages/Employee';
import Department from './pages/Department';
import Rule from './pages/Rule';
import Report from './pages/Report';
import { AuthContext } from './store/auth-context';
import { getProfile } from './lib/api/auth';
import useHttp from './hooks/use-http';
import EmployeeContextProvider from './store/employee-context';
import Register from './pages/Register';
import HolidayContextProvider from './store/holiday-context';
import Holiday from './pages/Holiday';

const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    success: {
      main: green[500],
    },
  },
  typography: {
    fontFamily: 'Inter, san-serif',
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: {
            variant: 'contained',
            style: {
              color: '#fff',
            },
          },
        },
      ],
    },
  },
});

function PrivateOutlet() {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;
  console.log(user);
  return user ? <Outlet /> : <Navigate to="login" />;
}

function RedirectWhenSignedInRoute() {
  const authCtx = useContext(AuthContext);
  const { user } = authCtx;

  return !user ? <Outlet /> : <Navigate to="/" />;
}

function App() {


  const authCtx = useContext(AuthContext);
  const { setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(
    getProfile,
  );
  React.useEffect(() => {
    sendRequest();
  }, [ sendRequest, setUser]);
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setUser(data);
      } else setUser(null);
    }
  }, [data, setUser, status]);
  if (status === 'pending') return <h1>Loading...</h1>;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<RedirectWhenSignedInRoute />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateOutlet />}>
          <Route exact path="/" element={<MainLayout />}>
            <Route exact path="" element={<Navigate to="overview" />} />
            <Route exact path="overview" element={<Overview />} />
            <Route
              exact
              path="employee"
              element={
                <EmployeeContextProvider>
                  <Employee />
                </EmployeeContextProvider>
              }
            />
            <Route
              exact
              path="holiday"
              element={
                <HolidayContextProvider>
                  <Holiday />
                </HolidayContextProvider>
              }
            />
            <Route exact path="department" element={<Department />} />
            <Route exact path="rule" element={<Rule />} />
            <Route exact path="report" element={<Report />} />
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

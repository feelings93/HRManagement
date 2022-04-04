import React from 'react';
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
import useAuth from './hooks/use-auth';

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
  const [auth, , status] = useAuth();
  if (status === 'pending') return <h1>Loading</h1>;
  return auth ? <Outlet /> : <Navigate to="login" />;
}

function RedirectWhenSignedInRoute() {
  console.log(useAuth());
  const [auth, , status] = useAuth();

  if (status === 'pending') return <h1>Loading</h1>;
  return !auth ? <Outlet /> : <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route element={<RedirectWhenSignedInRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route element={<PrivateOutlet />}>
          <Route exact path="/" element={<MainLayout />}>
            <Route exact path="" element={<Navigate to="overview" />} />
            <Route exact path="overview" element={<Overview />} />
            <Route exact path="employee" element={<Employee />} />
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

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from 'react';
import useHttp from './use-http';
import { getProfile } from '../lib/api/auth';
import { AuthContext } from '../store/auth-context';
const useAuth = () => {
  if (!localStorage.getItem('accessToken')) return [false, false, 'completed'];

  const authCtx = useContext(AuthContext);
  const [admin, setAdmin] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const { setUser } = authCtx;
  const { data, status, sendRequest } = useHttp(getProfile, true);
  
  React.useEffect(() => {
    sendRequest();
  }, [sendRequest]);
  React.useEffect(() => {
    if (status === 'completed') {
      if (data) {
        setAuth(true);
        setUser(data);
        if (data.role === 'admin') setAdmin(true);
        else setAdmin(false);
      } else setAuth(false);
    }
  }, [setAuth, data, status, setUser]);
  return [auth, admin, status];
};
export default useAuth;

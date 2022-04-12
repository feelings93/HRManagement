import React from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({
  user: null,
  setUser: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  console.log(user);
  const contextValue = {
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
AuthContextProvider.propTypes = {
  children: PropTypes.element,
};
export default AuthContextProvider;

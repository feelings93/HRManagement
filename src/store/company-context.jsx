import React from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useMemo } from 'react';

export const CompanyContext = React.createContext({
  company: null,
  setCompany: () => {},
  handleChangeRule: () => {},
});

const CompanyContextProvider = ({ children }) => {
  const [company, setCompany] = React.useState(null);

  const handleChangeRule = useCallback((rule) => {
    setCompany((prev) => ({ ...prev, rule }));
  }, []);

  const contextValue = useMemo(
    () => ({
      company,
      setCompany,
      handleChangeRule,
    }),
    [company, handleChangeRule]
  );
  return (
    <CompanyContext.Provider value={contextValue}>
      {children}
    </CompanyContext.Provider>
  );
};
CompanyContextProvider.propTypes = {
  children: PropTypes.element,
};
export default CompanyContextProvider;

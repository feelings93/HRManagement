import React from 'react';
import PropTypes from 'prop-types';

export const CompanyContext = React.createContext({
  company: null,
  setCompany: () => {},
  handleChangeInfoCompany: () => {}
});

const CompanyContextProvider = ({ children }) => {
  const [company, setCompany] = React.useState(null);


  const contextValue = {
    company,
    setCompany,
  };
  return (
    <CompanyContext.Provider value={contextValue}>{children}</CompanyContext.Provider>
  );
};
CompanyContextProvider.propTypes = {
  children: PropTypes.element,
};
export default CompanyContextProvider;

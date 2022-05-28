import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useMemo } from 'react';

export const CompanyContext = React.createContext({
  company: null,
  openAddType: false,
  openDelType: false,
  handleOpenAdd: () => {},
  handleOpenDel: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  setCompany: () => {},
  handleChangeRule: () => {},
  handleChangeType: () => {},
  delType: null,
  handleChangeDelType: () => {},
});

const CompanyContextProvider = ({ children }) => {
  const [company, setCompany] = useState(null);
  const [openAddType, setOpenAddType] = useState(false);
  const [openDelType, setOpenDelType] = useState(false);
  const [delType, setDelType] = useState(null);
  const handleOpenAdd = useCallback(() => {
    setOpenAddType(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAddType(false);
  }, []);

  const handleOpenDel = useCallback(() => {
    setOpenDelType(true);
  }, []);

  const handleCloseDel = useCallback(() => {
    setOpenDelType(false);
  }, []);

  const handleChangeRule = useCallback((rule) => {
    setCompany((prev) => ({ ...prev, rule }));
  }, []);

  const handleChangeType = useCallback((penaltyTypes) => {
    setCompany((prev) => ({ ...prev, rule: { ...prev.rule, penaltyTypes } }));
  }, []);

  const handleChangeDelType = useCallback(
    (penaltyType) => {
      setDelType(penaltyType);
      handleOpenDel();
    },
    [handleOpenDel]
  );

  const contextValue = useMemo(
    () => ({
      company,
      setCompany,
      handleChangeRule,
      delType,
      openAddType,
      openDelType,
      handleOpenAdd,
      handleOpenDel,
      handleCloseAdd,
      handleCloseDel,
      handleChangeType,
      handleChangeDelType,
    }),
    [company, delType, handleChangeDelType, handleChangeRule, handleChangeType, handleCloseAdd, handleCloseDel, handleOpenAdd, handleOpenDel, openAddType, openDelType]
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

import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const EmployeeSalariesContext = React.createContext({
  salaries: [],
  searchSalaries: [],
  setSalaries: () => {},
  query: '',
  setQuery: () => {},
  handleAddSalary: () => {},
  handleEditSalary: () => {},
  handleDelSalary: () => {},
  editSalaryObj: {},
  delSalaryObj: {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  handleChangeEditSalary: () => {},
  handleChangeDelSalary: () => {},
});

const EmployeeSalariesContextProvider = (props) => {
  const { children } = props;
  const [salaries, setSalaries] = useState([]);
  const [searchSalaries, setSearchSalaries] = useState([]);
  const [query, setQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editSalary, setSalary] = useState(null);
  const [delSalary, setDelSalary] = useState(null);

  const handleAddSalary = useCallback((salary) => {
    if (salary.createdSalary)
      setSalaries((prev) => [...prev, salary.createdSalary]);
    else setSalaries((prev) => [...prev, salary]);
  }, []);

  const handleEditSalary = useCallback(
    (salary) => {
      const newSalaries = salaries.map((item) => {
        if (item._id === salary._id) {
          return salary;
        }
        return item;
      });
      console.log(newSalaries);
      setSalaries(newSalaries);
    },
    [salaries]
  );

  const handleDelSalary = useCallback(
    (salary) => {
      const newSalaries = salaries.filter((item) => item._id !== salary._id);
      setSalaries(newSalaries);
    },
    [salaries]
  );

  const handleChangeEditSalary = useCallback((salary) => {
    setSalary(salary);
    setOpenEdit(true);
  }, []);

  const handleOpenEdit = useCallback(() => {
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const handleCloseDel = useCallback(() => {
    setOpenDel(false);
  }, []);

  const handleChangeDelSalary = useCallback((salary) => {
    setDelSalary(salary);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchSalaries(salaries);
    } else {
      setSearchSalaries(
        salaries.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [salaries, query]);

  const contextValue = useMemo(
    () => ({
      salaries,
      searchSalaries,
      setSalaries,
      query,
      setQuery,
      editSalaryObj: editSalary,
      delSalaryObj: delSalary,
      handleChangeEditSalary,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelSalary,
      handleAddSalary,
      handleEditSalary,
      handleDelSalary,
    }),
    [
      salaries,
      searchSalaries,
      query,
      editSalary,
      delSalary,
      handleChangeEditSalary,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelSalary,
      handleAddSalary,
      handleEditSalary,
      handleDelSalary,
    ]
  );

  return (
    <EmployeeSalariesContext.Provider value={contextValue}>
      {children}
    </EmployeeSalariesContext.Provider>
  );
};

EmployeeSalariesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default EmployeeSalariesContextProvider;

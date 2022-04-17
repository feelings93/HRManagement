import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const RoleContext = React.createContext({
  roles: [],
  // searchEmployees: [],
  // setEmployees: () => {},
  // query: '',
  // setQuery: () => {},
  // handleAddEmployee: () => {},
  // handleEditEmployee: () => {},
  // editEmployeeObj: {},
  // delEmployeeObj: {},
  // activeEmployeeObj: {},
  // setEditEmployee: () => {},
  // openEdit: false,
  openAdd: false,
  // openDelete: false,
  // openActive: false,
  // handleOpenEdit: () => {},
  // handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  // handleOpenDelete: () => {},
  // handleCloseDelete: () => {},
  // handleOpenActive: () => {},
  // handleCloseActive: () => {},
  // handleChangeEditEmployee: () => {},
  // handleChangeDelEmployee: () => {},
  // handleDelEmployee: () => {},
  // handleChangeActiveEmployee: () => {},
  // handleActiveEmployee: () => {},
});

const RoleContextProvider = (props) => {
  const { children } = props;
  // const [employees, setEmployees] = useState([]);
  // const [searchEmployees, setSearchEmployees] = React.useState([]);
  // const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  // const [openEdit, setOpenEdit] = React.useState(false);
  // const [openDelete, setOpenDelete] = React.useState(false);
  // const [openActive, setOpenActive] = React.useState(false);
  // const [editEmployee, setEditEmployee] = React.useState(null);
  // const [delEmployee, setDelEmployee] = React.useState(null);
  // const [activeEmployee, setActiveEmployee] = React.useState(null);

  // const handleAddEmployee = useCallback((role) => {
  //   setEmployees((prev) => [...prev, role]);
  // }, []);

  // const handleEditEmployee = useCallback(
  //   (employee) => {
  //     const newEmployees = employees.map((item) => {
  //       if (item.id === employee.id) {
  //         return employee;
  //       }
  //       return item;
  //     });

  //     console.log(newEmployees);
  //     setEmployees(newEmployees);
  //   },
  //   [employees]
  // );

  // const handleDelEmployee = useCallback(
  //   (employee) => {
  //     const newEmployees = employees.filter((item) => item.id !== employee.id);

  //     console.log(newEmployees);
  //     setEmployees(newEmployees);
  //   },
  //   [employees]
  // );
  // const handleChangeEditEmployee = useCallback((employee) => {
  //   setEditEmployee(employee);
  //   setOpenEdit(true);
  // }, []);
  // const handleChangeDelEmployee = useCallback((employee) => {
  //   setDelEmployee(employee);
  //   setOpenDelete(true);
  // }, []);

  // const handleChangeActiveEmployee = useCallback((employee) => {
  //   setActiveEmployee(employee);
  //   setOpenActive(true);
  // }, []);

  // const handleOpenEdit = useCallback(() => {
  //   setOpenEdit(true);
  // }, []);

  // const handleCloseEdit = useCallback(() => {
  //   setOpenEdit(false);
  // }, []);

  const handleOpenAdd = useCallback(() => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  // const handleOpenDelete = useCallback(() => {
  //   setOpenDelete(true);
  // }, []);

  // const handleCloseDelete = useCallback(() => {
  //   setOpenDelete(false);
  // }, []);

  // const handleOpenActive = useCallback(() => {
  //   setOpenActive(true);
  // }, []);

  // const handleCloseActive = useCallback(() => {
  //   setOpenActive(false);
  // }, []);

  // React.useEffect(() => {
  //   if (query === '' || !query) {
  //     setSearchEmployees(employees);
  //   } else {
  //     setSearchEmployees(
  //       employees.filter((x) =>
  //         x.name.toUpperCase().includes(query.toUpperCase())
  //       )
  //     );
  //   }
  // }, [employees, query]);

  const contextValue = useMemo(
    () => ({
      // employees,
      // searchEmployees,
      // setEmployees,
      // query,
      // setQuery,
      // editEmployeeObj: editEmployee,
      // delEmployeeObj: delEmployee,
      // activeEmployeeObj: activeEmployee,
      // handleChangeEditEmployee,
      // openEdit,
      openAdd,
      // openDelete,
      // openActive,
      handleCloseAdd,
      // handleCloseEdit,
      handleOpenAdd,
      // handleOpenEdit,
      // handleOpenDelete,
      // handleCloseDelete,
      // handleOpenActive,
      // handleCloseActive,
      // handleAddEmployee,
      // handleEditEmployee,
      // handleChangeDelEmployee,
      // handleChangeActiveEmployee,
      // handleDelEmployee,
    }),
    [
      // employees,
      // query,
      // searchEmployees,
      // editEmployee,
      // delEmployee,
      // activeEmployee,
      // handleAddEmployee,
      // handleChangeEditEmployee,
      handleCloseAdd,
      // handleCloseDelete,
      // handleCloseEdit,
      // handleCloseActive,
      // handleEditEmployee,
      handleOpenAdd,
      // handleOpenDelete,
      // handleOpenEdit,
      // handleOpenActive,
      // handleChangeDelEmployee,
      // handleChangeActiveEmployee,
      // handleDelEmployee,
      // openActive,
      openAdd,
      // openDelete,
      // openEdit,
    ]
  );

  return (
    <RoleContext.Provider value={contextValue}>
      {children}
    </RoleContext.Provider>
  );
};

RoleContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RoleContextProvider;

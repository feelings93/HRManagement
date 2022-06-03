import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const EmployeeLeavesContext = React.createContext({
  leaves: [],
  searchLeaves: [],
  setLeaves: () => {},
  query: '',
  setQuery: () => {},
  handleAddLeave: () => {},
  handleEditLeave: () => {},
  handleDelLeave: () => {},
  editLeaveObj: {},
  delLeaveObj: {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  handleChangeEditLeave: () => {},
  handleChangeDelLeave: () => {},
});

const EmployeeLeavesContextProvider = (props) => {
  const { children } = props;
  const [leaves, setLeaves] = useState([]);
  const [searchLeaves, setSearchLeaves] = useState([]);
  const [query, setQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editLeave, setLeave] = useState(null);
  const [delLeave, setDelLeave] = useState(null);

  const handleAddLeave = useCallback((leave) => {
    setLeaves((prev) => [...prev, leave]);
  }, []);

  const handleEditLeave = useCallback(
    (leave) => {
      const newLeaves = leaves.map((item) => {
        if (item._id === leave._id) {
          return leave;
        }
        return item;
      });
      console.log(newLeaves);
      setLeaves(newLeaves);
    },
    [leaves]
  );

  const handleDelLeave = useCallback(
    (leave) => {
      const newLeaves = leaves.filter(
        (item) => item._id !== leave._id
      );
      setLeaves(newLeaves);
    },
    [leaves]
  );

  const handleChangeEditLeave = useCallback((leave) => {
    setLeave(leave);
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

  const handleChangeDelLeave = useCallback((leave) => {
    setDelLeave(leave);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchLeaves(leaves);
    } else {
      setSearchLeaves(
        leaves.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [leaves, query]);

  const contextValue = useMemo(
    () => ({
      leaves,
      searchLeaves,
      setLeaves,
      query,
      setQuery,
      editLeaveObj: editLeave,
      delLeaveObj: delLeave,
      handleChangeEditLeave,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelLeave,
      handleAddLeave,
      handleEditLeave,
      handleDelLeave
    }),
    [leaves, searchLeaves, query, editLeave, delLeave, handleChangeEditLeave, openEdit, openAdd, openDel, handleCloseAdd, handleCloseEdit, handleOpenAdd, handleOpenEdit, handleCloseDel, handleChangeDelLeave, handleAddLeave, handleEditLeave, handleDelLeave]
  );

  return (
    <EmployeeLeavesContext.Provider value={contextValue}>
      {children}
    </EmployeeLeavesContext.Provider>
  );
};

EmployeeLeavesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default EmployeeLeavesContextProvider;

import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const ClockInsContext = React.createContext({
  clockIns: [],
  setClockIns: () => {},
  searchClockIns: [],
  query: '',
  setQuery: () => {},
  handleAddClockIn: () => {},
  handleEditClockIn: () => {},
  handleDelClockIn: () => {},
  editClockInObj: {},
  delClockInObj: {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  handleChangeEditClockIn: () => {},
  handleChangeDelClockIn: () => {},
  handleChangeAddClockIn: () => {},
});

const ClockInsContextProvider = (props) => {
  const { children } = props;
  const [clockIns, setClockIns] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [addClockIn, setAddClockIn] = useState(null);
  const [editClockIn, setEditClockIn] = useState(null);
  const [delClockIn, setDelClockIn] = useState(null);
  const [searchClockIns, setSearchClockIns] = useState([]);
  const [query, setQuery] = React.useState('');

  const handleAddClockIn = useCallback((clockIn) => {
    setClockIns((prev) => [...prev, clockIn]);
  }, []);

  const handleEditClockIn = useCallback(
    (clockIn) => {
      const newClockIns = clockIns.map((item) => {
        if (item._id === clockIn._id) {
          return clockIn;
        }
        return item;
      });
      console.log(newClockIns);
      setClockIns(newClockIns);
    },
    [clockIns]
  );

  const handleDelClockIn = useCallback(
    (clockIn) => {
      const newClockIns = clockIns.filter((item) => item._id !== clockIn._id);
      setClockIns(newClockIns);
    },
    [clockIns]
  );

  const handleChangeEditClockIn = useCallback((clockIn) => {
    setEditClockIn(clockIn);
    setOpenEdit(true);
  }, []);

  const handleChangeAddClockIn = useCallback((clockIn) => {
    setAddClockIn(clockIn);
    setOpenAdd(true);
  }, []);

  const handleOpenEdit = useCallback((date) => {
    setOpenEdit(true);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, []);

  const handleOpenAdd = useCallback((date) => {
    setOpenAdd(true);
  }, []);

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, []);

  const handleCloseDel = useCallback(() => {
    setOpenDel(false);
  }, []);

  const handleChangeDelClockIn = useCallback((clockIn) => {
    setDelClockIn(clockIn);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchClockIns(clockIns);
    } else {
      setSearchClockIns(
        clockIns.filter((x) =>
          x.employeeName.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [clockIns, query]);

  const contextValue = useMemo(
    () => ({
      clockIns,
      setClockIns,
      searchClockIns,
      query,
      setQuery,
      editClockInObj: editClockIn,
      delClockInObj: delClockIn,
      addClockInObj: addClockIn,
      handleChangeEditClockIn,
      handleChangeAddClockIn,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelClockIn,
      handleAddClockIn,
      handleEditClockIn,
      handleDelClockIn,
    }),
    [
      clockIns,
      searchClockIns,
      query,
      editClockIn,
      delClockIn,
      addClockIn,
      handleChangeEditClockIn,
      handleChangeAddClockIn,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelClockIn,
      handleAddClockIn,
      handleEditClockIn,
      handleDelClockIn,
    ]
  );

  return (
    <ClockInsContext.Provider value={contextValue}>
      {children}
    </ClockInsContext.Provider>
  );
};

ClockInsContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ClockInsContextProvider;

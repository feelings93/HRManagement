import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const EmployeePenaltiesContext = React.createContext({
  penalties: [],
  searchPenalties: [],
  setPenalties: () => {},
  query: '',
  setQuery: () => {},
  handleAddPenalty: () => {},
  handleEditPenalty: () => {},
  handleDelPenalty: () => {},
  editPenaltyObj: {},
  delPenaltyObj: {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  handleChangeEditPenalty: () => {},
  handleChangeDelPenalty: () => {},
});

const EmployeePenaltiesContextProvider = (props) => {
  const { children } = props;
  const [penalties, setPenalties] = useState([]);
  const [searchPenalties, setSearchPenalties] = useState([]);
  const [query, setQuery] = useState('');
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editPenalty, setEditPenalty] = useState(null);
  const [delPenalty, setDelPenalty] = useState(null);

  const handleAddPenalty = useCallback((penalty) => {
    setPenalties((prev) => [...prev, penalty]);
  }, []);

  const handleEditPenalty = useCallback(
    (penalty) => {
      const newHolidays = penalties.map((item) => {
        if (item._id === penalty._id) {
          return penalty;
        }
        return item;
      });
      console.log(newHolidays);
      setPenalties(newHolidays);
    },
    [penalties]
  );

  const handleDelPenalty = useCallback(
    (penalty) => {
      const newPenalties = penalties.filter(
        (item) => item._id !== penalty._id
      );
      setPenalties(newPenalties);
    },
    [penalties]
  );

  const handleChangeEditPenalty = useCallback((penalty) => {
    setEditPenalty(penalty);
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

  const handleChangeDelPenalty = useCallback((penalty) => {
    setDelPenalty(penalty);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchPenalties(penalties);
    } else {
      setSearchPenalties(
        penalties.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [penalties, query]);

  const contextValue = useMemo(
    () => ({
      penalties,
      searchPenalties,
      setPenalties,
      query,
      setQuery,
      editPenaltyObj: editPenalty,
      delPenaltyObj: delPenalty,
      handleChangeEditPenalty,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelPenalty,
      handleAddPenalty,
      handleEditPenalty,
      handleDelPenalty
    }),
    [penalties, searchPenalties, query, editPenalty, delPenalty, handleChangeEditPenalty, openEdit, openAdd, openDel, handleCloseAdd, handleCloseEdit, handleOpenAdd, handleOpenEdit, handleCloseDel, handleChangeDelPenalty, handleAddPenalty, handleEditPenalty, handleDelPenalty]
  );

  return (
    <EmployeePenaltiesContext.Provider value={contextValue}>
      {children}
    </EmployeePenaltiesContext.Provider>
  );
};

EmployeePenaltiesContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default EmployeePenaltiesContextProvider;

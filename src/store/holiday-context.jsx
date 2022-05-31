import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const HolidayContext = React.createContext({
  holidays: [],
  searchHolidays: [],
  setHolidays: () => {},
  query: '',
  setQuery: () => {},
  handleAddHoliday: () => {},
  handleEditHoliday: () => {},
  editHolidayObj: {},
  delHolidayObj: {},
  setEditHoliday: () => {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditHoliday: () => {},
  handleChangeDelHoliday: () => {},
});

const HolidayContextProvider = (props) => {
  const { children } = props;
  const [holidays, setHolidays] = useState([]);
  const [searchHolidays, setSearchHolidays] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editHoliday, setEditHoliday] = React.useState(null);
  const [delHoliday, setDelHoliday] = useState(null);

  const handleAddHoliday = useCallback((holiday) => {
    setHolidays((prev) => [...prev, holiday]);
  }, []);

  const handleEditHoliday = useCallback(
    (holiday) => {
      const newHolidays = holidays.map((item) => {
        if (item._id === holiday._id) {
          return holiday;
        }
        return item;
      });
      console.log(newHolidays);
      setHolidays(newHolidays);
    },
    [holidays]
  );

  const handleChangeEditHoliday = useCallback((holiday) => {
    setEditHoliday(holiday);
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

  const handleChangeDelHoliday = useCallback((holiday) => {
    setDelHoliday(holiday);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchHolidays(holidays);
    } else {
      setSearchHolidays(
        holidays.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [holidays, query]);

  const contextValue = useMemo(
    () => ({
      holidays,
      searchHolidays,
      setHolidays,
      query,
      setQuery,
      editHolidayObj: editHoliday,
      delHolidayObj: delHoliday,
      handleChangeEditHoliday,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelHoliday,
      handleAddHoliday,
      handleEditHoliday,
    }),
    [
      holidays,
      searchHolidays,
      query,
      editHoliday,
      delHoliday,
      handleChangeEditHoliday,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelHoliday,
      handleAddHoliday,
      handleEditHoliday,
    ]
  );

  return (
    <HolidayContext.Provider value={contextValue}>
      {children}
    </HolidayContext.Provider>
  );
};

HolidayContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default HolidayContextProvider;

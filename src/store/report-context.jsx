import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const ReportContext = React.createContext({
  reports: [],
  searchReports: [],
  setReports: () => {},
  query: '',
  setQuery: () => {},
  handleAddReport: () => {},
  handleEditReport: () => {},
  handleDelReport: () => {},
  editReportObj: {},
  delReportObj: {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleChangeEditReport: () => {},
  handleChangeDelReport: () => {},
});

const ReportContextProvider = (props) => {
  const { children } = props;
  const [reports, setReports] = useState([]);
  const [searchReports, setSearchReports] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [editReport, setEditReport] = React.useState(null);
  const [delReport, setDelReport] = useState(null);

  const handleAddReport = useCallback((report) => {
    setReports((prev) => [...prev, report]);
  }, []);

  const handleEditReport = useCallback(
    (report) => {
      const newReports = reports.map((item) => {
        if (item._id === report._id) {
          return report;
        }
        return item;
      });
      console.log(newReports);
      setReports(newReports);
    },
    [reports]
  );

  const handleDelReport = useCallback(
    (report) => {
      const newReports = reports.filter((item) => item._id !== report._id);
      setReports(newReports);
    },
    [reports]
  );

  const handleChangeEditReport = useCallback((report) => {
    setEditReport(report);
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

  const handleChangeDelReport = useCallback((report) => {
    setDelReport(report);
    setOpenDel(true);
  }, []);

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchReports(reports);
    } else {
      setSearchReports(
        reports.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [reports, query]);

  const contextValue = useMemo(
    () => ({
      reports,
      searchReports,
      setReports,
      query,
      setQuery,
      editReportObj: editReport,
      delReportObj: delReport,
      handleChangeEditReport,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelReport,
      handleAddReport,
      handleEditReport,
      handleDelReport,
    }),
    [
      reports,
      searchReports,
      query,
      editReport,
      delReport,
      handleChangeEditReport,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelReport,
      handleAddReport,
      handleEditReport,
      handleDelReport,
    ]
  );

  return (
    <ReportContext.Provider value={contextValue}>
      {children}
    </ReportContext.Provider>
  );
};

ReportContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ReportContextProvider;

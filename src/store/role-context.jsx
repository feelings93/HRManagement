import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const RoleContext = React.createContext({
  roles: [],
  searchRoles: [],
  setRoles: () => {},
  query: '',
  setQuery: () => {},
  handleAddRole: () => {},
  handleEditRole: () => {},
  editRoleObj: {},
  delRoleObj: {},
  setEditRole: () => {},
  openEdit: false,
  openAdd: false,
  openDel: false,
  handleOpenEdit: () => {},
  handleCloseEdit: () => {},
  handleOpenAdd: () => {},
  handleCloseAdd: () => {},
  handleCloseDel: () => {},
  handleChangeEditRole: () => {},
  handleChangeDelRole: () => {},
  handleDelRole: () => {},
});

const RoleContextProvider = (props) => {
  const { children } = props;
  const [roles, setRoles] = useState([]);
  const [searchRoles, setSearchRoles] = React.useState([]);
  const [query, setQuery] = React.useState('');
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDel, setOpenDel] = React.useState(false);
  const [editRole, setEditRole] = React.useState(null);
  const [delRole, setDelRole] = React.useState(null);

  const handleAddRole = useCallback((role) => {
    setRoles((prev) => [...prev, role]);
  }, []);

  const handleEditRole = useCallback((role) => {
      const newRoles = roles.map((item) => {
        if (item.id === role.id) {
          return role;
        }
        return item;
      });

      console.log(newRoles);
      setRoles(newRoles);
    },
    [roles]
  );

  const handleChangeEditRole = useCallback((role) => {
    setEditRole(role);
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

  const handleChangeDelRole = useCallback((role) => {
    setDelRole(role);
    setOpenDel(true);
  }, []);

  const handleDelRole = useCallback(
    (role) => {
      const newRoles = roles.filter(
        (item) => item._id !== role._id
      );
      console.log(newRoles);
      setRoles(newRoles);
    },
    [roles]
  );

  React.useEffect(() => {
    if (query === '' || !query) {
      setSearchRoles(roles);
    } else {
      setSearchRoles(
        roles.filter((x) =>
          x.name.toUpperCase().includes(query.toUpperCase())
        )
      );
    }
  }, [roles, query]);

  const contextValue = useMemo(
    () => ({
      roles,
      searchRoles,
      setRoles,
      query,
      setQuery,
      editRoleObj: editRole,
      delRoleObj: delRole,
      handleChangeEditRole,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelRole,
      handleAddRole,
      handleEditRole,
      handleDelRole,
    }),
    [
      roles,
      searchRoles,
      query,
      editRole,
      delRole,
      handleChangeEditRole,
      openEdit,
      openAdd,
      openDel,
      handleCloseAdd,
      handleCloseEdit,
      handleOpenAdd,
      handleOpenEdit,
      handleCloseDel,
      handleChangeDelRole,
      handleAddRole,
      handleEditRole,
      handleDelRole,
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

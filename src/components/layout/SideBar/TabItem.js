import React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { NavLink } from 'react-router-dom';
import classes from './TabItem.module.css';

const TabItem = (props) => {
  const { url, icon, name } = props;
  return (
    <NavLink
      className={({ isActive }) =>
        !isActive
          ? classes['tab-item']
          : `${classes['tab-item']} ${classes.active}`
      }
      to={url}
    >
      <Stack alignItems='center' spacing={2} direction='row'>
        {icon}
        <Typography lineHeight={1.8}>{name}</Typography>
      </Stack>
    </NavLink>
  );
};

TabItem.propTypes = {
  url: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  icon: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
};
export default TabItem;

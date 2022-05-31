import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EmployeeProfile from './EmployeeProfile';
import EmployeeClockIns from './EmployeeClockIns';
import EmployeeSalary from './EmployeeSalary';
import EmployeeLeaves from './EmployeeLeaves';
import EmployeePenalties from './EmployeePenalties';
import EmployeePenaltiesContextProvider from '../store/employee-penalties-context';
import EmployeeLeavesContextProvider from '../store/employee-leaves-context';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const DetailEmployee = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const params = useParams();
  useEffect(() => {
    console.log(params.id);
  }, [params.id]);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Thông tin cá nhân" {...a11yProps(0)} />
          <Tab label="Chấm công" {...a11yProps(1)} />
          <Tab label="Lương" {...a11yProps(2)} />
          <Tab label="Ngày nghỉ phép" {...a11yProps(3)} />
          <Tab label="Vi phạm" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <EmployeeProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <EmployeeClockIns />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <EmployeeSalary />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <EmployeeLeavesContextProvider>
          <EmployeeLeaves />
        </EmployeeLeavesContextProvider>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <EmployeePenaltiesContextProvider>
          <EmployeePenalties />
        </EmployeePenaltiesContextProvider>
      </TabPanel>
    </Box>
  );
};

export default DetailEmployee;

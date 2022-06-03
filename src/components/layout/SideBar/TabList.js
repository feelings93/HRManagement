import {
  Analytics,
  Business,
  Dashboard,
  HolidayVillage,
  LockClock,
  Person,
} from '@mui/icons-material';
import React from 'react';
import TabItem from './TabItem';

const tabList = [
  {
    name: 'Tổng quan',
    icon: <Dashboard />,
    url: 'overview',
  },
  {
    name: 'Nhân viên',
    icon: <Person />,
    url: 'employee',
  },
  {
    name: 'Chức vụ',
    icon: <Person />,
    url: 'role',
  },
  {
    name: 'Chấm công',
    icon: <LockClock />,
    url: 'clock-in',
  },
  {
    name: 'Báo cáo',
    icon: <Analytics />,
    url: 'report',
  },
  {
    name: 'Công ty',
    icon: <Business />,
    url: 'company',
  },
  // {
  //   name: 'Người dùng',
  //   icon: <Person />,
  //   url: 'user',
  // },
  {
    name: 'Ngày lễ',
    icon: <HolidayVillage />,
    url: 'holiday',
  },
];

const TabList = () => {
  return tabList.map((tab) => (
    <TabItem key={tab.url} name={tab.name} icon={tab.icon} url={tab.url} />
  ));
};

export default TabList;

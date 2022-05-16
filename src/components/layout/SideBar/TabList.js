import {
  Analytics,
  Business,
  Dashboard,
  HolidayVillage,
  Pets,
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
    icon: <Pets />,
    url: 'employee',
  },
  {
    name: 'Quy định',
    icon: <Dashboard />,
    url: 'rule',
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

import {
  Analytics,
  Category,
  Dashboard,
  Person,
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
    name: 'Phòng ban',
    icon: <Category />,
    url: 'department',
  },
  { 
    name: 'Nhân viên',
    icon: <Pets />,
    url: 'employee',
  },
  {
    name: 'Chức vụ',
    icon: <Person />,
    url: 'role',
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
  // {
  //   name: 'Người dùng',
  //   icon: <Person />,
  //   url: 'user',
  // },
];

const TabList = () => {
  return tabList.map((tab) => (
    <TabItem key={tab.url} name={tab.name} icon={tab.icon} url={tab.url} />
  ));
};

export default TabList;

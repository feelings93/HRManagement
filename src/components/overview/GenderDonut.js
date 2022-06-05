import React from 'react';
import Box from '@mui/material/Box';
import Chart from 'react-apexcharts';

const vi = {
  name: 'vi',
  options: {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    shortMonths: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    toolbar: {
      exportToSVG: 'Tải dạng SVG',
      exportToPNG: 'Tải dạng PNG',
      exportToCSV: 'Tải dạng CSV',
      menu: 'Menu',
      selection: 'Selection',
      selectionZoom: 'Selection Zoom',
      zoomIn: 'Zoom In',
      zoomOut: 'Zoom Out',
      pan: 'Panning',
      reset: 'Reset Zoom',
    },
  },
};
const initChartOptions = {
  series: [100, 15],
  options: {
    color: ['#6ab04c', '#2980b9'],
    chart: {
      title: {
        text: 'Nhân viên',
      },
      background: 'transparent',
      id: 'hey',
      defaultLocale: 'vi',
      locales: [vi],
      toolbar: {
        export: {
          csv: {
            headerCategory: 'Giới tính',
          },
        },
      },
    },
    labels: ['Nam', 'Nữ'],
    dataLabels: {
      enabled: true,
    },

    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: ['Nam', 'Nữ'],
      // tickPlacement: "between",
    },
    legend: {
      position: 'top',
    },
    grid: {
      show: true,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              show: true,
            },
            value: {
              show: true,
            },
            total: {
              show: true,
              label: 'Tổng',
            },
          },
        },
      },
    },
  },
};

const GenderDonut = ({ data }) => {
  const parseSeries = (data) => {
    return [
      data.filter((x) => x.gender === 1).length,
      data.filter((x) => x.gender === 2).length,
    ];
  };

  return (
    <Box
      height="100%"
      minHeight="200px"
      width="100%"
      sx={{
        boxShadow: 'var(--box-shadow)',
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
    >
      <Chart
        options={initChartOptions.options}
        series={parseSeries(data)}
        type="donut"
        height="100%"
      />
    </Box>
  );
};

export default GenderDonut;

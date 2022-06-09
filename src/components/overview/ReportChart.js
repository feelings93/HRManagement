import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Chart from 'react-apexcharts';
import { getReports } from '../../lib/api/report';
import useHttp from '../../hooks/use-http';
import moment from 'moment';

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
  series: [
    {
      name: 'Số lượng',
      data: [
        {
          x: 'Đi muộn',
          y: 6653,
        },
        {
          x: 'Vắng',
          y: 8133,
        },
        {
          x: 'Nghỉ phép',
          y: 7132,
        },
        {
          x: 'Mới vào làm',
          y: 6653,
        },
        {
          x: 'Mới thôi việc',
          y: 8133,
        },
        {
          x: 'Tổng nhân viên',
          y: 7132,
        },
      ],
    },
  ],
  options: {
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
            headerCategory: 'Loại',
            headerValue: 'Số lượng',
          },
        },
      },
    },
    dataLabels: {
      enabled: true,
    },

    legend: {
      position: 'top',
    },

    plotOptions: {
      bar: {
        distributed: true,
      },
    },
  },
};

const ReportChart = () => {
  const { sendRequest, data, error, status } = useHttp(getReports);

  const getReportNewest = (reports) => {
    if (!reports) reports = [];
    const data = reports
      .filter((x) => moment(x.compileDate).isSameOrBefore(moment(new Date())))
      .sort((x, y) => {
        if (moment(x.compileDate).isAfter(moment(y.compileDate))) return -1;
        else return 0;
      });
    return data[0];
  };

  const parseSeries = (reports) => {
    console.log(reports);
    if (!reports) reports = [];
    const data = reports
      .filter((x) => moment(x.compileDate).isSameOrBefore(moment(new Date())))
      .sort((x, y) => {
        if (moment(x.compileDate).isAfter(moment(y.compileDate))) return -1;
        else return 0;
      });
    console.log(data.length > 0 ? data[0].late : 0);
    return [
      {
        name: 'Thống kê',
        data: [
          {
            x: 'Đi muộn',
            y: data.length > 0 ? data[0].late : 0,
          },
          {
            x: 'Vắng',
            y: data.length > 0 ? data[0].absent : 0,
          },
          {
            x: 'Nghỉ phép',
            y: data.length > 0 ? data[0].leaves : 0,
          },
          {
            x: 'Mới vào làm',
            y: data.length > 0 ? data[0].newHires : 0,
          },
          {
            x: 'Mới thôi việc',
            y: data.length > 0 ? data[0].resignations : 0,
          },
          {
            x: 'Tổng nhân viên',
            y: data.length > 0 ? data[0].totalStaff : 0,
          },
        ],
      },
    ];
  };

  useEffect(() => {
    sendRequest({ startDate: '2022-01-01', endDate: '2022-12-31' });
  }, [sendRequest]);
  if (error) return <h1> {error}</h1>;
  return (
    <Box
      height="700px"
      width="100%"
      sx={{
        boxShadow: 'var(--box-shadow)',
        borderRadius: 4,
        backgroundColor: '#fff',
      }}
    >
      {status === 'pending' && <CircularProgress />}
      {status !== 'pending' && data && (
        <>
          <h4 style={{textAlign: 'center'}}>
            {getReportNewest(data)
              ? `Biểu đồ dựa trên báo cáo được biên soạn vào ngày ${moment(
                  getReportNewest(data).compileDate
                ).format('DD-MM-yyyy')} đến ngày ${moment(
                  getReportNewest(data).compiledUpTo
                ).format('DD-MM-yyyy')}`
              : 'Vui lòng tạo báo cáo để xem biểu đồ này'}
          </h4>
          <Chart
            options={initChartOptions.options}
            series={parseSeries(data)}
            type="bar"
            height="100%"
          />
        </>
      )}
    </Box>
  );
};

export default ReportChart;

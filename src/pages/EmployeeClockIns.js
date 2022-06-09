import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getClockInsByEmployeeID } from '../lib/api/clockIn';
import { useParams } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import 'moment/locale/vi.js';
import LoadingBox from '../components/UI/LoadingBox';
import swal from 'sweetalert';
const localizer = momentLocalizer(moment);

const EmployeeClockIns = () => {
  const params = useParams();
  const { sendRequest, data, error, status } = useHttp(
    getClockInsByEmployeeID,
    true
  );

  useEffect(() => {
    sendRequest(params.id);
  }, [params.id, sendRequest]);

  if (status === 'pending') return <LoadingBox />;
  if (error) return <h1>{error}</h1>;

  const getBg = (value, clockIns = []) => {
    const clockIn = clockIns.find(
      (clockIn) =>
        moment(clockIn.clockedIn).format('DD-MM-yyyy') ===
        moment(value).format('DD-MM-yyyy')
    );
    if (clockIn) {
      if (clockIn.late) return 'yellow';
      return 'green';
    }
    return 'white';
  };

  return (
    <>
      <div>
        <Calendar
          localizer={localizer}
          events={[]}
          components={{
            dateCellWrapper: ({ children, value }) => {
              return (
                <div
                  className={children.props.className}
                  onClick={
                    children.props.className.includes('rbc-off-range-bg')
                      ? () => {}
                      : () => {
                          const clockIn = data.find(
                            (clockIn) =>
                              moment(clockIn.clockedIn).format('DD-MM-yyyy') ===
                              moment(value).format('DD-MM-yyyy')
                          );
                          if (clockIn)
                            swal(
                              'Thông tin chấm công',
                              `Giờ check in: ${moment(clockIn.clockedIn).format(
                                'HH:mm'
                              )}, Giờ checkout: ${
                                clockIn.clockedOut
                                  ? moment(clockIn.clockedOut).format('HH:mm')
                                  : 'Chưa checkout'
                              }`
                            );
                          else {
                            swal(
                              'Thông tin chấm công',
                              `Không có thông tin chấm công`
                            );
                          }
                        }
                  }
                  style={
                    children.props.className.includes('rbc-off-range-bg')
                      ? {}
                      : {
                          backgroundColor: getBg(value, data),
                        }
                  }
                ></div>
              );
            },
          }}
          messages={{
            next: 'Sau',
            previous: 'Trước',
            month: 'Tháng',
            today: 'Hôm nay',
            week: 'Tuần',
            day: 'Ngày',
          }}
          defaultView="month"
          views={['month']}
          onSelectSlot={() => {}}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '80vh' }}
        />
      </div>
    </>
  );
};

export default EmployeeClockIns;

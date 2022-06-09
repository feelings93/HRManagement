import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import moment from 'moment';
import useHttp from '../../hooks/use-http';
import { updateCompanyRule } from '../../lib/api/company';
import { useEffect } from 'react';
import { CompanyContext } from '../../store/company-context';
import swal from 'sweetalert';

const CompanyRule = () => {
  const { sendRequest, data, error, status } = useHttp(updateCompanyRule);
  const { company, handleChangeRule } = useContext(CompanyContext);
  const [edit, setEdit] = useState(false);
  const [startWork, setStartWork] = useState(moment(company?.rule?.startWork));
  const [endWork, setEndWork] = useState(moment(company?.rule?.endWork));
  const [allowedLateTime, setAllowedLateTime] = useState(
    moment(company?.rule?.allowedLateTime)
  );
  const [maxLateTime, setMaxLateTime] = useState(
    moment(company?.rule?.maxLateTime)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!moment(startWork, 'HH:mm').isBefore(moment(endWork, 'HH:mm'))) {
      swal('Thất bại', 'Giờ kết thúc [phải sau giờ bắt đầu', 'error');
      return;
    }
    sendRequest({
      startWork: moment(startWork, 'HH:mm').toDate().toISOString(),
      endWork: moment(endWork, 'HH:mm').toDate().toISOString(),
      maxLateTime: moment(maxLateTime, 'HH:mm').toDate().toISOString(),
      allowedLateTime: moment(allowedLateTime, 'HH:mm').toDate().toISOString(),
    });
  };

  useEffect(() => {
    setStartWork(moment(company?.rule?.startWork));
    setEndWork(moment(company?.rule?.endWork));
    setMaxLateTime(moment(company?.rule?.maxLateTime));
    setAllowedLateTime(moment(company?.rule?.allowedLateTime));
  }, [company]);

  useEffect(() => {
    if (status === 'completed') {
      if (data) {
        swal('Thành công', 'Cập nhật quy định công ty thành công', 'success');
        handleChangeRule(data);
        setEdit(false);
      } else {
        swal('Thất bại', error, 'error');
      }
    }
  }, [data, error, handleChangeRule, status]);

  return (
    <Card variant="outlined">
      <form onSubmit={handleSubmit}>
        <CardHeader
          title={<Typography variant="h6">Quy định</Typography>}
          action={
            !edit ? (
              <Button
                variant="text"
                onClick={() => {
                  setEdit(true);
                }}
              >
                Chỉnh sửa
              </Button>
            ) : (
              <Stack direction="row">
                <Button
                  onClick={() => {
                    setEdit(false);
                    setStartWork(moment(company?.rule?.startWork));
                    setEndWork(moment(company?.rule?.endWork));
                    setMaxLateTime(moment(company?.rule?.maxLateTime));
                    setAllowedLateTime(moment(company?.rule?.allowedLateTime));
                  }}
                  variant="text"
                >
                  Hủy
                </Button>
                <Button type="submit" variant="contained">
                  Lưu
                </Button>
              </Stack>
            )
          }
        />
        <Divider />
        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Thời gian bắt đầu làm
              </Typography>
              <TimePicker
                disabled={!edit}
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                mask="__:__"
                onChange={(value) => {
                  setStartWork(value);
                }}
                value={startWork}
                renderInput={(params) => (
                  <TextField size="small" required {...params} />
                )}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Thời gian kết thúc làm
              </Typography>
              <TimePicker
                disabled={!edit}
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                mask="__:__"
                onChange={(value) => {
                  setEndWork(value);
                }}
                value={endWork}
                renderInput={(params) => (
                  <TextField size="small" required {...params} />
                )}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Thời gian cho phép trễ
              </Typography>
              <TimePicker
                disabled={!edit}
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                mask="__:__"
                onChange={(value) => {
                  setAllowedLateTime(value);
                }}
                value={allowedLateTime}
                renderInput={(params) => (
                  <TextField size="small" required {...params} />
                )}
              />
            </Stack>
            <Stack direction="row" justifyContent="space-between">
              <Typography width="200px" variant="subtitle1">
                Thời gian trễ tối đa
              </Typography>
              <TimePicker
                disabled={!edit}
                ampm={false}
                openTo="hours"
                views={['hours', 'minutes']}
                inputFormat="HH:mm"
                mask="__:__"
                onChange={(value) => {
                  setMaxLateTime(value);
                }}
                value={maxLateTime}
                renderInput={(params) => (
                  <TextField size="small" required {...params} />
                )}
              />
            </Stack>
          </Stack>
        </CardContent>
      </form>
    </Card>
  );
};

export default CompanyRule;

import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import PenaltyTypeGrid from './PenaltyTypeGrid';
import AddPenaltyTypeForm from './AddPenaltyTypeForm';
import DelPenaltyTypeForm from './DelPenaltyTypeForm';
import { CompanyContext } from '../../store/company-context';

const CompanyPenaltyType = () => {
  const { handleOpenAdd, openAddType, openDelType } =
    useContext(CompanyContext);
  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardHeader
        title={<Typography variant="h6">Loại vi phạm</Typography>}
        action={
          <Button onClick={handleOpenAdd} variant="text">
            Thêm
          </Button>
        }
      />
      <Divider />
      <CardContent>
        <PenaltyTypeGrid />
        {openAddType && <AddPenaltyTypeForm />}
        {openDelType && <DelPenaltyTypeForm />}
      </CardContent>
    </Card>
  );
};

export default CompanyPenaltyType;

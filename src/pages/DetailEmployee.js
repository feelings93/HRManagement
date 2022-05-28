import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DetailEmployee = () => {
    const params = useParams();
  useEffect(() => {
      console.log(params.id);
  }, []);
  return <div>DetailEmployee</div>;
};

export default DetailEmployee;

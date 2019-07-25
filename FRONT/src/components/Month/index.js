import React from 'react';

import HeaderMonth from 'src/containers/Month/HeaderMonth';
import DaysMonth from 'src/containers/Month/DaysMonth';
import CellsMonth from 'src/containers/Month/CellsMonth';

const Month = () => {
  return (
    <div className="Month">
      <HeaderMonth />
      <DaysMonth />
      <CellsMonth />
    </div>
  );
};

export default Month;

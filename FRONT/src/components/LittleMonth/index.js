import React from 'react';

import DaysLittleMonth from 'src/containers/LittleMonth/DaysLittleMonth';
import CellsLittleMonth from 'src/containers/LittleMonth/CellsLittleMonth';

import './littleMonth.scss';

const LittleMonth = () => {
  return (
    <div className="littleMonth">
      {/* <HeaderLittleMonth /> */}
      <CellsLittleMonth />
    </div>
  );
};

export default LittleMonth;

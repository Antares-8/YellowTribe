import React from 'react';

import HeaderWeek from 'src/containers/Week/HeaderWeek';
import DaysWeek from 'src/containers/Week/DaysWeek';
import CellsWeek from 'src/containers/Week/CellsWeek';

const Week = () => {
  return (
    <div className="week">
      <HeaderWeek />
      <DaysWeek />
      <CellsWeek />
    </div>
  );
};

export default Week;

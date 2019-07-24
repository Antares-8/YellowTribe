import React from 'react';

import HeaderMonth from 'src/containers/Month/HeaderMonth';
import DaysMonth from 'src/containers/Month/DaysMonth';
import CellsMonth from 'src/containers/Month/CellsMonth';

const Calendar = () => {
  return (
    <div className="calendar">
      <HeaderMonth />
      <DaysMonth />
      {/* <CellsMonth /> */}
    </div>
  );
};

export default Calendar;

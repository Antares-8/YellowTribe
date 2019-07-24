// == Import : npm
import React from 'react';
import dateFns from 'date-fns';


// == Import : local


// == Composant
const HeaderMonth = (prevMonth, nextMonth, currentMonth) => {

  const dateFormat = 'MMMM YYYY';

  // call function from reducer to change month on click
  const clickLeftHandler = () => {
    prevMonth();
  };
  const clickRightHandler = () => {
    nextMonth();
  };

  return (
    <div className="header row flex-middle">
      <div className="col col-start">
        <div className="icon" onClick={clickLeftHandler}>
          chevron_left
        </div>
      </div>
      <div className="col col-center">
        <span>{dateFns.format(currentMonth, dateFormat)}</span>
      </div>
      <div className="col col-end" onClick={clickRightHandler}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

// == Export
export default HeaderMonth;

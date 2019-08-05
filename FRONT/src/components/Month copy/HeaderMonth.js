// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';
import french from 'date-fns/locale/fr';


// == Import : local


// == Composant
const HeaderMonth = ({ prevMonth, nextMonth, currentDate }) => {

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
        <span>{dateFns.format(currentDate, dateFormat, { locale: french })}</span>
      </div>
      <div className="col col-end" onClick={clickRightHandler}>
        <div className="icon">chevron_right</div>
      </div>
    </div>
  );
};

HeaderMonth.propTypes = {
  currentDate: PropTypes.string.isRequired,
  nextMonth: PropTypes.func.isRequired,
  prevMonth: PropTypes.func.isRequired,
};

// == Export
export default HeaderMonth;

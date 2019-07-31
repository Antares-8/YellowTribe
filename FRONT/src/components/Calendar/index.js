import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';


import Month from 'src/components/Month';
import Week from 'src/components/Week';
import Year from 'src/components/Year';

import './calendar.scss';


const Calendar = ({ calendarType, idOpenEvent }) => {

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });

  return (
    <div className={`main ${withEvent}`}>
      <div className="calendar">
        {/* <div className="type row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={clickLeftHandler}>
              chevron_left
            </div>
          </div>
          <div className="col col-center">
            <span>{calendarType}</span>
          </div>
          <div className="col col-end" onClick={clickRightHandler}>
            <div className="icon">chevron_right</div>
          </div>
        </div> */}
        {calendarType === 'mois' && <Month />}
        {calendarType === 'semaines' && <Week />}
        {calendarType === 'années' && <Year />}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  calendarType: PropTypes.string.isRequired,
  idOpenEvent: PropTypes.string.isRequired,
};

export default Calendar;

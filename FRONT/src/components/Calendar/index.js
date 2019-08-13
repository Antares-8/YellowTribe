import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import axios from 'axios';


import Month from 'src/components/Month';
import Week from 'src/components/Week';
import Year from 'src/components/Year';

import './Calendar.scss';


const Calendar = ({ calendarType, idOpenEvent }) => {
  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });

  return (
    <div className={`main ${withEvent}`}>
      <div className="calendar">
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

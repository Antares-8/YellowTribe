// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import PropTypes from 'prop-types';


// == Import : local

// == Composant
const DaysMonth = ({ currentMonth }) => {

  const createDate = () => {
    const dateFormat = 'dddd';
    const days = [];

    const startDate = dateFns.startOfWeek(currentMonth);

    for (let i = 0; i < 7; i + 1) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat)}
        </div>
      );
    }
  };

  return <div className="days row">{createDate}</div>;
};

DaysMonth.propTypes = {
  currentMonth: PropTypes.string.isRequired,

};

// == Export
export default DaysMonth;

// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';


// == Import : local

// == Composant
const DaysMonth = ({ currentDate }) => {

  const dateFormat = 'dddd';
  const days = [];
  const startDate = dateFns.startOfWeek(currentDate, {weekStartsOn: 1});

  console.log(startDate);

  const createDate = () => {
    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center day" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateFormat, { locale: french })}
        </div>
      );
    }
  };
  createDate();

  return <div className="days row">{days}</div>;
};

DaysMonth.propTypes = {
  currentDate: PropTypes.string.isRequired,

};

// == Export
export default DaysMonth;

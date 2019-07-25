// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';


// == Import : local

// == Composant
const DaysYear = ({ currentDate }) => {

  const dateFormat = 'MMMM';
  const weeks = [];
  const startDate = dateFns.startOfMonth(currentDate);

  const createDate = () => {
    for (let i = 0; i < 12; i += 1) {
      weeks.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addWeeks(startDate, i), dateFormat, { locale: french })}
        </div>
      );
    }
  };
  createDate();

  return <div className="days row">{weeks}</div>;
};

DaysYear.propTypes = {
  currentDate: PropTypes.string.isRequired,

};

// == Export
export default DaysYear;

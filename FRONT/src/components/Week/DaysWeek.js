// == Import : npm
import React from 'react';
import PropTypes from 'prop-types';
import dateFns from 'date-fns';
import french from 'date-fns/locale/fr';


// == Import : local

// == Composant
const DaysWeek = ({ currentDate }) => {

  const dateDay = 'dddd';
  const dateNumber = 'D'
  const days = [];
  const startDate = dateFns.startOfWeek(currentDate);

  const createDate = () => {
    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns.format(dateFns.addDays(startDate, i), dateDay, { locale: french })}
          <div className="number">{dateFns.format(dateFns.addDays(startDate, i), dateNumber)} </div>
        </div>
      );
    }
  };
  createDate();

  return <div className="days row">{days}</div>;
};

DaysWeek.propTypes = {
  currentDate: PropTypes.string.isRequired,

};

// == Export
export default DaysWeek;

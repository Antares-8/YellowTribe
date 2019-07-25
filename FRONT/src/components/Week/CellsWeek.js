// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';

// == Import : local
// == Composant
const CellsWeek = ({ currentDate, selectedDate, onDateClick }) => {

  const weekStart = dateFns.startOfWeek(currentDate);
  const weekEnd = dateFns.endOfWeek(weekStart);
  const startDate = dateFns.startOfDay(weekStart);
  const endDate = dateFns.endOfDay(weekEnd);

  const dateFormat = 'H';
  const rows = [];

  let hours = [];
  let hour = startDate;
  let formattedDate = '';

  // call click date function from reducer
  const dateClickHandler = (clonehour) => {
    onDateClick(dateFns.parse(clonehour));
  };


  const createTable = () => {
    while (hour <= endDate) {
      for (let i = 0; i < 24; i += 1) {
        formattedDate = dateFns.format(hour, dateFormat);
        const clonehour = hour;
        const selected = classNames({
          disabled: dateFns.isSameWeek(hour, weekStart) === false,
          selected: dateFns.isSameWeek(hour, weekStart) && dateFns.isSameHour(hour, selectedDate),
        });
        hours.push(
          <div
            className={`col cell ${selected}`}
            key={hour}
            onClick={() => dateClickHandler(clonehour)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        hour = dateFns.addHours(hour, 1);
      }
      rows.push(
        <div className="row" key={hour}>
          {hours}
        </div>
      );
      hours = [];
    }
  };
  console.log(hour);
  console.log(rows, hours);

  createTable();
  return (
    <div className="body">
      {rows}
    </div>
  );
};

CellsWeek.propTypes = {
  currentDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,
};

// == Export
export default CellsWeek;

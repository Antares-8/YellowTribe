// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';

// == Import : local

// == Composant
const CellsMonth = ({ currentDate, selectedDate, onDateClick, eventDate }) => {

  const monthStart = dateFns.startOfMonth(currentDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'D';
  const rows = [];

  let days = [];
  let day = startDate;
  let formattedDate = '';

  // call click date function from reducer
  const dateClickHandler = (cloneDay) => {
    onDateClick(dateFns.parse(cloneDay));
  };
  console.log('eventDate', eventDate);
  console.log('selectedDate', selectedDate);


  const createTable = () => {
    while (day <= endDate) {
      for (let i = 0; i < 7; i += 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const selected = classNames({
          disabled: dateFns.isSameMonth(day, monthStart) === false,
          selected: dateFns.isSameMonth(day, monthStart) && dateFns.isSameDay(day, selectedDate),
        });
        const event = classNames({
          event: dateFns.isSameDay(day, eventDate),
        });
        days.push(
          <div
            className={`col cell ${selected} ${event}`}
            key={day}
            onClick={() => dateClickHandler(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
  };
  console.log(day);
  console.log(rows, days);

  createTable();
  return (
    <div className="body">
      {rows}
    </div>
  );
};

CellsMonth.propTypes = {
  currentDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,

};

// == Export
export default CellsMonth;

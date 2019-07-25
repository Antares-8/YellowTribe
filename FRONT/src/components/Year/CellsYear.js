// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';

// == Import : local

// == Composant
const CellsYear = ({ currentDate, selectedDate, onDateClick }) => {

  const yearStart = dateFns.startOfYear(currentDate);
  const yearEnd = dateFns.endOfYear(yearStart);
  const startDate = dateFns.startOfMonth(yearStart);
  const endDate = dateFns.endOfMonth(yearEnd);

  const dateFormat = 'MMMM';
  const rows = [];

  let months = [];
  let month = startDate;
  let formattedDate = '';

  // call click date function from reducer
  const dateClickHandler = (clonemonth) => {
    onDateClick(dateFns.parse(clonemonth));
  };


  const createTable = () => {
    while (month <= endDate) {
      for (let i = 0; i < 3; i += 1) {
        formattedDate = dateFns.format(month, dateFormat);
        const clonemonth = month;
        const selected = classNames({
          disabled: dateFns.isSameYear(month, yearStart) === false,
          selected: dateFns.isSameYear(month, yearStart) && dateFns.isSameMonth(month, selectedDate),
        });
        months.push(
          <div
            className={`col cell ${selected}`}
            key={month}
            onClick={() => dateClickHandler(clonemonth)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        month = dateFns.addMonths(month, 1);
      }
      rows.push(
        <div className="row" key={month}>
          {months}
        </div>
      );
      months = [];
    }
  };

  createTable();
  return (
    <div className="body">
      {rows}
    </div>
  );
};

CellsYear.propTypes = {
  currentDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,

};

// == Export
export default CellsYear;

// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';


// == Import : local
import Row from 'src/components/Month/Row';

// == Composant
const CellsMonth = (currentMonth, selectedDate, onDateClick) => {

    const monthStart = dateFns.startOfMonth(currentMonth);
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

    const createDays = () => {
      for (let i = 0; i < 7; i + 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !dateFns.isSameMonth(day, monthStart)
                ? "disabled"
                : dateFns.isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => dateClickHandler(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
    }

    const createRow = () => {
      rows.push(
        <div className="row" key={day}>
          {createDays}
        </div>
      );
    }

    while (day <= endDate) {
      createRow();
      days = [];
    }
    return (
      <div className="body">
        {rows}
      </div>
    )
  }
};

CellsMonth.propTypes = {
  currentMonth: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,

};

// == Export
export default CellsMonth;

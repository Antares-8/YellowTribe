// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// == Import : local

// == Composant
const CellsMonth = ({ currentDate, selectedDate, onDateClick, eventDate }) => {

  const monthStart = dateFns.startOfMonth(currentDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const eventStart= new Date(2019, 6, 10);
  const eventEnd= new Date(2019, 6, 30);

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
      for (let i = 1; i < 8; i += 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const selected = classNames({
          disabled: dateFns.isSameMonth(day, monthStart) === false,
          selected: dateFns.isSameMonth(day, monthStart) && dateFns.isSameDay(day, selectedDate),
          event: dateFns.isSameDay(day, eventDate),
        });
        days.push(
          <div
            className={`col cell ${selected}`}
            key={day}
            col={i}
            onClick={() => dateClickHandler(cloneDay)}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }

      const colEventCenterRow = new Date(days[6].key) > new Date(eventStart) && new Date(days[0].key) < new Date(eventEnd) ? 1 : 0;
      const colSpanEventCenterRow = new Date(days[6].key) > new Date(eventStart) && new Date(days[0].key) < new Date(eventEnd) ? 7 : 0;


      const colCalc = days.findIndex(dayC => dayC.key == eventStart) + 1;
      const col = colCalc === 0 ? colEventCenterRow : colCalc;

      const colSpanCalc = days.findIndex(dayC => dayC.key == eventEnd) + 1;
      const colSpan = colSpanCalc === 0 ? colSpanEventCenterRow : colSpanCalc - col + 1;
      const hidden = col === 0 ? 'none' : 'inline';

      const Events = styled.div`
        grid-column: ${col} / span ${colSpan};
        display: ${hidden};
        z-index: 200; 
        background-color: black;
      `;
      console.log(col, colSpan);
      rows.push(
        <div className="row" key={day}>
          {days}
          <Events>
          event
          </Events>
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

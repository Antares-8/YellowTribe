/* eslint-disable no-loop-func */
// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// == Import : local
import events from 'src/components/Data/events.json';
// == Composant
const CellsMonth = ({ currentDate, selectedDate, onDateClick, openEvent, idOpenEvent }) => {

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

  const clickHandleEvent = (evt) => {
    const { id } = evt.target;
    openEvent(id);
  };

  const createTable = () => {
    let rowEvent = 1;
    while (day <= endDate) {
      for (let i = 1; i < 8; i += 1) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;
        const selected = classNames({
          disabled: dateFns.isSameMonth(day, monthStart) === false,
          selected: dateFns.isSameMonth(day, monthStart) && dateFns.isSameDay(day, selectedDate),
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
      rows.push(
        <div className="row" key={day}>
          {days}
          {/* I'm begining a loop on the events datas */}
          {events.map((event) => {
            // test to know if the row is under or outside an event period
            const colEventCenterRow = new Date(days[6].key) > new Date(event.beginingDate)
            && new Date(days[0].key) < new Date(event.endingDate) ? 1 : 0;
            const colSpanEventCenterRow = new Date(days[6].key) > new Date(event.beginingDate)
            && new Date(days[0].key) < new Date(event.endingDate) ? 7 : 0;
            // I'm finding case number where my event beggin
            const colCalc = days.findIndex(dayC => dateFns.isSameMonth(dayC.key, new Date(event.beginingDate))
            && dateFns.isSameDay(dayC.key, new Date(event.beginingDate))
            && dateFns.isSameYear(dayC.key, new Date(event.beginingDate)))
            + 1;
            // If the result is 0, it's that the begining is not on the row,
            // so I use my test to know if it's empty or full row
            const col = colCalc === 0 ? colEventCenterRow : colCalc;

            // I use the same method for the end of the event and the span of the grid.
            const colSpanCalc = days.findIndex(dayC => dateFns.isSameMonth(dayC.key, new Date(event.endingDate))
            && dateFns.isSameDay(dayC.key, new Date(event.endingDate))
            && dateFns.isSameYear(dayC.key, new Date(event.endingDate)))
            + 1;
            
            const colSpan = colSpanCalc === 0 ? colSpanEventCenterRow : colSpanCalc - col + 1;
            // if the test is empty we display the line
            const hidden = col === 0 ? 'none' : 'inline';

            // classNames to know if the event is the event display
            const eventDisplay = classNames({
              eventDisplay: idOpenEvent == event.id,
            });

            // id row to know how to place the ligne on the grid row
            rowEvent += 1;  
            // I create a styled components to fixe directly the col and span on the grid-colum style
            const Events = styled.div`
              grid-column: ${col} / span ${colSpan};
              grid-row: ${rowEvent} / span 3;
              display: ${hidden};
            `;
            // I return the event in the DOM
            return (
              <Events key={`${event.beginingDate}${day}`} className={`events event${rowEvent} ${eventDisplay}`} id={event.id} onClick={clickHandleEvent}>
                <div className="title">
                  {event.title}
                </div>
              </Events> 
            )
          })}
        </div>
      );
      rowEvent = 1;
      days = [];
    }
  };

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
  openEvent: PropTypes.func.isRequired,
  idOpenEvent: PropTypes.string.isRequired,
};

// == Export
export default CellsMonth;

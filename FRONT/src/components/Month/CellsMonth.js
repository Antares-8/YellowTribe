/* eslint-disable no-loop-func */
// == Import : npm
import React, { useEffect, useState } from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BrowserRouter, Link } from 'react-router-dom';

// == Import : local
// import events from 'src/components/Data/events.json';

const createTable = (
  currentDate,
  onDateClick,
  openEvent,
  idOpenEvent,
  selectedDate,
  events,
  birthday,
  activeCategories,
) => {
  const rows = [];

  const monthStart = dateFns.startOfMonth(currentDate);
  const monthEnd = dateFns.endOfMonth(monthStart);
  const startDate = dateFns.startOfWeek(monthStart);
  const endDate = dateFns.endOfWeek(monthEnd);

  const dateFormat = 'D';

  let days = [];
  let day = startDate;
  let formattedDate = '';
  let keyEv = [];

  // call click date function from reducer
  const dateClickHandler = (cloneDay) => {
    onDateClick(dateFns.parse(cloneDay));
  };

  const clickHandleEvent = (evt) => {
    const { id } = evt.target;
    if (id === idOpenEvent) {
      openEvent('');
    }
    else {
      openEvent(id);
    }
  };


  let rowEvent = 2;
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
            <Link to={`/calendar/event/new?date=${new Date(day)}`}>
              <div className="addEvent"><span className="icon">add</span>évènement</div>
            </Link>
            {birthday.map( (hbirthday) => {
                const birthdayFns = new Date(hbirthday.birthDate);
                const birthdayDay = dateFns.getDayOfYear(birthdayFns);
                const dateDay = dateFns.getDayOfYear(day);
                if (birthdayDay === dateDay) {
                  return (<div key={hbirthday.birthDate}>🎉 {hbirthday.firstname}</div>);
                }
              })}
            <span className="number">{formattedDate}</span>
          </div>,
      );
      day = dateFns.addDays(day, 1);
    }
    rows.push(
      <div className="row" key={`${day}${event.beginingDate}`}>
        {days}
        {events.map((event) => {
          // test to know if the row is under or outside an event period
          const colEventCenterRow = new Date(days[6].key) > new Date(event.beginingDate)
          && new Date(days[0].key) < new Date(event.endingDate) ? 1 : 0;
          const colSpanEventCenterRow = new Date(days[6].key) > new Date(event.beginingDate)
          && new Date(days[0].key) < new Date(event.endingDate) ? 7 : 1;
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
          let hidden = col === 0 ? 'none' : 'inline';

          // classNames to know if the event is the event display
          const eventDisplay = classNames({
            eventDisplay: idOpenEvent == event.id,
          });

          // id row to know how to place the ligne on the grid row
          
          keyEv +=1
          // I create a styled components to fixe directly the col and span on the grid-colum style
          // category.color
          if (activeCategories == event.category.title || activeCategories == 'All') {
            hidden = 'inline';
          }
          else {
            hidden = 'none';
          }
          const Events = styled.div`
            grid-column: ${col} / span ${colSpan};
            grid-row: ${rowEvent} / span 3;
            background-color: ${event.category.color}
            display: ${hidden};
          `;
          // I return the event in the DOM
          if (col !== 0) {
            rowEvent += 1;  
            
            return (
              <Events key={`${keyEv} ${day}`} className={`events event${rowEvent} ${eventDisplay}`} id={event.id} onClick={clickHandleEvent}>
                <div className="title" onClick={clickHandleEvent}>
                  {event.title.length > 25
                    ? `${event.title.slice(0, 25)}...`
                    : event.title
                  }
                </div>
              </Events>
            );
          }
        })}
      </div>
    );
    rowEvent = 2;
    days = [];
  }
  return rows;
};


// == Composant
const CellsMonth = ({
  currentDate,
  selectedDate,
  onDateClick,
  openEvent,
  idOpenEvent,
  activeCategories,
  events,
  birthday,
  categories,
}) => {

  const [rows, setRows] = useState([]);

  useEffect(() => {

    setRows(createTable(
      currentDate,
      onDateClick,
      openEvent,
      idOpenEvent,
      selectedDate,
      events,
      birthday,
      activeCategories,
      categories,
    ));
  }, [
    currentDate,
    onDateClick,
    openEvent,
    idOpenEvent,
    selectedDate,
    events,
    birthday,
    activeCategories,
    categories,
  ]);

  return (
    <div className="body">
      <BrowserRouter forceRefresh={true}>
        {rows}
      </BrowserRouter>
    </div>
  );
};

CellsMonth.propTypes = {
  currentDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,
  openEvent: PropTypes.func.isRequired,
  idOpenEvent: PropTypes.string.isRequired,
  fetchEventsCalendar: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  birthday: PropTypes.array.isRequired,
  activeCategories: PropTypes.string.isRequired,
};

// == Export
export default CellsMonth;

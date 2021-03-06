/* eslint-disable no-loop-func */
// == Import : npm
import React from 'react';
import dateFns from 'date-fns';
import classNames from 'class-names';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import french from 'date-fns/locale/fr';
import { Link } from 'react-router-dom';


// == Import : local

// == Composant
const CellsYear = ({ currentDate, selectedDate, onDateClick, openEvent, idOpenEvent, events, birthday, activeCategories }) => {

  // about year calendar

  const yearStart = dateFns.startOfYear(currentDate);
  const yearEnd = dateFns.endOfYear(yearStart);
  const startDate = dateFns.startOfMonth(yearStart);
  const endDate = dateFns.endOfMonth(yearEnd);

  const dateFormatMonth = 'MMMM';
  const phpFormat = 'YYYY-MM-DD HH:mm:ss';
  const trimester = [];

  let months = [];
  let month = startDate;
  let formattedDate = '';


  // call click date function from reducer

  const dateClickHandlerW = (cloneDay) => {
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


  // classNames

  const selected2 = classNames({
    disabled: dateFns.isSameYear(month, yearStart) === false,
    selected: dateFns.isSameYear(month, yearStart) && dateFns.isSameMonth(month, selectedDate),
  });

  const createTable = () => {
    // for 1 year
    while (month <= endDate) {

      for (let i = 0; i < 3; i += 1) {
        // about month calendar
        const monthStart = dateFns.startOfMonth(month);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDateMonth = dateFns.startOfWeek(monthStart);
        const endDateMonth = dateFns.endOfWeek(monthEnd);

        const dateFormatDay = 'D';
        const rows = [];

        let days = [];
        let day = startDateMonth;
        let formattedDateD = '';

        let rowEvent = 2;
        while (day <= endDateMonth) {
          for (let i = 0; i < 7; i += 1) {
            formattedDateD = dateFns.format(day, dateFormatDay);
            const cloneDay = day;
            const selected = classNames({
              disabled: dateFns.isSameMonth(day, monthStart) === false,
              selected: dateFns.isSameMonth(day, monthStart) && dateFns.isSameDay(day, selectedDate),
            });
            const phpDate = dateFns.format(month, phpFormat);
            days.push(
              <div
                className={`col cell ${selected}`}
                key={day}
                onClick={() => dateClickHandlerW(cloneDay)}
              >
              {birthday.map( (hbirthday) => {
                const birthdayFns = new Date(hbirthday.birthDate);
                const birthdayDay = dateFns.getDayOfYear(birthdayFns);
                const dateDay = dateFns.getDayOfYear(day);
                if (birthdayDay === dateDay) {
                  return (<div key={hbirthday.birthDate} className="birthday">🎉<span className="firstname">{hbirthday.firstname}</span></div>);
                }
              })}
              <Link to={`/calendar/event/new?date=${phpDate}`}>
                <span className="number">{formattedDateD}</span>
              </Link>
              </div>
            );
            day = dateFns.addDays(day, 1);
          }
          // add days in row of month 
          rows.push(
            <div className="row" key={day}>
              {days}
              {/* 
              add events 
              I'm begining a loop on the events datas */}
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

                if (activeCategories == event.category.title || activeCategories == 'All') {
                  hidden = 'inline';
                }
                else {
                  hidden = 'none';
                }
                const Events = styled.div`
                  grid-column: ${col} / span ${colSpan};
                  grid-row: ${rowEvent} / span 1;
                  background-color: ${event.category.color}
                  border-color: darken(${event.category.color}, 30%);
                  display: ${hidden};
                `;
                if (col !== 0) {
                  rowEvent += 1;  
                // I return the event in the DOM
                  return (
                    <Events key={`${event.beginingDate}${day}`} className={`events event${rowEvent} ${eventDisplay}`} id={event.id} onClick={clickHandleEvent}>
                      <div className="title" id={event.id} onClick={clickHandleEvent}>
                        {event.title.length > 25
                          ? `${event.title.slice(0, 25)}...`
                          : event.title
                        }
                      </div>
                    </Events> 
                  )
                }
              })}
            </div>
          );
          rowEvent = 2;
          days = [];
        }
        formattedDate = dateFns.format(month, dateFormatMonth, { locale: french });
        months.push(
          <div key={month} className="month">
            <div className="nameMonth">{formattedDate}</div>
            {rows}
          </div>,
        );
        month = dateFns.addMonths(month, 1);
      }
      trimester.push(
        <div className="trimester" key={month}>
          {months}
        </div>,
      );
      months = [];
    }
  };


  createTable();
  return (
    <div className="body">
      {trimester}
    </div>
  );
};


CellsYear.propTypes = {
  currentDate: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  onDateClick: PropTypes.func.isRequired,
  openEvent: PropTypes.func.isRequired,
  idOpenEvent: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  birthday: PropTypes.string.isRequired,
  activeCategories: PropTypes.string.isRequired,
};

// == Export
export default CellsYear;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'class-names';
import axios from 'axios';


import Month from 'src/components/Month';
import Week from 'src/components/Week';
import Year from 'src/components/Year';

import './calendar.scss';


const Calendar = ({ calendarType, idOpenEvent, addCategorieInState }) => {

  const [categories, setCategories] = useState({});
  const testcategorie = {
    categorie1: false, 
    categorie2: false, 
  };



  useEffect(() => {
    axios.get('http://95.142.174.217/api/events')
      .then((res) => {
        const eventsData = res.data;
        eventsData.map((eventData) => {
          setCategories({
            ...categories,
            [eventData[0].place]: true,
          });
        });
        console.log(categories);
        addCategorieInState(testcategorie);
      });
  }, []);

  // classNames //
  const withEvent = classNames({
    withEvent: idOpenEvent !== '',
  });

  return (
    <div className={`main ${withEvent}`}>
      <div className="calendar">
        {/* <div className="type row flex-middle">
          <div className="col col-start">
            <div className="icon" onClick={clickLeftHandler}>
              chevron_left
            </div>
          </div>
          <div className="col col-center">
            <span>{calendarType}</span>
          </div>
          <div className="col col-end" onClick={clickRightHandler}>
            <div className="icon">chevron_right</div>
          </div>
        </div> */}
        {calendarType === 'mois' && <Month />}
        {calendarType === 'semaines' && <Week />}
        {calendarType === 'années' && <Year />}
      </div>
    </div>
  );
};

Calendar.propTypes = {
  calendarType: PropTypes.string.isRequired,
  idOpenEvent: PropTypes.string.isRequired,
};

export default Calendar;
